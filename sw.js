/* Europe 2026 — offline service worker.
   Bump CACHE_VERSION whenever you change any file. That is what makes both
   phones pick up the new version; without it they keep serving the old cache. */

const CACHE_VERSION = "europe-2026-v22";
/* Map tiles live in their own cache so a version bump does not throw away
   the basemap you deliberately pre-loaded before leaving. */
const TILE_CACHE = "europe-2026-tiles";
const TILE_CAP = 3000;   /* roughly 60-100MB of 256px PNGs */

/* The app shell. These must all fetch successfully or the install is retried. */
const CORE = [
  "./",
  "./index.html",
  "./data.js",
  "./days.js",
  "./store.js",
  "./vendor/leaflet.js",
  "./vendor/leaflet.css",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png",
  "./fonts/instrument-sans-latin.woff2",
  "./fonts/instrument-sans-latin-ext.woff2",
];

/* Trip photography. Part of the shell — the app is meant to look like this
   offline, not fall back to flat colour. ~2.7MB, fetched once on install. */
const PHOTOS = [
  "./img/como-lake-sq.jpg",
  "./img/como-lake.jpg",
  "./img/interlaken-valley-sq.jpg",
  "./img/interlaken-valley.jpg",
  "./img/paris-eiffel-sq.jpg",
  "./img/paris-eiffel.jpg",
  "./img/rome-colosseum-sq.jpg",
  "./img/rome-colosseum.jpg",
  "./img/rome-pantheon-sq.jpg",
  "./img/rome-pantheon.jpg",
  "./img/rome-trevi-sq.jpg",
  "./img/rome-trevi.jpg",
  "./img/slc-sq.jpg",
  "./img/slc.jpg",
  "./img/swiss-first-sq.jpg",
  "./img/swiss-first.jpg",
  "./img/swiss-jungfrau-sq.jpg",
  "./img/swiss-jungfrau.jpg",
  "./img/swiss-lucerne-sq.jpg",
  "./img/swiss-lucerne.jpg",
  "./img/swiss-oeschinen-sq.jpg",
  "./img/swiss-oeschinen.jpg",
  "./img/venice-canal-sq.jpg",
  "./img/venice-canal.jpg",
  "./img/venice-gondola-sq.jpg",
  "./img/venice-gondola.jpg",
];

/* Ticket images. Cached best-effort — a missing one must not break the install. */
const EXTRAS = [
  "./tickets/tk2n7n-brandon.png",
  "./tickets/tk2n7n-tatiana.png",
  "./tickets/tk9pwn-brandon.png",
  "./tickets/tk9pwn-tatiana.png",
  "./tickets/swisspass-brandon.png",
  "./tickets/swisspass-tatiana.png",
  "./tickets/gpe-upgrade-brandon.png",
  "./tickets/gpe-upgrade-tatiana.png",
  "./tickets/tk9pwn-trenord-brandon.png",
  "./tickets/tk9pwn-trenord-tatiana.png",
  "./tickets/tgv-brandon.png",
  "./tickets/tgv-tatiana.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(CORE);
    /* One at a time, swallowing failures, so a ticket you haven't saved yet
       doesn't take the whole install down with it. */
    await cache.addAll(PHOTOS);
    await Promise.all(EXTRAS.map((url) => cache.add(url).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== CACHE_VERSION && k !== TILE_CACHE)
          .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* Trim the tile cache when it gets too big. Oldest-first is not available, so
   this drops from the front of the key list, which is insertion order. */
async function putTile(cache, req, res) {
  await cache.put(req, res);
  const keys = await cache.keys();
  if (keys.length > TILE_CAP) {
    await Promise.all(keys.slice(0, keys.length - TILE_CAP)
      .map((k) => cache.delete(k)));
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  /* Map tiles: cache-first, and keep whatever we fetch. Panning around the five
     cities while you still have signal is what fills this; offline you then get
     a real basemap instead of grey. Capped so it cannot grow without limit. */
  if (/^https?:\/\/[abc]?\.?tile\.openstreetmap\.org\//.test(req.url)) {
    event.respondWith((async () => {
      const cache = await caches.open(TILE_CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          event.waitUntil(putTile(cache, req, fresh.clone()));
        }
        return fresh;
      } catch (e) {
        /* Offline and this tile was never loaded — a transparent 1px keeps
           Leaflet from drawing a broken-image icon over the map. */
        return new Response(
          Uint8Array.from(atob(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk" +
            "YPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="), (c) => c.charCodeAt(0)),
          { headers: { "Content-Type": "image/png" } });
      }
    })());
    return;
  }

  if (url.origin !== self.location.origin) return;   /* Wallet links etc. go straight out */

  /* Cache-first: this app is meant to work with the radio off, and nothing in
     it changes without a redeploy. A background refresh keeps it current when
     there IS a signal. */
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) {
      event.waitUntil((async () => {
        try {
          const fresh = await fetch(req);
          if (fresh && fresh.ok) {
            const cache = await caches.open(CACHE_VERSION);
            await cache.put(req, fresh.clone());
          }
        } catch (e) { /* offline — the cached copy is the point */ }
      })());
      return cached;
    }

    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) {
        const cache = await caches.open(CACHE_VERSION);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (e) {
      /* Offline and never cached. For a page request, hand back the app shell
         so a deep link still opens instead of showing the browser error. */
      if (req.mode === "navigate") {
        const shell = await caches.match("./index.html");
        if (shell) return shell;
      }
      return new Response("Offline", { status: 503, statusText: "Offline" });
    }
  })());
});
