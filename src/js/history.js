// Conversion History Management

const HISTORY_KEY = 'toon-converter-history';
const MAX_HISTORY_ITEMS = 10;

// Get history from localStorage
export function getHistory() {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

// Save to history
export function saveToHistory(input, output, mode) {
  try {
    const history = getHistory();
    const newItem = {
      id: Date.now(),
      input: input.substring(0, 200), // Limit preview length
      output: output.substring(0, 200),
      mode: mode,
      timestamp: new Date().toISOString()
    };

    // Remove duplicates and add to beginning
    const filtered = history.filter(item => 
      item.input !== newItem.input || item.mode !== newItem.mode
    );
    filtered.unshift(newItem);

    // Keep only last MAX_HISTORY_ITEMS
    const limited = filtered.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limited));
    return limited;
  } catch (error) {
    console.error('Failed to save history:', error);
    return getHistory();
  }
}

// Clear history
export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  } catch (error) {
    console.error('Failed to clear history:', error);
    return getHistory();
  }
}

// Initialize history UI
export function initializeHistory() {
  const historyBtn = document.getElementById('historyBtn');
  const historyMenu = document.getElementById('historyMenu');
  const historyItems = document.getElementById('historyItems');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  // Toggle history menu
  if (historyBtn && historyMenu) {
    historyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = historyMenu.style.display !== 'none';
      historyMenu.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        updateHistoryDisplay();
      }
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (historyMenu && !historyMenu.contains(e.target) && !historyBtn?.contains(e.target)) {
      historyMenu.style.display = 'none';
    }
  });

  // Clear history
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearHistory();
      updateHistoryDisplay();
      if (window.showToast) {
        window.showToast('History cleared', 'success');
      }
    });
  }

  // Update history display
  function updateHistoryDisplay() {
    if (!historyItems) return;
    
    const history = getHistory();
    if (history.length === 0) {
      historyItems.innerHTML = '<div class="history-item" style="text-align: center; color: var(--text-muted); padding: var(--spacing-lg);">No history yet</div>';
      return;
    }

    historyItems.innerHTML = history.map(item => {
      const date = new Date(item.timestamp);
      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const modeLabel = item.mode === 'json-to-toon' ? 'JSON → TOON' : 'TOON → JSON';
      
      return `
        <div class="history-item" data-id="${item.id}">
          <div class="history-item-title">${modeLabel} • ${timeStr}</div>
          <div class="history-item-preview">${escapeHtml(item.input)}</div>
        </div>
      `;
    }).join('');

    // Add click handlers
    historyItems.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id);
        const historyItem = history.find(h => h.id === id);
        if (historyItem && window.loadFromHistory) {
          window.loadFromHistory(historyItem);
          if (historyMenu) historyMenu.style.display = 'none';
        }
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

