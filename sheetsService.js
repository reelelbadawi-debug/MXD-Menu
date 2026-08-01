import { SHEET_API_URL } from '../config/sheetConfig';

function isTrue(val) {
  if (typeof val === 'boolean') return val;
  return ['true', 'yes', '1', 'y'].includes(String(val ?? '').trim().toLowerCase());
}

// Accepts whichever shape the Apps Script happens to return —
// a raw array, or an object wrapping the array under a common key —
// so this keeps working even if the script's response format changes slightly.
function extractRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && Array.isArray(payload.items)) return payload.items;
  if (payload && Array.isArray(payload.values)) return payload.values;
  if (payload && Array.isArray(payload.result)) return payload.result;
  return [];
}

// Reads a field from a row object regardless of small header variations
// (e.g. "Item Name" vs "ItemName" vs "item_name") coming back from Apps Script.
function field(row, ...keys) {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== null) return row[k];
  }
  return '';
}

// Fetches the menu from the Google Apps Script Web App and turns it into
// the exact shape the UI needs: an array of categories, each with its
// own filtered + sorted items. Categories come ONLY from whatever values
// appear in the "Category" column — nothing is hardcoded here.
export async function fetchMenuFromSheet() {
  if (!SHEET_API_URL || SHEET_API_URL.includes('PASTE_YOUR')) {
    throw new Error('SHEET_NOT_CONFIGURED');
  }

  const res = await fetch(SHEET_API_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('SHEET_FETCH_FAILED');

  const payload = await res.json();
  if (payload && payload.error) throw new Error('SHEET_FETCH_FAILED');

  const rawRows = extractRows(payload);

  const rows = rawRows
    .map(r => ({
      id: String(field(r, 'ID', 'Id', 'id')).trim(),
      category: String(field(r, 'Category', 'category')).trim(),
      name: String(field(r, 'Item Name', 'ItemName', 'item_name', 'name')).trim(),
      desc: String(field(r, 'Description', 'description')).trim(),
      price: String(field(r, 'Price', 'price')).trim(),
      image: String(field(r, 'Image', 'image')).trim(),
      available: isTrue(field(r, 'Available', 'available')),
      featured: isTrue(field(r, 'Featured', 'featured')),
      sortOrder: parseFloat(field(r, 'Sort Order', 'SortOrder', 'sort_order')) || 0,
    }))
    .filter(r => r.name && r.category)   // ignore fully blank rows
    .filter(r => r.available);           // Available must be exactly TRUE

  // Group into categories, preserving the order categories first
  // appear in the sheet (top-to-bottom row order = category order).
  const order = [];
  const byCategory = {};
  rows.forEach(r => {
    if (!byCategory[r.category]) {
      byCategory[r.category] = [];
      order.push(r.category);
    }
    byCategory[r.category].push(r);
  });

  const categories = order.map(catName => {
    const items = byCategory[catName]
      .slice()
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.sortOrder - b.sortOrder;
      });
    return { id: catName, name: catName, items };
  });

  return categories;
}
