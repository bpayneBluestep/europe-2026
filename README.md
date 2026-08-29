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
| **Stays** | The five properties — addresses, check-in times, host details, Maps links. |
| **Want to do** | Shared wishlist. Add anything with an optional link (paste a TikTok), tag a city, suggest a day. Edit or delete any row. |
| **Open** | Everything still to sort, the four Swiss excursion options, and photo credits. |
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
tickets/gpe-upgrade-brandon.png     first-class day upgrade
tickets/gpe-upgrade-tatiana.png
tickets/tgv.png                     Basel → Paris
```

PNG or JPG both work — if you save a JPG, change the extension in `data.js` to match.
Any file you haven't added yet shows a grey "not saved yet" placeholder instead of a
broken image, so partial is fine.

Then follow **Updating** below.

## Updating

1. Edit `data.js` (tickets, stays, open items) or `days.js` (the 23 days).
2. **Bump `CACHE_VERSION` in `sw.js`** — `europe-2026-v1` → `v2`, and so on.
   Skip this and both phones keep serving the old cached copy.
3. Commit and push. GitHub Pages redeploys in about a minute.
4. On each phone: open the app with a signal, close it fully (swipe up from the app
   switcher), reopen. The new version is in.

## Design

Instrument Sans on `#212529` / `#f5f6f7` / `#ffffff`, white cards on a light-grey
field, a floating dark nav pill, and accordion day cards. Deliberately light-only.

Colour comes from the **photography**, not from painted UI. Each of the five bases
has one accent pulled from its own photograph (`TRIP.cities` in `data.js`), applied
to field labels, timeline times, filter-chip dots and the gradient scrim over each
hero image. The chrome stays monochrome so the pictures carry the trip.

Photos live in `img/`, two derivatives each: `<key>.jpg` at 1200x800 for heroes and
banners, `<key>-sq.jpg` at 300x300 for day thumbnails. All 13 are from Wikimedia
Commons under CC0 / CC BY / CC BY-SA — **the credits list in the Open tab is a
licence requirement, don't remove it.** Attribution data is in `img/credits.json`
and mirrored into `TRIP.credits`.

The font is **self-hosted** in `fonts/` (both Latin subsets, ~41KB) rather than
pulled from Google Fonts, because a cross-origin font request is the one thing that
would fail in airplane mode.

## The wishlist and its backend

`store.js` is the only thing that touches storage. It has two backends behind one
interface:

- **localStorage** — per device. This is what runs today.
- **A BlueStep endpoint** — shared between both phones. Set `API.url` (and
  optionally `API.key`) at the top of `store.js` to switch it on.

Writes always land in localStorage first and are pushed to the server after, so
adding something on a train with no signal works and syncs when the signal returns.
Failed writes go into a queue that is flushed on the next successful refresh.

The endpoint contract, all on one URL:

```
GET   ->  { items: [ { id, title, url, city, day, note, createdAt, createdBy } ] }
POST  { action: "add",    item: {...} }
POST  { action: "update", id, item: {...} }
POST  { action: "delete", id }
```

Requests are sent with `Content-Type: text/plain` on purpose — it keeps the browser
from firing a CORS preflight. The endpoint must return
`Access-Control-Allow-Origin` for `https://bpaynebluestep.github.io`.

## Who added what

There is no login — the endpoint is anonymous — so identity is a **label the
device claims**, chosen once on first launch and kept in localStorage. It answers
"who typed this" and nothing else; never treat it as permission.

- First launch asks *Who's on this phone?* before anything else, because the
  greeting and every byline need it.
- The greeting on Today uses that name, with a *Not X? Switch* control under it.
  With two travellers, Switch cycles rather than opening a dialog.
- Every wishlist row carries a byline; filter chips narrow the list to one person.
- People are configured in `TRIP.people` (`data.js`). Their mark is an initial in
  a circle — **filled for the first person, outlined for the second** — because
  the five city accents already use most of the usable hue space.
- Items created before this existed show *added before names were on* rather than
  a wrong name.

Server-side, `createdBy` is whitelisted through the field filter, and **update
preserves the stored `createdBy`/`createdAt`** unless the caller supplies them —
so one of you editing the other's item does not reassign it.

For the Shortcut, add a `by` key alongside `url` in the `item` dictionary and set
it to that phone's owner. `by` and `createdBy` are both accepted.

## What a day says it is

**Only travel days have a title**, because only there does the title say
something the date and the city do not — it is the route (*Rome → Venice*).
Every other day is headed by its city alone. Titles like *Open*, *Open — weather
picks* and *Land in Rome, settle in* are gone; what is planned lives inside the
card you open, not in a label trying to summarise it. Nothing was deleted from
`days.js` — summaries, notes and timelines all still render, so day 4 still
reads as the Colosseum day the moment you open it.

