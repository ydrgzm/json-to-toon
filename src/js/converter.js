// JSON to TOON Converter Logic

// Get TOON library (loaded globally from index.html)
function getToonLibrary() {
  if (window.toonLibrary) {
    return window.toonLibrary;
  }
  
  // Fallback: try to load it
  throw new Error('TOON library not loaded. Please refresh the page.');
}

// Convert JSON to TOON
export async function convertToToon(jsonInput, options = {}) {
  try {
    const toonLib = getToonLibrary();
    const data = JSON.parse(jsonInput);
    const toonOptions = {
      indent: options.indent || 2,
      delimiter: options.delimiter || ',',
      keyFolding: options.keyFolding ? 'safe' : 'off',
    };

    const toonOutput = toonLib.encode(data, toonOptions);
    return toonOutput;
  } catch (error) {
    console.error('Conversion error:', error);
    if (error.message.includes('TOON library')) {
      showToast('TOON library not loaded. Please refresh the page.', 'error');
    }
    throw error;
  }
}

// Convert TOON to JSON
export async function convertToJson(toonInput, options = {}) {
  try {
    const toonLib = getToonLibrary();
    const decodeOptions = {
      indent: options.indent || 2,
      strict: options.strict !== false,
      expandPaths: options.expandPaths || 'off',
    };

    const jsonData = toonLib.decode(toonInput, decodeOptions);
    return JSON.stringify(jsonData, null, 2);
  } catch (error) {
    console.error('Decode error:', error);
    throw error;
  }
}

// Validate JSON
export function validateJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Format JSON
export function formatJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return jsonString;
  }
}

// Initialize converter
export function initializeConverter() {
  const jsonInput = document.getElementById('jsonInput');
  const toonOutput = document.getElementById('toonOutput');
  const loadExampleBtn = document.getElementById('loadExampleBtn');
  const fileInput = document.getElementById('fileInput');
  const formatJsonBtn = document.getElementById('formatJsonBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // Example JSON data
  const jsonExamples = {
    simple: {
      users: [
        { id: 1, name: 'Alice', role: 'admin' },
        { id: 2, name: 'Bob', role: 'user' }
      ]
    },
    tabular: {
      items: [
        { sku: 'A1', qty: 2, price: 9.99 },
        { sku: 'B2', qty: 1, price: 14.5 },
        { sku: 'C3', qty: 5, price: 7.25 }
      ]
    },
    nested: {
      order: {
        id: 'ORD-001',
        customer: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        items: [
          { product: 'Widget', quantity: 2, price: 19.99 }
        ]
      }
    }
  };

  // Example TOON data
  const toonExamples = {
    simple: `users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`,
    tabular: `items[3]{sku,qty,price}:
  A1,2,9.99
  B2,1,14.5
  C3,5,7.25`,
    nested: `order:
  id: ORD-001
  customer:
    name: John Doe
    email: john@example.com
  items[1]{product,quantity,price}:
    Widget,2,19.99`
  };

  // Load example dropdown
  const exampleMenu = document.getElementById('exampleMenu');
  const exampleItems = document.querySelectorAll('.dropdown-item');
  
  if (loadExampleBtn) {
    loadExampleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (exampleMenu) {
        exampleMenu.style.display = exampleMenu.style.display === 'none' ? 'block' : 'none';
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (exampleMenu && !exampleMenu.contains(e.target) && !loadExampleBtn?.contains(e.target)) {
      exampleMenu.style.display = 'none';
    }
  });

  // Load example based on selection
  exampleItems.forEach(item => {
    item.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!jsonInput) return;
      
      const exampleType = item.dataset.example;
      
      // Get current mode
      const activeMode = document.querySelector('.mode-btn.active');
      const mode = activeMode?.dataset.mode || 'json-to-toon';
      
      let exampleText = '';
      
      if (mode === 'json-to-toon') {
        // Load JSON example
        const example = jsonExamples[exampleType];
        if (!example) return;
        exampleText = JSON.stringify(example, null, 2);
      } else {
        // Load TOON example
        exampleText = toonExamples[exampleType];
        if (!exampleText) return;
      }
      
      jsonInput.value = exampleText;
      
      // Clear file info
      const fileInfo = document.getElementById('fileInfo');
      if (fileInfo) fileInfo.style.display = 'none';
      
      // Update validation status immediately (only for JSON mode)
      if (mode === 'json-to-toon' && window.updateValidationStatus) {
        window.updateValidationStatus(exampleText);
      } else {
        // Clear validation status for TOON mode
        const validationEl = document.getElementById('jsonValidation');
        if (validationEl) {
          validationEl.className = 'validation-status';
          const statusText = validationEl.querySelector('.status-text');
          if (statusText) statusText.textContent = '';
        }
      }
      
      // Close dropdown
      if (exampleMenu) exampleMenu.style.display = 'none';
      
      // Wait a bit for UI to be ready, then trigger conversion
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Trigger input event to trigger conversion
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      jsonInput.dispatchEvent(inputEvent);
      
      // Also manually trigger conversion to ensure it happens
      if (window.triggerConversion) {
        window.triggerConversion();
      }
    });
  });

  // File upload
  const dropZone = document.getElementById('dropZone');
  const dropOverlay = document.getElementById('dropOverlay');
  const fileInfo = document.getElementById('fileInfo');
  const fileName = document.getElementById('fileName');
  const fileSize = document.getElementById('fileSize');
  const clearFileBtn = document.getElementById('clearFileBtn');

  function handleFile(file) {
    if (!file) return;
    
    // Check file type
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      showToast('Please select a valid JSON file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      jsonInput.value = event.target.result;
      
      // Show file info
      if (fileInfo && fileName && fileSize) {
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        fileInfo.style.display = 'flex';
      }
      
      jsonInput.dispatchEvent(new Event('input'));
      showToast('File loaded successfully!', 'success');
    };
    reader.onerror = () => {
      showToast('Failed to read file.', 'error');
    };
    reader.readAsText(file);
  }

  // File input change
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
  });

  // Drag and drop
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('drag-over');
      
      const file = e.dataTransfer.files[0];
      handleFile(file);
    });
  }

  // Clear file info
  if (clearFileBtn) {
    clearFileBtn.addEventListener('click', () => {
      if (fileInput) fileInput.value = '';
      if (fileInfo) fileInfo.style.display = 'none';
      if (jsonInput) jsonInput.value = '';
      jsonInput?.dispatchEvent(new Event('input'));
    });
  }

  // Format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  // Format JSON
  formatJsonBtn?.addEventListener('click', () => {
    const formatted = formatJSON(jsonInput.value);
    jsonInput.value = formatted;
    jsonInput.dispatchEvent(new Event('input'));
  });

  // Copy to clipboard
  copyBtn?.addEventListener('click', async () => {
    const text = toonOutput.value;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
      } catch (error) {
        showToast('Failed to copy to clipboard.', 'error');
      }
    }
  });

  // Download
  downloadBtn?.addEventListener('click', () => {
    const text = toonOutput.value;
    if (text) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.toon';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Download started!', 'success');
    }
  });
}

// Show toast notification
export function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Make showToast globally available
window.showToast = showToast;

