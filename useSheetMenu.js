import { useEffect, useState } from 'react';
import { fetchMenuFromSheet } from '../services/sheetsService';
import { CACHE_MINUTES } from '../config/sheetConfig';

const CACHE_KEY = 'mxd_sheet_menu_cache';

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, savedAt } = JSON.parse(raw);
    const ageMinutes = (Date.now() - savedAt) / 60000;
    if (ageMinutes > CACHE_MINUTES) return null;
    return data;
  } catch (e) {
    return null;
  }
}
function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, savedAt: Date.now() }));
  } catch (e) { /* sessionStorage full or unavailable — safe to skip caching */ }
}

// status: 'loading' | 'ready' | 'error'
export function useSheetMenu() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) {
      setCategories(cached);
      setStatus('ready');
      return;
    }

    fetchMenuFromSheet()
      .then(data => {
        if (cancelled) return;
        writeCache(data);
        setCategories(data);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => { cancelled = true; };
  }, []);

  return { categories, status };
}
