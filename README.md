# Europe 2026 — offline trip app

A single-page PWA holding everything for the 17 Sep – 9 Oct 2026 trip. Installs to the
home screen on iPhone, runs full-screen, and works with the radio off.

Live: **https://bpaynebluestep.github.io/europe-2026/**

## Install it on the phone

**iPhone (Safari — it must be Safari, not Chrome or an in-app browser)**

1. Open the URL above.
2. Share button → **Add to Home Screen** → Add.
3. Open it once from the home-screen icon while you still have wifi. That first launch
   is what downloads and caches everything.
4. Turn on airplane mode and open it again. If it loads, you're done.

**Android (Chrome)** — same, but the prompt says *Install app*.

Do steps 1–4 on **both** phones.

## What's in it

| Tab | Holds |
| --- | --- |
| **Today** | Auto-selects the current day. Before departure it counts down and shows day 1. |
| **Days** | All 23 days. Red dot = travel day, blue = something booked, grey = open. |
| **Tickets** | Every PNR, seat, ticket ID, change code and confirmation, grouped by type. |
| **Stays** | The five properties — addresses, check-in times, what's still owed. |
| **Money** | Budget vs. committed, computed live from the data. Plus every open item. |
| **SOS** | Floating red button, reachable from any screen. Tap-to-call emergency numbers. |

## Adding the ticket QR codes

This is the reason the app exists — the barcodes offline, one tap deep, instead of
hunting through Gmail on hotel wifi.

Save each image into `tickets/` with **exactly** these filenames:

```
tickets/tk2n7n-brandon.png          Rome → Venice, Frecciarossa 9416
tickets/tk2n7n-tatiana.png
tickets/tk9pwn-brandon.png          Venice → Como (all legs, per passenger)
tickets/tk9pwn-tatiana.png
tickets/swisspass-brandon.png       Swiss Travel Pass — the 2 PNGs on the 13 Jul 01:39 SBB email
tickets/swisspass-tatiana.png
tickets/gpe-upgrade-brandon.png     CHF 50 first-class day upgrade
tickets/gpe-upgrade-tatiana.png
tickets/tgv.png                     Basel → Paris
```

PNG or JPG both work — if you save a JPG, change the extension in `data.js` to match.
Any file you haven't added yet shows a grey "not saved yet" placeholder instead of a
broken image, so partial is fine.

Then follow **Updating** below.

## Updating

1. Edit `data.js` (tickets, stays, budget, open items) or `days.js` (the 23 days).
2. **Bump `CACHE_VERSION` in `sw.js`** — `europe-2026-v1` → `v2`, and so on.
   Skip this and both phones keep serving the old cached copy.
3. Commit and push. GitHub Pages redeploys in about a minute.
4. On each phone: open the app with a signal, close it fully (swipe up from the app
   switcher), reopen. The new version is in.

## Structure

```
index.html    the whole app — styles, views, router, service-worker registration
data.js       tickets, stays, budget, accounts, emergency numbers, excursions
days.js       the 23 days, with timelines for the five travel days
sw.js         offline cache. CACHE_VERSION is the thing you have to remember to bump
manifest.webmanifest
tickets/      QR images — see above
```

`Europe Itinerary.xlsx` in the parent folder stays the source of truth for planning.
This app is generated from it and does not write back.

## Deliberately not in here

- **Passport numbers and card numbers.** The repo is public because GitHub Pages needs
  it to be. Confirmation codes are low-value on their own; identity documents are not.
- **Live anything** — train times, maps, weather forecasts. The weather figures shown
  are ten-year climate normals, not a forecast.
- Offline maps. Pre-download the Rome, Venice, Como, Interlaken and Paris areas in
  Google Maps separately.
