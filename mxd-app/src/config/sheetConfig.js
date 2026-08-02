// ============================================================
// Your Google Apps Script Web App URL (returns the menu as JSON).
// This is the ONLY place you need to edit in the entire codebase.
// See README.md → "Google Apps Script" for details.
// ============================================================
export const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxShAwn1bhpVBINkTGJPqMR-sHFlosij5SKeZCo6WH3gZPtVmC3cGLAeeJJXGKk7FEb/exec'
// How long (in minutes) fetched menu data stays cached in this browser
// tab before the site re-fetches from Google Sheets. Lower = fresher
// data but more requests to your Apps Script; higher = fewer requests
// but edits take longer to show up for someone who already has the
// site open.
export const CACHE_MINUTES = 3;
