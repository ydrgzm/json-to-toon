// UI Management and Event Handlers

import { convertToToon, convertToJson, validateJSON } from './converter.js';
import { saveToHistory } from './history.js';

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

// Get conversion options from UI
function getConversionOptions() {
  const delimiter = document.querySelector('input[name="delimiter"]:checked')?.value || ',';
  const indent = parseInt(document.getElementById('indentSize')?.value || '2', 10);
  const keyFolding = document.getElementById('keyFolding')?.checked || false;

  return {
    delimiter: delimiter === '\\t' ? '\t' : delimiter,
    indent,
    keyFolding
  };
}

// Update JSON validation status
export function updateValidationStatus(jsonText) {
  const validationEl = document.getElementById('jsonValidation');
  if (!validationEl) return;

  if (!jsonText.trim()) {
    validationEl.className = 'validation-status';
    const statusText = validationEl.querySelector('.status-text');
    if (statusText) statusText.textContent = '';
    return;
  }

  const validation = validateJSON(jsonText);
  if (validation.valid) {
    validationEl.className = 'validation-status valid';
    const statusIcon = validationEl.querySelector('.status-icon');
    const statusText = validationEl.querySelector('.status-text');
    if (statusIcon) statusIcon.textContent = '✓';
    if (statusText) statusText.textContent = 'Valid JSON';
  } else {
    validationEl.className = 'validation-status invalid';
    const statusIcon = validationEl.querySelector('.status-icon');
    const statusText = validationEl.querySelector('.status-text');
    if (statusIcon) statusIcon.textContent = '✗';
    
    // Format error message better
    let errorMsg = validation.error || 'Invalid JSON';
    // Extract line number if available
    const lineMatch = errorMsg.match(/position (\d+)/i) || errorMsg.match(/line (\d+)/i);
    if (lineMatch) {
      const position = parseInt(lineMatch[1]);
      const lines = jsonText.substring(0, position).split('\n');
      const lineNum = lines.length;
      errorMsg = `Line ${lineNum}: ${errorMsg.replace(/position \d+/i, '').replace(/line \d+/i, '').trim()}`;
    }
    // Shorten long error messages
    if (errorMsg.length > 50) {
      errorMsg = errorMsg.substring(0, 47) + '...';
    }
    
    if (statusText) statusText.textContent = errorMsg;
  }
}

// Get current conversion mode
function getCurrentMode() {
  const activeMode = document.querySelector('.mode-btn.active');
  return activeMode?.dataset.mode || 'json-to-toon';
}

// Convert and update output
async function convertAndUpdate() {
  const inputField = document.getElementById('jsonInput');
  const outputField = document.getElementById('toonOutput');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const mode = getCurrentMode();

  const inputText = inputField?.value || '';

  if (!inputText.trim()) {
    if (outputField) outputField.value = '';
    if (copyBtn) copyBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;
    return;
  }

  // Validate input based on mode
  if (mode === 'json-to-toon') {
    const validation = validateJSON(inputText);
    if (!validation.valid) {
      if (outputField) outputField.value = '';
      if (copyBtn) copyBtn.disabled = true;
      if (downloadBtn) downloadBtn.disabled = true;
      return;
    }
  }

  // Wait for TOON library to be available
  let retries = 0;
  while (!window.toonLibrary && retries < 10) {
    await new Promise(resolve => setTimeout(resolve, 100));
    retries++;
  }

  if (!window.toonLibrary) {
    if (outputField) {
      outputField.value = 'Error: TOON library is still loading. Please wait a moment and try again.';
      outputField.disabled = false;
    }
    if (copyBtn) copyBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;
    return;
  }

  // Show loading state
  if (outputField) {
    outputField.value = 'Converting...';
    outputField.disabled = true;
  }

  try {
    const options = getConversionOptions();
    let outputText = '';

    if (mode === 'json-to-toon') {
      outputText = await convertToToon(inputText, options);
    } else {
      outputText = await convertToJson(inputText, options);
    }

    if (outputField) {
      outputField.value = outputText || '';
      outputField.disabled = false;
    }

    if (copyBtn) copyBtn.disabled = !outputText;
    if (downloadBtn) downloadBtn.disabled = !outputText;

    // Save to history
    if (outputText && inputText.trim()) {
      saveToHistory(inputText, outputText, mode);
    }

    // Trigger input event to update token counts
    if (outputField) {
      outputField.dispatchEvent(new Event('input'));
    }
  } catch (error) {
    console.error('Conversion error:', error);
    if (outputField) {
      outputField.value = `Error: ${error.message}`;
      outputField.disabled = false;
    }
    if (copyBtn) copyBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;
  }
}

// Debounced conversion
const debouncedConvert = debounce(convertAndUpdate, 300);

// Expose conversion function globally for manual triggering
window.triggerConversion = convertAndUpdate;

