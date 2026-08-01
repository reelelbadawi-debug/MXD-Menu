# MXD مكسد — Restaurant Menu Website

A clean, standalone React + Vite site. No backend, no accounts, no
environment variables, no configuration of any kind. All menu content
lives in one JSON file you edit by hand.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build for production

```bash
npm run build
```

## Editing the menu

Everything — restaurant info, categories, items, prices, descriptions,
images — lives in **`src/data/menu.json`**. Open it in any text editor.

```json
{
  "restaurant": {
    "name": "MXD مكسد",
    "tagline": "ملوك السعادة",
    "address": "الأقصر - طيبة، الحي الثاني",
    "phones": ["01040016416", "01040016417"]
  },
  "categories": [
    {
      "id": "beef-burger",
      "name": "برجر لحمة",
      "icon": "burger",
      "items": [
        { "name": "كلاسيك برجر (سنجل)", "price": 110, "desc": "", "image": "" }
      ]
    }
  ]
}
```

**To change a price:** find the item, edit `"price"`.
**To add an item:** copy an existing `{ "name": ..., "price": ..., "desc": ..., "image": "" }` line inside the right category's `items` array, edit it.
**To remove an item:** delete its line.
**To add a whole new category:** copy a `{ "id": ..., "name": ..., "icon": ..., "items": [...] }` block and edit it. `id` must be unique and URL-safe (letters/numbers/hyphens only, no spaces).
**To add a photo:** paste an image URL into `"image"` (upload the photo somewhere free like postimages.org, imgbb.com, or imgur.com first, and use the *direct* link).
**Optional per-item flags** (add these keys if/when you need them): `"hidden": true` to hide an item without deleting it, `"soldOut": true` to show a "خلص" badge on it.

**Available category icons:** `burger`, `wrap`, `plate`, `cup`, `bowl`, `dessert`, `fries`, `sauce`.

After editing `menu.json`, restart `npm run dev` (or just rebuild/redeploy)
to see the changes — this is a static file bundled at build time, not a
live database.

## Deploying to Vercel

```bash
npm i -g vercel
vercel
vercel --prod
```

Or connect your GitHub repo at vercel.com → **Add New → Project**. No
environment variables to configure — it just builds and deploys.

`vercel.json` is included for correct routing behavior if you add more
pages later.

## QR code

Point your QR code at your Vercel URL once deployed. It never needs to
change — only redeploy after editing `menu.json` if you want customers to
see the update (the URL itself stays the same).

## Project structure

```
src/
  data/menu.json         ← the only file you need to touch to update the menu
  components/            Header, Footer, SearchBar, CategoryNav,
                          CategorySection, MenuItem, CategoryIcon
  pages/Home.jsx          composes everything, handles search/filter
  styles/global.css       all design tokens (colors, fonts, spacing)
  utils/icons.js          SVG path data for category icons
```

## If you ever want live multi-device editing later

This version is intentionally simple: edit a file, rebuild, redeploy. If
later you want to update prices from your phone and have every customer's
browser see it instantly without a rebuild, that requires a real backend
(Firebase, Supabase, or similar) — a bigger, different project. Ask any
time and it can be added without throwing away this codebase; only
`menu.json` would be replaced by API calls, the components stay the same.
