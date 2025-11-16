// Token Counting Logic

let tokenizer = null;

// Load tokenizer from CDN
async function loadTokenizer() {
  if (tokenizer) {
    return tokenizer;
  }

  try {
    // Try to use gpt-tokenizer if available
    // For now, we'll use a simple approximation
    // In production, you'd want to use the actual tokenizer
    tokenizer = {
      encode: (text) => {
        // Simple approximation: ~4 characters per token
        // This is a rough estimate. For accurate counting, use gpt-tokenizer
        return Math.ceil(text.length / 4);
      }
    };

    // Try to load actual tokenizer if available
    try {
      const tokenizerModule = await import('https://cdn.jsdelivr.net/npm/gpt-tokenizer@latest/+esm');
      if (tokenizerModule && tokenizerModule.encode) {
        tokenizer = {
          encode: (text) => {
            try {
              return tokenizerModule.encode(text, { model: 'gpt-4' }).length;
            } catch {
              return Math.ceil(text.length / 4);
            }
          }
        };
      }
    } catch (e) {
      console.warn('Using token approximation:', e);
    }

    return tokenizer;
  } catch (error) {
    console.error('Failed to load tokenizer:', error);
    // Fallback to approximation
    return {
      encode: (text) => Math.ceil(text.length / 4)
    };
  }
}

// Count tokens
export async function countTokens(text) {
  const t = await loadTokenizer();
  if (!text || text.trim() === '') return 0;
  return t.encode(text);
}

// Update token bars
function updateTokenBars(jsonTokens, toonTokens) {
  const maxTokens = Math.max(jsonTokens, toonTokens, 1);
  const jsonPercentage = (jsonTokens / maxTokens) * 100;
  const toonPercentage = (toonTokens / maxTokens) * 100;
  const savings = jsonTokens > 0 ? ((jsonTokens - toonTokens) / jsonTokens) * 100 : 0;
  const tokensSaved = jsonTokens - toonTokens;

  // Update JSON bar
  const jsonBar = document.getElementById('jsonTokenBar');
  const jsonTokenDisplay = document.getElementById('jsonTokenDisplay');
  if (jsonBar && jsonTokenDisplay) {
    jsonBar.style.width = `${jsonPercentage}%`;
    jsonTokenDisplay.textContent = formatNumber(jsonTokens);
  }

  // Update TOON bar
  const toonBar = document.getElementById('toonTokenBar');
  const toonTokenDisplay = document.getElementById('toonTokenDisplay');
  const savingsBar = document.getElementById('savingsBar');
  if (toonBar && toonTokenDisplay) {
    toonBar.style.width = `${toonPercentage}%`;
    toonTokenDisplay.textContent = formatNumber(toonTokens);
    
    // Show savings overlay
    if (savingsBar && savings > 0) {
      const savingsPercentage = ((tokensSaved / jsonTokens) * 100);
      savingsBar.style.width = `${savingsPercentage}%`;
      savingsBar.style.left = `${toonPercentage}%`;
    }
  }

  // Update savings info
  const savingsPercentageEl = document.getElementById('savingsPercentage');
  const savingsTokensEl = document.getElementById('savingsTokens');
  if (savingsPercentageEl) {
    if (savings > 0) {
      savingsPercentageEl.textContent = `≈${Math.round(savings)}% less`;
      savingsPercentageEl.style.color = 'var(--accent-success)';
    } else if (savings < 0) {
      savingsPercentageEl.textContent = `+${Math.round(Math.abs(savings))}% more`;
      savingsPercentageEl.style.color = 'var(--accent-warning)';
    } else {
      savingsPercentageEl.textContent = '0% change';
      savingsPercentageEl.style.color = 'var(--text-muted)';
    }
  }
  if (savingsTokensEl) {
    if (tokensSaved > 0) {
      savingsTokensEl.textContent = `${formatNumber(tokensSaved)} tokens saved`;
    } else if (tokensSaved < 0) {
      savingsTokensEl.textContent = `${formatNumber(Math.abs(tokensSaved))} tokens more`;
    } else {
      savingsTokensEl.textContent = 'No change';
    }
  }

  // Update inline bars in comparison table
  updateInlineBars(jsonTokens, toonTokens);
}

// Update inline bars in comparison table
function updateInlineBars(jsonTokens, toonTokens) {
  const maxTokens = Math.max(jsonTokens, toonTokens, 1);
  const jsonPercentage = (jsonTokens / maxTokens) * 100;
  const toonPercentage = (toonTokens / maxTokens) * 100;

  const toonInlineBar = document.getElementById('toonInlineBar');
  const jsonInlineBar = document.getElementById('jsonInlineBar');

  if (toonInlineBar) {
    toonInlineBar.style.width = `${toonPercentage}%`;
  }
  if (jsonInlineBar) {
    jsonInlineBar.style.width = `${jsonPercentage}%`;
  }
}

// Format number with commas
function formatNumber(num) {
  return num.toLocaleString();
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize token counter
export function initializeTokenCounter() {
  const jsonInput = document.getElementById('jsonInput');
  const toonOutput = document.getElementById('toonOutput');
  const jsonCharCount = document.getElementById('jsonCharCount');
  const jsonTokenCount = document.getElementById('jsonTokenCount');
  const toonCharCount = document.getElementById('toonCharCount');
  const toonTokenCount = document.getElementById('toonTokenCount');

  // Update character counts immediately
  function updateCharCounts() {
    const jsonText = jsonInput?.value || '';
    const toonText = toonOutput?.value || '';

    if (jsonCharCount) jsonCharCount.textContent = formatNumber(jsonText.length);
    if (toonCharCount) toonCharCount.textContent = formatNumber(toonText.length);
  }

  // Update token counts (debounced)
  const updateTokenCounts = debounce(async () => {
    const jsonText = jsonInput?.value || '';
    const toonText = toonOutput?.value || '';

    if (jsonText.trim()) {
      const jsonTokens = await countTokens(jsonText);
      if (jsonTokenCount) jsonTokenCount.textContent = formatNumber(jsonTokens);

      if (toonText.trim()) {
        const toonTokens = await countTokens(toonText);
        if (toonTokenCount) toonTokenCount.textContent = formatNumber(toonTokens);
        updateTokenBars(jsonTokens, toonTokens);
      } else {
        if (toonTokenCount) toonTokenCount.textContent = '0';
        updateTokenBars(jsonTokens, 0);
      }
    } else {
      if (jsonTokenCount) jsonTokenCount.textContent = '0';
      if (toonTokenCount) toonTokenCount.textContent = '0';
      updateTokenBars(0, 0);
    }
  }, 500);

  // Listen to input changes
  jsonInput?.addEventListener('input', () => {
    updateCharCounts();
    updateTokenCounts();
  });

  // Listen to output changes (if user edits TOON)
  toonOutput?.addEventListener('input', () => {
    updateCharCounts();
    updateTokenCounts();
  });

  // Initial update
  updateCharCounts();
  updateTokenCounts();
}

