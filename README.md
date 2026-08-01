# MXD مكسد — Menu Website (Google Sheets edition)

A static React + Vite site whose **entire menu comes from a published
Google Sheet** — no hardcoded items in the code, no backend, no
environment variables. Edit the sheet → refresh the site → see the
update. No redeploy needed for menu changes.

---

## 1. Where the Google connection lives

**One file:** `src/config/sheetConfig.js` — `SHEET_API_URL` is already set
to your Google Apps Script Web App URL. You don't need to touch this
again unless you redeploy the Apps Script and get a new `/exec` URL.

---

## 2. Set up the Google Sheet

1. Create a new sheet at [sheets.google.com](https://sheets.google.com).
2. In row 1, add these exact column headers (order doesn't matter, spelling does):

   | ID | Category | Item Name | Description | Price | Image | Available | Featured | Sort Order |
   |----|----------|-----------|-------------|-------|-------|-----------|----------|------------|

3. **Fastest way to start:** don't type all this by hand — import the
   sample file included with this project (`sample-google-sheet.csv`).
   In Google Sheets: **File → Import → Upload** → select the file →
   choose **"Replace current sheet"**. This drops in all 63 current
   menu items, ready to edit from there.

### Column rules

- **Category** — free text (e.g. `برجر لحمة`). Whatever value you type
  becomes a category on the site automatically. A brand-new category
  name appears the moment you refresh the site — nothing to configure.
- **Available** — must be exactly `TRUE` (any other value, or blank,
  hides the item completely). Use this to instantly 86 an item without
  deleting its row.
- **Featured** — `TRUE` shows a gold "★ مميز" badge and moves the item
  to the top of its category.
- **Sort Order** — a number controlling order within its category
  (lower = higher up). Featured items always float to the top first,
  then Sort Order applies within each group.
- **Price** — shown on the site exactly as typed (text, not
  reformatted) — so `110` or `110 ج.م` both work, whatever you prefer.
- **Image** — paste a direct image URL (upload the photo somewhere free
  like postimages.org, imgbb.com, or imgur.com first, then copy the
  *direct* link). Leave blank for a clean placeholder icon.
- A category with zero `Available=TRUE` items simply won't appear on
  the site — no need to delete the category itself.

## 3. The Google Apps Script Web App

This project reads the menu from a Google Apps Script Web App (deployed
from your Sheet's **Extensions → Apps Script**, then **Deploy → New
deployment → Web app**, access set to **Anyone**). It must return the
sheet's rows as JSON — either a plain array of row objects, or an object
with the array under a `data`/`items`/`values`/`result` key; the site
reads any of these shapes.

If you ever redeploy the Apps Script (new version, new URL), copy the
new `/exec` URL into `SHEET_API_URL` in `src/config/sheetConfig.js`,
commit, and push — that's the only case where a code change is needed.

## 4. Local development

```bash
npm install
npm run dev
```

## 5. Deploy

Push to the connected GitHub repo — Vercel deploys automatically, same
URL, same QR code as before. No environment variables to add in Vercel;
the sheet URL lives in the code (it's a public read-only link, not a
secret, so this is safe).

---

## What happens in each situation

| Situation | What customers see |
|---|---|
| Sheet has valid rows | Full menu, grouped by category, in your Sort Order |
| Sheet is completely empty | "المنيو هيتحدث قريبًا" (friendly empty state, not the old menu) |
| Sheet unreachable / network error | `src/data/menu.json` is shown automatically instead (63-item snapshot) — the site never shows a broken page. This fallback is silent: the layout looks identical either way. |
| An item has `Available=FALSE` or blank | Hidden entirely |
| A category ends up with no visible items | The whole category is hidden automatically |

**Google Sheets is always the primary, live source.** `menu.json` is
never read first and never overrides a successful live fetch — it only
activates for that one page load if the Apps Script request fails, and
isn't cached, so the very next reload tries the live sheet again.
To update the fallback snapshot itself (e.g. after a big menu change),
just overwrite `src/data/menu.json` with fresher data and redeploy —
this is optional maintenance, not required for normal day-to-day use.

## Performance note

The site fetches the sheet once per browser tab and caches it in
`sessionStorage` for a few minutes (configurable via `CACHE_MINUTES` in
`sheetConfig.js`) so refreshing the page repeatedly doesn't hammer
Google's servers. To force an immediate refresh after an edit, a normal
page reload after the cache window is enough — no special action needed.

## Project structure

```
src/
  config/sheetConfig.js   ← the ONE file to edit (sheet URL + cache time)
  services/sheetsService.js  fetches + parses + groups the CSV
  hooks/useSheetMenu.js      loading/ready/error state + caching
  components/                Header, Footer, SearchBar, CategoryNav
                              (now a real filter), CategorySection,
                              MenuItem, StateMessage, CategoryIcon
  utils/categoryIcon.js      infers an icon from the category name
  pages/Home.jsx             composes everything, search + filter logic
  styles/global.css          all design tokens — unchanged from before
```
