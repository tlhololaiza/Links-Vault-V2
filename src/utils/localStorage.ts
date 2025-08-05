import { Link } from '../types';

const STORAGE_KEY = 'linksVault';

export const saveLinks = (links: Link[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch (error) {
    console.error('Failed to save links to localStorage:', error);
  }
};

export const loadLinks = (): Link[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load links from localStorage:', error);
    return [];
  }
};