// Update labels based on mode
function updateLabelsForMode(mode) {
  const inputLabel = document.getElementById('inputLabel');
  const outputLabel = document.getElementById('outputLabel');
  const jsonInput = document.getElementById('jsonInput');
  const toonOutput = document.getElementById('toonOutput');

  if (mode === 'json-to-toon') {
    if (inputLabel) inputLabel.textContent = 'JSON Input';
    if (outputLabel) outputLabel.textContent = 'TOON Output';
    if (jsonInput) {
      jsonInput.placeholder = 'Enter or paste JSON here...\n\nExample:\n{\n  "users": [\n    { "id": 1, "name": "Alice", "role": "admin" },\n    { "id": 2, "name": "Bob", "role": "user" }\n  ]\n}';
      jsonInput.setAttribute('aria-label', 'JSON input');
    }
    if (toonOutput) {
      toonOutput.placeholder = 'TOON output will appear here...';
      toonOutput.setAttribute('aria-label', 'TOON output');
    }
  } else {
    if (inputLabel) inputLabel.textContent = 'TOON Input';
    if (outputLabel) outputLabel.textContent = 'JSON Output';
    if (jsonInput) {
      jsonInput.placeholder = 'Enter or paste TOON format here...\n\nExample:\nusers[2]{id,name,role}:\n  1,Alice,admin\n  2,Bob,user';
      jsonInput.setAttribute('aria-label', 'TOON input');
    }
    if (toonOutput) {
      toonOutput.placeholder = 'JSON output will appear here...';
      toonOutput.setAttribute('aria-label', 'JSON output');
    }
  }
}

// Load from history
window.loadFromHistory = function(historyItem) {
  const inputField = document.getElementById('jsonInput');
  const outputField = document.getElementById('toonOutput');
  
  if (!inputField || !outputField) return;

  // Switch mode if needed
  const currentMode = getCurrentMode();
  if (currentMode !== historyItem.mode) {
    const targetModeBtn = document.querySelector(`[data-mode="${historyItem.mode}"]`);
    if (targetModeBtn) {
      targetModeBtn.click();
    }
  }

  // Load the data after a short delay to ensure mode switch is complete
  setTimeout(() => {
    inputField.value = historyItem.input;
    outputField.value = historyItem.output;
    inputField.dispatchEvent(new Event('input'));
  }, 100);
};

// Initialize UI
export function initializeUI() {
  const jsonInput = document.getElementById('jsonInput');
  const toonOutput = document.getElementById('toonOutput');
  const toggleOptions = document.getElementById('toggleOptions');
  const optionsContent = document.getElementById('optionsContent');
  const delimiterInputs = document.querySelectorAll('input[name="delimiter"]');
  const indentInput = document.getElementById('indentSize');
  const keyFoldingInput = document.getElementById('keyFolding');
  const modeButtons = document.querySelectorAll('.mode-btn');

  // Mode switching
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Swap input/output if needed
      const mode = btn.dataset.mode;
      const currentInput = jsonInput?.value || '';
      const currentOutput = toonOutput?.value || '';

      // Swap values when switching modes
      if (currentInput.trim() || currentOutput.trim()) {
        jsonInput.value = currentOutput;
        toonOutput.value = '';
      }

      // Update labels
      updateLabelsForMode(mode);

      // Show/hide options panel based on mode
      if (optionsContent) {
        if (mode === 'toon-to-json') {
          optionsContent.style.display = 'none';
          if (toggleOptions) toggleOptions.style.display = 'none';
        } else {
          optionsContent.style.display = 'grid';
          if (toggleOptions) toggleOptions.style.display = 'block';
        }
      }

      // Trigger conversion if there's input
      if (jsonInput?.value.trim()) {
        setTimeout(() => {
          if (window.triggerConversion) {
            window.triggerConversion();
          }
        }, 100);
      }
    });
  });

  // Toggle options panel
  if (toggleOptions && optionsContent) {
    toggleOptions.addEventListener('click', () => {
      const isCollapsed = optionsContent.style.display === 'none';
      optionsContent.style.display = isCollapsed ? 'grid' : 'none';
      toggleOptions.classList.toggle('collapsed');
    });
  }

  // Listen to input changes
  if (jsonInput) {
    jsonInput.addEventListener('input', () => {
      const inputText = jsonInput.value;
      const mode = getCurrentMode();
      
      // Only validate JSON in JSON to TOON mode
      if (mode === 'json-to-toon') {
        updateValidationStatus(inputText);
      } else {
        // Clear validation status in TOON to JSON mode
        const validationEl = document.getElementById('jsonValidation');
        if (validationEl) {
          validationEl.className = 'validation-status';
          const statusText = validationEl.querySelector('.status-text');
          if (statusText) statusText.textContent = '';
        }
      }
      
      debouncedConvert();
    });
  }

  // Listen to option changes
  delimiterInputs.forEach(input => {
    input.addEventListener('change', debouncedConvert);
  });

  if (indentInput) {
    indentInput.addEventListener('input', debouncedConvert);
  }

  if (keyFoldingInput) {
    keyFoldingInput.addEventListener('change', debouncedConvert);
  }

  // Expose updateValidationStatus globally
  window.updateValidationStatus = updateValidationStatus;

  // Initial validation
  if (jsonInput) {
    updateValidationStatus(jsonInput.value);
  }

  // Initial conversion
  convertAndUpdate();
}

// Show toast notification (fallback if not available from converter)
function showToast(message, type = 'success') {
  if (window.showToast) {
    window.showToast(message, type);
    return;
  }
  
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

