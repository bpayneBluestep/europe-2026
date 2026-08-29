/* Europe 2026 — shared storage for the interactive lists.
 *
 * Two backends behind one interface:
 *   - BlueStep endpoint (shared between both phones) when API.url is set
 *   - localStorage (this device only) otherwise, and whenever the network fails
 *
 * Writes always land in localStorage first and are pushed to the server after,
 * so adding something on a train with no signal still works and syncs later.
 */

var API = {
  /* The BlueStep endpoint. Empty string = local-only mode. */
  url: "https://beh.bluestep.net/b/tripdata",
  /* Optional shared secret, sent as ?k= — the endpoint does not require one,
     by explicit choice. Set it in both places to turn it on. */
  key: "",
};

var Store = (function () {
  "use strict";

  var LS_KEY = "europe2026.wishlist.v1";
  var LS_QUEUE = "europe2026.queue.v1";

  function configured() { return !!API.url; }

  /* ---------- localStorage, defensively ---------- */
  function lsGet(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }

  function uid() {
    return "w" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ---------- network ---------- */
  function endpoint(qs) {
    var u = API.url + (API.url.indexOf("?") === -1 ? "?" : "&") + "t=" + Date.now();
    if (API.key) u += "&k=" + encodeURIComponent(API.key);
    if (qs) u += "&" + qs;
    return u;
  }

  function call(method, body) {
    var opts = { method: method, headers: {}, cache: "no-store" };
    if (body) {
      opts.headers["Content-Type"] = "text/plain";  /* avoids a CORS preflight */
      opts.body = JSON.stringify(body);
    }
    return fetch(endpoint(""), opts).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (data) {
      /* The endpoint always answers 200 and reports failure in the envelope,
         so a rejected write has to be caught here rather than by r.ok. */
      if (data && data.success === false) throw new Error(data.error || "rejected");
      return data;
    });
  }

  /* ---------- queue of writes made while offline ---------- */
  function queue() { return lsGet(LS_QUEUE, []); }
  function enqueue(op) { var q = queue(); q.push(op); lsSet(LS_QUEUE, q); }

  function flush() {
    if (!configured()) return Promise.resolve(0);
    var q = queue();
    if (!q.length) return Promise.resolve(0);
    var done = 0;
    return q.reduce(function (chain, op) {
      return chain.then(function () {
        return call("POST", op).then(function () { done++; });
      });
    }, Promise.resolve())
      .then(function () { lsSet(LS_QUEUE, []); return done; })
      .catch(function () { return done; });   /* keep the rest queued */
  }

  /* ---------- public ---------- */

  /* Local copy, always available and always instant. */
  function items() {
    return lsGet(LS_KEY, []);
  }

  /* Refresh from the server. Resolves to the list either way — on failure the
     local copy stands, which is the whole point of the offline-first shape. */
  function refresh() {
    if (!configured()) return Promise.resolve(items());
    return flush()
      .then(function () { return call("GET"); })
      .then(function (data) {
        var list = (data && data.items) || [];
        lsSet(LS_KEY, list);
        return list;
      })
      .catch(function () { return items(); });
  }

  function add(item) {
    item.id = item.id || uid();
    item.createdAt = item.createdAt || new Date().toISOString();
    var list = items();
    list.unshift(item);
    lsSet(LS_KEY, list);
    var op = { action: "add", item: item };
    if (configured()) {
      call("POST", op).catch(function () { enqueue(op); });
    }
    return item;
  }

  function update(id, patch) {
    var list = items(), found = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { Object.assign(list[i], patch); found = list[i]; break; }
    }
    if (!found) return null;
    lsSet(LS_KEY, list);
    var op = { action: "update", id: id, item: found };
    if (configured()) {
      call("POST", op).catch(function () { enqueue(op); });
    }
    return found;
  }

  function remove(id) {
    var list = items().filter(function (x) { return x.id !== id; });
    lsSet(LS_KEY, list);
    var op = { action: "delete", id: id };
    if (configured()) {
      call("POST", op).catch(function () { enqueue(op); });
    }
  }

  function status() {
    return {
      mode: configured() ? "shared" : "this device only",
      configured: configured(),
      pending: queue().length,
      count: items().length,
    };
  }

  return { items: items, refresh: refresh, add: add, update: update,
           remove: remove, status: status, uid: uid };
})();