Opening a day card in the list shows the whole of that day without leaving it —
the summary, anything critical, the timeline, tickets, the before-you-go
checklist, and the wishlist items suggested for that day. Suggestions render
read-only there: the edit and delete controls re-render the page, which would
snap the accordion shut mid-action, so editing happens on the day page or the
Want-to-do tab.

## Editing, and suggesting a day

Every row has a pencil and a bin in its top-right corner. The pencil turns that
row into the same form used for adding, pre-filled; Save writes it, Cancel drops
it. Only one row is editable at a time, and navigating away discards a
half-finished edit rather than carrying it to another screen.

**Suggest a day** is the fourth field. It lists only the days that belong to the
item's city — pick Venice and it offers days 7–9 — so the choice is small enough
to make with a thumb. Changing the city rewrites the day list in place, without
disturbing anything already typed in the other fields. Items with no city
("Other") can be suggested for any day.

A suggested item then appears under **Ideas for this day** on that day's page,
below the actual moves. That placement is the point: it is a suggestion, not a
booking. Nothing about it changes the itinerary in `days.js`, and the day picker
is stored as `item.day` — just the day number as a string.

**There is no tick-off.** The list is a store of things you liked, not a chore
list, so items have no done state and nothing gets struck through. The `done`
field still exists in the endpoint's whitelist and is simply never written.

The link is a full-width button reading *Watch on TikTok*, *Open in Maps* and so
on — 48px tall, tinted with the city's accent. It was a 13px underlined link,
which is a miss target on a moving train.

The add form starts collapsed behind an **Add something** button, because the
list is what you open the tab to read.

## Sharing straight from TikTok

**iPhone: use a Shortcut.** The Web Share Target API — the thing that puts a web
app in a native share sheet — is Chrome/Android only; Safari has never shipped it,
so the PWA cannot appear in TikTok's share sheet. A Shortcut can, and it posts
directly to the endpoint without the app being open. Build it once:

1. Shortcuts app → **+** → rename it *Add to Europe trip*
2. Info (ⓘ) → turn on **Show in Share Sheet**, then set **Share Sheet Types** to
   **URLs** only
3. Add action **Ask for Input** — type **Text**, prompt `Name it?`
4. Add action **List** — items, one per line: `Rome`, `Venice`, `Lake Como`,
   `Interlaken`, `Paris`, `Other`
5. Add action **Choose from List** — prompt `Which city?`
6. Add action **Get Contents of URL**
   - URL: `https://beh.bluestep.net/b/tripdata`
   - **Show More** → Method **POST**, Request Body **JSON**
   - Field 1 — Text, key `url`, value = the **Shortcut Input** variable
   - Field 2 — Text, key `title`, value = the **Provided Input** variable
   - Field 3 — Text, key `city`, value = the **Chosen Item** variable
   - Field 4 — Text, key `by`, value = `Brandon` (or `Tatiana` on her phone)
7. Optional: add **Show Notification** after it so you get confirmation.

Order matters — the three prompting actions must sit **above** Get Contents of URL,
or their variables do not exist yet when it runs.

`title` and `city` are both optional. Leave the name prompt blank and the endpoint
derives one; pick `Other` and the item stores an empty city, which the app
renders as *Other* — the bucket for anything not tied to a place (a packing
idea, a phrase to learn, a thing to buy). A city string the app does not
recognise degrades to the same thing rather than breaking, so a typo is
harmless.

Why the city prompt is worth the extra tap: TikTok's share button hands out a
short link (`tiktok.com/t/ZP8v…`) with no `@handle` and no caption in it, so the
endpoint has nothing to derive a title or a place from. Every share would
otherwise land as *TikTok link*.

Then in TikTok: Share → scroll the bottom row → *Add to Europe trip*. It appears
in the app's Want-to-do list on both phones at the next refresh.

The body is deliberately **flat** — no `action`, no nested `item` — because a
dictionary inside a dictionary is the step people get wrong in the Shortcuts
editor. A bare `url` or `title` implies "add". The app's own `{action, item}`
shape still works unchanged.

The endpoint accepts a bare URL — no id, no title. It mints an id, derives a
title (`TikTok — @handle`, `Map pin`, the hostname), and dedupes on the URL so
sharing the same video twice does not make two rows. Send a `text` key as well
and that becomes the title instead, which is what the caption is good for.

**Android/Chrome** gets the real thing: `share_target` in the manifest routes the
system share sheet to `index.html?url=…&text=…`, which `consumeShare()` turns into
an item and then strips from the URL so a reload cannot double-add. That handler
also makes a plain link work as a bookmarklet on any platform.

## Structure

```
index.html    the whole app — styles, views, router, service-worker registration
data.js       tickets, stays, open items, accounts, emergency numbers, excursions
days.js       the 23 days, with timelines for the five travel days
store.js      wishlist storage — localStorage now, BlueStep endpoint when configured
sw.js         offline cache. CACHE_VERSION is the thing you have to remember to bump
fonts/        Instrument Sans, self-hosted so it renders offline
img/          trip photography + credits.json (attribution is required)
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
