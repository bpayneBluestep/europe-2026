# Ticket images

Drop the QR / barcode images here using the exact filenames listed in the main
`../README.md`. Anything missing shows a grey placeholder in the app rather than a
broken image, so you can add them one at a time.

After adding files, bump `CACHE_VERSION` in `../sw.js` and push — otherwise the phones
keep serving the cached build that didn't have them.
