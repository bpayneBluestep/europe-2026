/* Europe 2026 — offline service worker.
   Bump CACHE_VERSION whenever you change any file. That is what makes both
   phones pick up the new version; without it they keep serving the old cache. */

const CACHE_VERSION = "europe-2026-v1";

/* The app shell. These must all fetch successfully or the install is retried. */
const CORE = [
  "./",
  "./index.html",
  "./data.js",
  "./days.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png",
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
  "./tickets/tgv.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(CORE);
    /* One at a time, swallowing failures, so a ticket you haven't saved yet
       doesn't take the whole install down with it. */
    await Promise.all(EXTRAS.map((url) => cache.add(url).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
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
