/* Europe 2026 — trip data.
   Source of truth is "Europe Itinerary.xlsx" + the Confirmations folder.
   Edit here, bump CACHE_VERSION in sw.js, push. */

const TRIP = {
  meta: {
    title: "Europe 2026",
    travellers: "Brandon & Tatiana Payne",
    start: "2026-09-17",
    end: "2026-10-09",
  },

  /* ---------- WHO IS TRAVELLING ---------- */
  /* Identity is a label this device claims, not a login — the endpoint is
     anonymous. It only ever answers "who typed this", never "who may do this". */
  people: [
    { id: "brandon", name: "Brandon", initial: "B" },
    { id: "tatiana", name: "Tatiana", initial: "T" },
  ],

  /* ---------- CITY PALETTE ---------- */
  /* One rich accent per base, pulled from that city's photograph. */
  cities: {
    "Home":       { color: "#8a5a2b", img: "slc" },
    "Rome":       { color: "#b4552d", img: "rome-colosseum" },
    "Venice":     { color: "#1c6b74", img: "venice-canal" },
    "Lake Como":  { color: "#2f6b4f", img: "como-lake" },
    "Interlaken": { color: "#1f5f9e", img: "interlaken-valley" },
    "Paris":      { color: "#5b4b8a", img: "paris-eiffel" },
  },

  /* ---------- PHOTO CREDITS ---------- */
  /* Wikimedia Commons. CC BY / CC BY-SA require attribution — keep this shown. */
  credits: {
    "slc": {
      "artist": "Iansmh98",
      "license": "CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File%3ASalt_Lake_City_skyline_%282020%29_from_Ensign_Peak.jpg"
    },
    "rome-colosseum": {
      "artist": "Wilfredor",
      "license": "CC0",
      "source": "https://commons.wikimedia.org/wiki/File%3AColosseum_of_Rome_and_Roman_forum.jpg"
    },
    "rome-trevi": {
      "artist": "Wilfredor",
      "license": "CC0",
      "source": "https://commons.wikimedia.org/wiki/File%3AFontaine_Trevi_-_Rome.jpg"
    },
    "rome-pantheon": {
      "artist": "Nicholas Hartmann",
      "license": "CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File%3ARome_Pantheon_facade_and_Piazza_della_Rotonda.jpg"
    },
    "venice-canal": {
      "artist": "This Photo was taken by Wolfgang Moroder.  \n\nFeel free to use my photos, but please mention me as th",
      "license": "CC BY-SA 3.0",
      "source": "https://commons.wikimedia.org/wiki/File%3ACanal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg"
    },
    "venice-gondola": {
      "artist": "Jörg Bittner (Unna)",
      "license": "CC BY-SA 3.0",
      "source": "https://commons.wikimedia.org/wiki/File%3AVenezia-Venice-Venedig-JBU05.JPG"
    },
    "como-lake": {
      "artist": "Maurizio Moro5153",
      "license": "CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File%3ABellagio_da_Tremezzo.jpg"
    },
    "swiss-lucerne": {
      "artist": "Asurnipal",
      "license": "CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File%3ALuzern-Lake_Lucerne-Stadt_Luzern_%28ship%29-04ASD.jpg"
    },
    "interlaken-valley": {
      "artist": "Chensiyuan",
      "license": "CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File%3A1_lauterbrunnen_valley_wengen_2022.jpg"
    },
    "swiss-jungfrau": {
      "artist": "Murray Foubister",
      "license": "CC BY-SA 2.0",
      "source": "https://commons.wikimedia.org/wiki/File%3AEiger-Monch-Jungfrau-2.jpg_%2810955783763%29.jpg"
    },
    "swiss-first": {
      "artist": "Bob Tan",
      "license": "CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File%3AGrindelwald_as_seen_from_the_First_cable_car_station_100622.jpg"
    },
    "swiss-oeschinen": {
      "artist": "JoachimKohler-HB",
      "license": "CC BY-SA 4.0",
      "source": "https://commons.wikimedia.org/wiki/File%3ADer_Oeschinensee_bei_Kandersteg_BE_%282015%29.jpg"
    },
    "paris-eiffel": {
      "artist": "Getfunky Paris",
      "license": "CC BY 2.0",
      "source": "https://commons.wikimedia.org/wiki/File%3AEiffel_Tower_and_Pont_Alexandre_III_at_night.jpg"
    }
  },

  /* ---------- EMERGENCY ---------- */
  emergency: {
    universal: {
      number: "112",
      note: "Works in Italy, Switzerland and France. Free from any phone, locked or without a SIM. Operators speak English. This is the only number you truly need to remember.",
    },
    byCountry: [
      { country: "Italy", items: [["All", "112"], ["Police", "113"], ["Medical", "118"], ["Fire", "115"]] },
      { country: "Switzerland", items: [["All", "112"], ["Police", "117"], ["Ambulance", "144"], ["Air rescue (REGA)", "1414"]] },
      { country: "France", items: [["All", "112"], ["Police", "17"], ["Medical (SAMU)", "15"], ["Fire", "18"]] },
    ],
    us: [
      { label: "Brandon mobile", value: "+1 801 696 5540" },
      { label: "Tatiana mobile", value: "" },
      { label: "Home contact", value: "" },
    ],
    keyNumbers: [
      { label: "Duodo Palace, Venice", value: "+39 041 520 3329" },
      { label: "Hotel de Londres Eiffel", value: "+33 1 45 51 63 02" },
      { label: "Lake Como Transfers — Jenny", value: "+39 349 3431906" },
      { label: "Cooking Italy (Venice class)", value: "+39 377 341 8113" },
      { label: "Trenitalia call centre", value: "+39 06 5210550" },
    ],
    warn: "Passports must be valid through ~9 April 2027 (six months past 9 Oct). Card 1-800 numbers do NOT work from Europe — write the international collect-call number off the back of each card before you fly.",
  },

  /* ---------- STAYS ---------- */

  /* Transit waypoints — the stations, airports and piers the itinerary
     actually routes through. Static here rather than in the shared
     wishlist: nobody wants to "do" Milano Centrale. A `city` of "" means
     it only shows under the All filter, because it sits far enough from
     any one base that including it would blow out that city's map. */
  transit: [
    { id: "fco", kind: "air", name: "Rome Fiumicino (FCO)",
      city: "Rome", lat: 41.815391, lng: 12.226485,
      when: "Day 2 \u00b7 land 2:25 PM, Terminal 1. Regulated flat-fare taxi to anywhere inside the Aurelian Walls." },
    { id: "termini", kind: "rail", name: "Roma Termini",
      city: "Rome", lat: 41.900582, lng: 12.502527,
      when: "Day 6 \u00b7 Frecciarossa 9416 to Venice, 10:35. Gated platforms \u2014 have the barcode ready." },
    { id: "slucia", kind: "rail", name: "Venezia Santa Lucia",
      city: "Venice", lat: 45.441075, lng: 12.321032,
      when: "Day 6 arrive 2:34 PM \u00b7 Day 9 depart 10:48 AM. NOT Mestre \u2014 Mestre is the stop before, on the mainland." },
    { id: "comosg", kind: "rail", name: "Como San Giovanni",
      city: "Lake Como", lat: 45.809083, lng: 9.07273,
      when: "Day 9 \u00b7 arrive 2:23 PM. No train serves the west shore \u2014 taxi ~40 min up to Griante." },
    { id: "iost", kind: "rail", name: "Interlaken Ost",
      city: "Interlaken", lat: 46.690448, lng: 7.868996,
      when: "Day 12 arrive \u00b7 Day 17 depart. About 10 minutes' walk from the apartment on H\u00f6heweg." },
    { id: "cdg", kind: "air", name: "Paris Charles de Gaulle",
      city: "Paris", lat: 49.00689, lng: 2.57108,
      when: "Day 1\u20132 \u00b7 land 9:30 AM Terminal 2E, depart 12:15 PM from 2F. Passport control here. Day 23 \u00b7 fly home 10:25 AM." },
    { id: "lyon", kind: "rail", name: "Paris Gare de Lyon",
      city: "Paris", lat: 48.843663, lng: 2.374487,
      when: "Day 17 \u00b7 arrive 3:38 PM from Basel." },
    { id: "chessy", kind: "rail", name: "Marne-la-Vall\u00e9e \u2014 Chessy",
      city: "Paris", lat: 48.869913, lng: 2.782173,
      when: "Day 20 \u00b7 the Disneyland stop. RER A east, terminus \u2014 you cannot overshoot it." },
    { id: "milano", kind: "rail", name: "Milano Centrale",
      city: "", lat: 45.485879, lng: 9.204262,
      when: "Day 9 \u00b7 28-minute transfer, 1:15 \u2192 1:43 PM. Gated for the high-speed platforms; the regional ones are not." },
    { id: "lugano", kind: "rail", name: "Lugano",
      city: "", lat: 46.005499, lng: 8.946849,
      when: "Day 12 \u00b7 Gotthard Panorama Express departs 9:18. Drop bags at the departure track by 09:08." },
    { id: "fluelen", kind: "boat", name: "Fl\u00fcelen",
      city: "", lat: 46.901663, lng: 8.624236,
      when: "Day 12 \u00b7 train arrives 11:35, steamer leaves 12:00." },
    { id: "luzern", kind: "boat", name: "Luzern \u2014 Bahnhofquai Pier 1",
      city: "", lat: 47.051384, lng: 8.311182,
      when: "Day 12 \u00b7 steamer docks 2:47 PM. Collect the transferred bags here." },
    { id: "basel", kind: "rail", name: "Basel SBB",
      city: "", lat: 47.547623, lng: 7.589642,
      when: "Day 17 \u00b7 TGV Lyria 9218 to Paris, 12:34. Separate ticket from the Swiss leg \u2014 protect the buffer." },
  ],

  stays: [
    {
      img: "rome-colosseum",
      id: "rome", lat: 41.895806, lng: 12.4714, city: "Rome", country: "Italy",
      name: "Airbnb apartment", conf: "HM32T5Z5CD",
      addr: "Via dei Cappellari 4, 00186 Roma",
      inDate: "Fri 18 Sep", inTime: "3:00 PM",
      outDate: "Tue 22 Sep", outTime: "10:00 AM",
      nights: 4,
      host: "Daplace", phone: "",
      link: "https://www.airbnb.com/trips/v1/reservation-details/ro/RESERVATION2_CHECKIN/HM32T5Z5CD",
      notes: "Cappellari sits inside a ZTL restricted lane — expect a short walk from wherever the car can stop. Door code is in the Airbnb app; save it offline.",
    },
    {
      img: "venice-canal",
      id: "venice", lat: 45.434348, lng: 12.333963, city: "Venice", country: "Italy",
      name: "Duodo Palace Hotel", conf: "920524140 · PIN 8716",
      addr: "Calle Minelli 1887–1888, San Marco, 30124 Venezia",
      inDate: "Tue 22 Sep", inTime: "3:00 PM",
      outDate: "Fri 25 Sep", outTime: "—",
      nights: 3,
      host: "", phone: "+39 041 520 3329",
      link: "https://www.duodopalacehotel.com/",
      notes: "The room is settled at the desk, not prepaid — the card only guarantees it, and there is a city tax on departure. Room and Wi-Fi only, no breakfast. Free cancellation until 13:00 on 19 Sep. Ask about private dock access for the water-taxi arrival.",
    },
    {
      img: "como-lake",
      id: "como", lat: 45.99528, lng: 9.23554, city: "Lake Como", country: "Italy",
      name: "Airbnb apartment — Griante", conf: "HMAZ8FCH2H",
      addr: "Via Regina 25, 22011 Griante CO",
      inDate: "Fri 25 Sep", inTime: "3:00 PM (self lockbox)",
      outDate: "Mon 28 Sep", outTime: "early — car at 07:00",
      nights: 3,
      host: "Irina · co-host Vincent", phone: "",
      link: "https://www.airbnb.com/trips/v1/reservation-details/ro/RESERVATION2_CHECKIN/HMAZ8FCH2H/g",
      notes: "Self check-in by lockbox — get the code from the Airbnb app and save it offline BEFORE you leave Venice. The boat dock at Tremezzo is a ten-minute walk south along the shore.",
    },
    {
      img: "interlaken-valley",
      id: "interlaken", lat: 46.684924, lng: 7.854739, city: "Interlaken", country: "Switzerland",
      name: "Airbnb apartment", conf: "HMRZA2CJCW",
      addr: "Höheweg 2, 3800 Interlaken",
      inDate: "Mon 28 Sep", inTime: "4:00 PM",
      outDate: "Sat 3 Oct", outTime: "10:00 AM",
      nights: 5,
      host: "Griwa Rent", phone: "",
      link: "https://www.airbnb.com/trips/v1/reservation-details/ro/RESERVATION2_CHECKIN/HMRZA2CJCW",
      notes: "On the main street, about 10 minutes' walk from Interlaken Ost. Longest stay of the trip.",
    },
    {
      img: "paris-eiffel",
      id: "paris", lat: 48.857936, lng: 2.301647, city: "Paris", country: "France",
      name: "Hotel de Londres Eiffel", conf: "KBN7HF",
      addr: "1 Rue Augereau, 75007 Paris",
      inDate: "Sat 3 Oct", inTime: "3:00 PM",
      outDate: "Fri 9 Oct", outTime: "11:30 AM",
      nights: 6,
      host: "", phone: "+33 1 45 51 63 02",
      link: "https://www.hotel-paris-londres-eiffel.com/en/",
      notes: "Night 1 (3→4 Oct) is the Poets room. Nights 2–6 are the Eiffel-tower-view room on the 6th floor. The balance is settled AT THE HOTEL, plus city tax. Breakfast is optional — buffet or continental, served 7–10 AM. Nearest metro Ecole Militaire (Line 8), ~8 min. Two modification documents on file — confirm which booking is current at check-in.",
    },
  ],

  /* ---------- TICKETS ---------- */
  tickets: [
    {
      id: "flights", group: "Flights", title: "Delta — both directions",
      provider: "Delta Air Lines", ref: "GKS49A",
      lines: [
        ["DL 220", "Salt Lake City → Paris CDG · Thu 17 Sep 3:30 PM → Fri 18 Sep 9:30 AM · A330-900neo · arrives Terminal 2E"],
        ["Layover", "2h 45m at CDG — arrive 2E, depart 2F. Inter-terminal walk plus passport control; this is your entry into Schengen."],
        ["DL 8299", "Paris CDG → Rome Fiumicino · Fri 18 Sep 12:15 PM → 2:25 PM · A320 · depart 2F, arrive Terminal 1"],
        ["DL 221", "Paris CDG → Salt Lake City · Fri 9 Oct 10:25 AM → 1:19 PM · nonstop, 10h 54m · Terminal 2E"],
      ],
      people: [
        { who: "Brandon", detail: "Seats 49H out · 16F CDG–FCO · 46H home · ticket 0062434144768 · SkyMiles 9900655664 Silver" },
        { who: "Tatiana", detail: "Same record, GKS49A — seat numbers not yet recorded" },
      ],
      notes: "Two free checked bags each, both directions, 23 kg. Boarding passes live in the Fly Delta app — download before you leave the house.",
      account: "paynebrandon4@gmail.com",
    },
    {
      id: "tk2n7n", group: "Rail", title: "Rome → Venice · Tue 22 Sep",
      provider: "Trenitalia", ref: "PNR TK2N7N",
      lines: [
        ["Frecciarossa 9416", "Roma Termini 10:35 → Venezia S. Lucia 14:34 · 3h 59m · Super Economy, Standard"],
        ["Get off at Santa Lucia", "NOT Mestre — Mestre is the stop before and it is on the mainland."],
      ],
      people: [
        { who: "Brandon", detail: "Coach 5, seat 11A · ticket 2891446962 · change code (CP) 718602" },
        { who: "Tatiana", detail: "Coach 5, seat 11B · ticket 2891446961 · change code (CP) 718601" },
      ],
      links: [
        { label: "Barcode / self check-in", url: "https://www.lefrecce.it/Channels.Website.WEB/#/self-check-in?id=oSOvdBA_RxE6yaOR0BFoE4aSvoylSyr3y1gSypCoMFc=&lang=en" },
        { label: "Add to Apple Wallet", url: "https://www.lefrecce.it/Channels.Website.BFF.WEB/website/post/purchase/wallet/apple?resourceId=w4mdh4a2z-w6h7p4x6a-e7f54785_F6E7C60A82E13F1788021F97D3D05B06" },
      ],
      notes: "Guest purchase — does NOT appear in the Trenitalia app under brandon_payne. Resend code 1842014562. Never validate or stamp a Frecciarossa ticket. Roma Termini gates the platform and wants a barcode; fallback is the PNR plus passport.",
      account: "paynefamily522@gmail.com",
      images: ["tickets/tk2n7n-brandon.png", "tickets/tk2n7n-tatiana.png"],
    },
    {
      id: "tk9pwn", group: "Rail", title: "Venice → Lake Como · Fri 25 Sep",
      provider: "Trenitalia", ref: "PNR TK9PWN",
      lines: [
        ["Frecciarossa 9724", "Venezia S. Lucia 10:48 → Milano Centrale 13:15 · 2h 27m"],
        ["Regionale 25520", "Milano Centrale 13:43 → Como S. Giovanni 14:23 · 40 min · 2nd class, no seat assignment"],
        ["Transfer", "28 minutes at Milano Centrale — protected, it is a single booking."],
      ],
      people: [
        { who: "Brandon", detail: "Coach 5, seat 9B · Frecciarossa ticket 2891452649 · CP 808502 · regional ticket 2891452648" },
        { who: "Tatiana", detail: "Coach 5, seat 9A · Frecciarossa ticket 2891452647 · CP 808501 · regional ticket 2891452646" },
      ],
      links: [
        { label: "Barcode / self check-in", url: "https://www.lefrecce.it/Channels.Website.WEB/#/self-check-in?id=U1lEWQpwMaOhqFGBbhxBGIaSvoylSyr3y1gSypCoMFc=&lang=en" },
        { label: "Add to Apple Wallet (Frecciarossa only)", url: "https://www.lefrecce.it/Channels.Website.BFF.WEB/website/post/purchase/wallet/apple?resourceId=w4mdh4a2z-w6b7h4f6p-e7f54785_3907DA9328CEB96CC499CA0071634E64" },
      ],
      warn: "Apple Wallet takes only the 2 Frecciarossa passes — it drops both Trenord regional tickets. Confirmed 29 Aug. That no longer matters: all four barcodes are saved below, Frecciarossa and Trenord, so nothing depends on Wallet. Regional platforms at Milano Centrale are not gated and the conductor checks onboard anyway.",
      notes: "Guest purchase. Resend code 1842017435. The four barcodes below came off the self check-in link on 29 Aug — it does render the regional legs, which the earlier notes had down as unknown.",
      account: "paynefamily522@gmail.com",
      images: ["tickets/tk9pwn-brandon.png", "tickets/tk9pwn-tatiana.png",
               "tickets/tk9pwn-trenord-brandon.png", "tickets/tk9pwn-trenord-tatiana.png"],
    },
    {
      id: "swisspass", group: "Rail", title: "Swiss Travel Pass ×2",
      provider: "SBB", ref: "Order 151490866009",
      lines: [
        ["Valid", "Mon 28 Sep 00:00 → Sun 4 Oct 05:00 · 6 days · 2nd class"],
        ["Covers", "The GPE fare and the Lake Lucerne steamer on the 28th, Interlaken→Basel on 3 Oct, and all local Swiss transport in between."],
      ],
      people: [
        { who: "Brandon", detail: "Ticket-ID 211992143383 (ref 1717801730)" },
        { who: "Tatiana", detail: "Ticket-ID 994520423225 (ref 1717801729)" },
      ],
      warn: "ONLY VALID WITH YOUR PASSPORT. Carry passports on the train on the 28th — do not put them in the bag going ahead to Luzern. No validation or exchange required.",
      notes: "Guest purchase on shop.sbb.ch, so it is NOT in SBB Mobile. Both passes are saved below and travel offline with the app. Originals: the 13 Jul 01:39 email 'Your online purchase from SBB', or reprint from the order page at shop.sbb.ch (order 151490866009).",
      account: "paynefamily522@gmail.com",
      images: ["tickets/swisspass-brandon.png", "tickets/swisspass-tatiana.png"],
    },
    {
      id: "gpe", group: "Rail", title: "Gotthard Panorama Express · Mon 28 Sep",
      provider: "SBB / GoPEx", ref: "Reservation 421839-1 · order 4800008796",
      lines: [
        ["Train 3092", "Lugano 09:18 → Flüelen 11:35 · Carriage 14, seats 71 & 72 · 1st-class panorama car"],
        ["Steamer", "Flüelen 12:00 → Luzern 14:47 · open seating, 1st-class deck"],
        ["Class upgrade", "2 × Tagesklassenwechsel · order 151490869039 · Brandon Ticket-ID 705407089263 · Tatiana 713314984153"],
      ],
      warn: "You must show THREE things stacked: the Swiss Travel Pass (the fare) + the first-class day upgrade (or seats 71–72 are not yours) + passport. The reservation letter is proof of seat, not a fare.",
      notes: "BAGGAGE TRANSFER IS INCLUDED. Drop bags at the Lugano departure track at least 10 minutes before 09:18 — so by 09:08. 23 kg per piece, NO access en route. Collect at Luzern, Bahnhofquai Pier 1, where the steamer docks. Lunch is served on the boat — table reservation recommended at lakelucerne.ch/tischreservation.",
      account: "paynefamily522@gmail.com",
      images: ["tickets/gpe-upgrade-brandon.png", "tickets/gpe-upgrade-tatiana.png"],
    },
    {
      id: "tgv", group: "Rail", title: "Basel → Paris TGV · Sat 3 Oct",
      provider: "SBB / TGV Lyria", ref: "E52VJX · order 151490866652",
      lines: [
        ["TGV Lyria", "Basel SBB 12:34 → Paris Gare de Lyon 15:38 · 3h 04m · 2nd class, Semi Flex (exchangeable)"],
      ],
      people: [
        { who: "Brandon", detail: "Coach 16, seat 662 — upper deck · e-ticket 809728564" },
        { who: "Tatiana", detail: "Coach 16, seat 663 — upper deck · e-ticket 427287804" },
      ],
      warn: "Order ...652 (TGV) and ...009 (Swiss Pass) were bought in the same session and look almost identical. Do not quote the wrong one at a counter.",
      notes: "Separate ticket from the Swiss leg, so a late Swiss train is your problem, not the railway's. Protect the ~1h buffer at Basel. TGV Lyria reference E52VJX — one e-ticket per passenger, both saved below. Not stamped, but it must be shown with a passport.",
      account: "paynefamily522@gmail.com",
      images: ["tickets/tgv-brandon.png", "tickets/tgv-tatiana.png"],
    },
    {
      id: "gpecar", group: "Ground", title: "Griante → Lugano car · Mon 28 Sep",
      provider: "Lake Como Transfers", ref: "X7XZW8VIUV",
      lines: [
        ["Pick-up", "07:00 SHARP at Via Regina 25, Griante · Mercedes E-Class · drop Lugano Stazione FFS · ~1h–1h20"],
        ["Contact", "Jenny · WhatsApp / tel +39 349 3431906 · info@lakecomotransfers.com"],
      ],
      warn: "Ask the driver to route Menaggio–Porlezza, NOT Como–Chiasso — weekday cross-border commuter queues can be long. Passports out at the border.",
      notes: "Cancellation: free until 21 Sep, partial until 26 Sep, not cancellable after that.",
    },
    {
      id: "disney", group: "Activities", title: "Disneyland Paris · Tue 6 Oct",
      provider: "Disneyland Paris", ref: "35722312",
      lines: [
        ["Tickets", "Dated 1 Day / 2 Park — both parks · 2 adults"],
        ["Premier Access Ultimate", "Both parks · unlimited skip-the-line"],
        ["Valid", "6 October 2026 only · cancellable until 3 October"],
      ],
      warn: "The confirmation email will NOT get you in. Your QR codes — tickets and Premier Access both — live in the Disneyland Paris app under 'My Tickets & Passes'. Install it, log in on both phones, and load them offline before the day. Bring photo ID for both of you.",
      account: "paynebrandon4@gmail.com",
    },
    {
      id: "beach", group: "Activities", title: "Victoria Beach, Menaggio · Sat 26 Sep",
      provider: "Spiagge.it", ref: "Booking 43786704",
      lines: [
        ["What", "Umbrella SC3-8 · 2 maxi beds · full day · in the name Brandon Payne"],
        ["Where", "Victoria Beach, Menaggio (CO) — the lakefront beach club by the Grand Hotel Victoria, ~4 km north of Griante"],
        ["Paid", "€87.05 in full (includes €2.06 weather insurance) · NOT refundable"],
        ["Weather cover", "REVO Garanzia Bel Tempo · policy OX00074001-000083032 · 2 mm+ of rain between 9:00 and 15:00 = automatic refund of the beach fee, REVO emails within 5 days for an IBAN"],
      ],
      notes: "Check in at the beach reception desk with the QR code below — it is the ticket. Getting there: bus C10 along Via Regina (~10 min) or the ferry from Cadenabbia pier; walking is ~50 min. Questions for the beach itself go to info@victoriabeach.it; booking changes go to support@spiagge.it. The Spiagge.it service-fee receipt is in the confirmation email; the beach issues its own receipt on site.",
      links: [
        { label: "Map", url: "https://www.google.com/maps/search/?api=1&query=Victoria+Beach+Menaggio" },
      ],
      account: "paynefamily522@gmail.com",
      images: ["tickets/victoria-beach-qr.png"],
    },
    {
      id: "boat", group: "Activities", title: "Lake Como boat rental · Sun 27 Sep",
      provider: "Nautic Planet", ref: "#2863",
      lines: [
        ["Boat", "Motorboat 'Bellagio' · 4 hours · 2 people"],
        ["Departs", "Tremezzo · 11:00 AM, back 3:00 PM · arrive by 10:45"],
      ],
      notes: "Tremezzo is just south of Griante — about a ten-minute walk along the shore. Parking near the dock is genuinely difficult in season, so walk. Bring valid photo ID for both of you. booking@nauticplanet.com",
      account: "paynefamily522@gmail.com",
    },
    {
      id: "vatican", group: "Activities", title: "Vatican Museums · Sat 19 Sep",
      provider: "Viator — operated by Golden Rome Tours", ref: "1447441127 · confirmation 1829495283",
      lines: [
        ["What", "Vatican Museums & Sistine Chapel, skip-the-line admission · 2 adults · €190.00 paid"],
        ["When", "12:30 entry"],
        ["Operator", "Golden Rome Tours · Via Germanico 28, Roma · +39 380 264 4344 · goldenrometours@gmail.com"],
      ],
      warn: "All sales are final — 100% cancellation penalty. Open the voucher well before the day and find the meeting point: this is a reseller's allocation, so you may be collecting the ticket from a rep rather than entering directly.",
      notes: "Bought through Viator because the Vatican's own ticket office (tickets.museivaticani.va) was sold out for every day in Rome — the Museums close on Sundays, and both 19 and 21 September showed nothing bookable. Mobile ticket, so save it offline. Dress code is enforced: shoulders and knees covered.",
      account: "paynefamily522@gmail.com",
    },
    {
      id: "colosseum", group: "Activities", title: "Colosseum · Mon 21 Sep",
      provider: "Parco archeologico del Colosseo", ref: "OCO4783615",
      lines: [
        ["What", "Full Experience / Arena — arena floor, Roman Forum and Palatine · 2 × €24.00 full price · €48.00 paid"],
        ["When", "3:15 PM timed entry — the slot is the slot, so be at the gate by 2:45"],
        ["Booked at", "ticketing.colosseo.it — the park's own ticket office"],
      ],
      notes: "Tickets are name-bound and ID is checked at the entrance — bring passports, and confirm both names are on the tickets before you fly. A name can only be corrected up to midnight on the seventh day before the visit. The PDF was emailed; download it for offline access.",
      account: "paynefamily522@gmail.com",
    },
    {
      id: "cooking", group: "Activities", title: "Venice cooking class · Thu 24 Sep",
      provider: "GetYourGuide", ref: "GYGN6BYFG5ZX · PIN q2f4T@wD",
      lines: [
        ["When", "4:00 PM, 3 hours, 2 adults, in English — be there 3:50 PM or the slot is forfeit"],
        ["Where", "Taverna San Trovaso · Calle Contarini Corfù 1016, 30123 Venezia (Dorsoduro) — over the Accademia bridge, ~15 min from the hotel"],
        ["Provider", "Cooking Italy · +39 377 341 8113"],
      ],
      notes: "Pasta and tiramisu with fine wine — you eat what you cook, with limoncello and coffee, so treat it as dinner. Tickets live in the GetYourGuide app; download before you fly. Tell them about allergies or food restrictions ahead of time. Free cancellation until 4:00 PM on 23 Sep.",
    },
    {
      id: "lescale", group: "Dining", title: "L'Escale Trattoria & Wine Bar · Sat 26 Sep",
      provider: "Grand Hotel Tremezzo", ref: "under 'Brandon'",
      lines: [
        ["When", "7:00 PM · 2 people"],
        ["Where", "Via Statale 5401, 22016 Tremezzo — the Grand Hotel Tremezzo's lakefront trattoria, ~10–15 min walk south from the apartment"],
        ["Phone", "+39 0344 42491"],
      ],
      warn: "Card-guaranteed. Free to cancel up to 24 hours before — so by 7:00 PM Fri 25 Sep. A no-show or a later cancellation is charged €160.",
      notes: "Confirmation email says 'Reservation confirmed' with a CANCEL MY RESERVATION button — use that, not a phone call, if plans change before Friday evening. The boat dock for Sunday is a few minutes further along the shore.",
      links: [
        { label: "Map", url: "https://www.google.com/maps/search/?api=1&query=L%27Escale+Trattoria+Tremezzo" },
      ],
      account: "paynefamily522@gmail.com",
    },
    {
      id: "cafehomme", group: "Dining", title: "Café de l'Homme · Wed 7 Oct",
      provider: "OpenTable", ref: "in-app",
      lines: [
        ["When", "8:00 PM · 2 people · indoor, standard seating"],
        ["Where", "17 Place du Trocadéro, 75016 Paris — in the Palais de Chaillot, straight across the Seine from the Eiffel Tower"],
      ],
      notes: "Status: Experience confirmed. No prepayment. Change or cancel under 'Manage reservation' in the OpenTable app.",
    },
    {
      id: "vecioforno", group: "Dining", title: "Al Vecio Forno · Wed 23 Sep",
      provider: "—", ref: "none issued",
      lines: [["When", "7:30 PM · party of 2, under 'Payne'"]],
      warn: "No written confirmation exists. Call to reconfirm a day or two ahead. Address and phone still need filling in.",
    },
  ],

  /* ---------- ACCOUNTS ---------- */
  accounts: [
    { label: "Delta / Disney", value: "paynebrandon4@gmail.com" },
    { label: "SBB / boat / Trenitalia", value: "paynefamily522@gmail.com" },
    { label: "Trenitalia", value: "Guest purchase — no account back-link. Resend codes 1842014562 (TK2N7N) · 1842017435 (TK9PWN)." },
    { label: "SBB", value: "Guest purchase — NOT in SBB Mobile. Access via the shop.sbb.ch order links in the 13 Jul emails." },
    { label: "SkyMiles", value: "Brandon 9900655664 · Silver" },
  ],

  /* ---------- OPEN ITEMS ---------- */
  open: [
    { what: "Como → Griante car", when: "25 Sep, on arrival", why: "Lake Como Transfers declined this leg on 23 Sep, so it is the white-taxi rank outside Como S. Giovanni (train lands 14:23). Nothing downstream depends on it — check-in is self-service at 3pm." },
    { what: "Cooking class cancellation window", when: "23 Sep, 4:00 PM", why: "Last moment to cancel it." },
    { what: "L'Escale dinner cancellation window", when: "25 Sep, 7:00 PM", why: "Last moment to cancel without the €160 no-show charge." },
    { what: "Disney cancellation window", when: "3 Oct", why: "Last day it can be cancelled." },
    { what: "Paris → CDG taxi", when: "ask reception 8 Oct", why: "The one ground leg not to wing. Hailing in the 7th at 6:30 AM is unreliable and app rides cancel." },
    { what: "Swiss excursions", when: "29 Sep – 2 Oct", why: "Four open days, four things, nothing assigned to a date. Book a day ahead off the forecast." },
    { what: "Steamer lunch table", when: "before 28 Sep", why: "lakelucerne.ch/tischreservation — optional but recommended." },
    { what: "Tatiana's seat numbers", when: "anytime", why: "Flight record GKS49A is shared; her three seat assignments were never written down." },
    { what: "Door / lockbox codes", when: "before each arrival", why: "Rome, Como and Interlaken all need codes out of the Airbnb app, saved offline." },
    { what: "Host phone numbers", when: "anytime", why: "Daplace (Rome), Irina (Como), Griwa Rent (Interlaken)." },
    { what: "Al Vecio Forno address + phone", when: "before 23 Sep", why: "No written confirmation exists — you need to be able to call." },
    { what: "10 unplanned days", when: "—", why: "Rome ×2, Venice ×1, Interlaken ×4, Paris ×3 have nothing booked in them." },
  ],

  /* ---------- SWISS EXCURSION OPTIONS ---------- */
  excursions: [
    {
      name: "Grindelwald & First",
      gist: "Gondola to 2,168 m, Cliff Walk, then back down by zipline, mountain cart and trottibike without riding the gondola once.",
      detail: "~8:30 train to Grindelwald (35 min, on the pass) · ~9:20 gondola · ~10:00 Cliff Walk · ~11:15 First Flyer, then Glider, Mountain Cart, Trottibike · ~1:30 lunch in the village. Buy the Adventure Package at the base station — it is the official bundle of gondola plus all four activities. THREE TRAPS: each activity has a last-run time earlier than the gondola's, so treat the earliest as your turnaround; the kart and trottibike shut on a wet track and the Flyer shuts in high wind, so the chain can close on a day the gondola runs fine; the order is fixed top-to-bottom and you cannot come back for a stage. Most weather-fragile of the four — give it the best forecast.",
    },
    {
      name: "E-bikes, Lauterbrunnen valley",
      gist: "Valley floor south to Stechelberg, ~8 km each way, flat, cliff walls both sides.",
      detail: "~20 min train to Lauterbrunnen on the pass, hire in the village. Stop at Staubbach Falls (300 m, straight above the village) and Trümmelbach Falls (ten glacier-fed falls INSIDE the mountain, reached by lift and galleries — separate admission, worth it). Half day with a long lunch. Look up while you ride: Lauterbrunnen is the world capital of BASE jumping. Book bikes ahead if the forecast is good — stock goes early on clear days.",
    },
    {
      name: "Mürren terrace hike",
      gist: "Grütschalp → Mürren → Gimmelwald. Point to point, near level, Eiger/Mönch/Jungfrau across the valley the whole way.",
      detail: "Train to Lauterbrunnen (~20 min) · cable car to Grütschalp (~4 min) · walk 4.3 km to Mürren, 1h15–1h30, the railway runs parallel so you can bail at Winteregg · lunch in Mürren (car-free) · walk 1.5 km down to Gimmelwald, 30–40 min · cable car to Stechelberg · bus and train home, ~45 min. VERIFY FIRST: the Schilthornbahn has been through a long reconstruction — confirm the Gimmelwald–Stechelberg stage is running, because the return leg depends on it. If it is out, reverse back via Grütschalp.",
    },
    {
      name: "Oeschinensee, Kandersteg",
      gist: "Turquoise lake in a cirque at 1,578 m, walled by the Blüemlisalp with waterfalls dropping straight in. UNESCO listed.",
      detail: "~8:30 train via Spiez to Kandersteg (~1 h, one change, on the pass) · ~15–20 min walk to the gondola base · gondola up · ~20–25 min walk down to the shore · rowboats if it is calm · lakeside lunch · ~1:00 the Panoramaweg high path, which is the view worth the day · ~2:30 walk down to Kandersteg (1h30) rather than riding · ~4:30 train home. THE WEATHER-RESILIENT DAY — enclosed rather than panoramic, so it still works when the high peaks are socked in. If one of the four looks marginal, make it this one. Verify the gondola's early-October operating calendar.",
    },
    {
      name: "Harder Kulm (back pocket)",
      gist: "Ten-minute funicular from town. Good for a sunset after another day.",
      detail: "",
    },
  ],
};
