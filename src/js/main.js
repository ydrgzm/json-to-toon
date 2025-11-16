// Main entry point
import { encode, decode } from '@toon-format/toon';
import { initializeConverter } from './converter.js';
import { initializeUI } from './ui.js';
import { initializeTokenCounter } from './token-counter.js';
import { initializeHistory } from './history.js';

// Make TOON library globally available
window.toonLibrary = { encode, decode };
console.log('TOON library loaded successfully');

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeConverter();
  initializeUI();
  initializeTokenCounter();
  initializeHistory();
});

