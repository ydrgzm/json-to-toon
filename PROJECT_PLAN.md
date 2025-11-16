# JSON to TOON Converter - Project Plan

## Overview
A user-friendly web application for converting JSON to TOON format, featuring the light yellow and dark blue theme from the promotional image. The app will be deployed on GitHub Pages and provide an excellent user experience with real-time conversion, token comparison, and visual feedback.

---

## Phase 1: Project Setup & Foundation

### 1.1 Initialize Project Structure
- [ ] Create project directory structure
  ```
  json-to-toon/
  ├── index.html
  ├── src/
  │   ├── js/
  │   │   ├── main.js
  │   │   ├── converter.js
  │   │   ├── token-counter.js
  │   │   └── ui.js
  │   ├── css/
  │   │   ├── styles.css
  │   │   └── theme.css
  │   └── assets/
  │       └── (images, icons)
  ├── package.json
  ├── README.md
  └── .github/
      └── workflows/
          └── deploy.yml
  ```

### 1.2 Setup Dependencies
- [ ] Initialize npm project (`npm init -y`)
- [ ] Install core dependencies:
  - `@toon-format/toon` - Official TOON encoder/decoder
  - `gpt-tokenizer` or `@niieani/gpt-tokenizer` - Token counting
- [ ] Setup build tools (optional, for minification):
  - `vite` or `webpack` for bundling
  - Or use CDN for simplicity (GitHub Pages friendly)

### 1.3 GitHub Pages Configuration
- [ ] Create `.github/workflows/deploy.yml` for GitHub Actions
- [ ] Configure `gh-pages` branch or `docs/` folder
- [ ] Setup repository settings for Pages

---

## Phase 2: Design & Theme Implementation

### 2.1 Color Scheme (Based on Image)
- [ ] **Light Yellow Background**: `#FFF9E6` or `#FEF9E7` (warm, light yellow)
- [ ] **Dark Blue Primary**: `#1E3A5F` or `#1A2F4F` (dark blue for text/elements)
- [ ] **Dark Blue Section**: `#1E3A5F` (for comparison table background)
- [ ] **Light Yellow Text on Dark**: `#FFF9E6` (for text on dark blue sections)
- [ ] **Accent Colors**: 
  - Success/Positive: Green for token savings
  - Error: Red for validation errors
  - Info: Lighter blue for hints

### 2.2 Typography
- [ ] Choose modern, readable font (e.g., Inter, System UI, or similar)
- [ ] Define font sizes:
  - Headings: Bold, dark blue
  - Body: Regular, dark blue on light yellow
  - Code: Monospace, slightly darker
  - Labels: Medium weight

### 2.3 Visual Elements
- [ ] **TOON Logo**: Create or use stylized "TO" and "ON" squares (dark blue)
- [ ] **Workflow Diagram**: Visual flow showing JSON → encode() → TOON → LLM
- [ ] **Token Comparison Bars**: Visual bars showing token reduction
- [ ] **Comparison Table**: Dark blue section with light yellow text

---

## Phase 3: Core UI Components

### 3.1 Header Section
- [ ] TOON logo (stylized squares)
- [ ] Title: "Token-Oriented Object Notation"
- [ ] Subtitle: "Compact, human-readable format for serializing JSON data in LLM prompts"

### 3.2 Main Conversion Area
- [ ] **Input Section** (Left side):
  - Textarea for JSON input
  - File upload button
  - "Load Example" button with sample JSON
  - JSON validation indicator (✓/✗)
  - Character/token count for JSON

- [ ] **Output Section** (Right side):
  - Textarea for TOON output (read-only or editable)
  - Copy to clipboard button
  - Download as `.toon` file button
  - Character/token count for TOON

### 3.3 Options Panel
- [ ] **Delimiter Selection**:
  - Radio buttons: Comma (`,`), Tab (`\t`), Pipe (`|`)
  - Default: Comma
  - Visual preview of delimiter in output

- [ ] **Advanced Options** (Collapsible):
  - Indentation size (default: 2)
  - Key folding toggle (off/safe)
  - Flatten depth (if key folding enabled)

### 3.4 Token Comparison Section
- [ ] **Visual Bar Chart**:
  - JSON token count (full bar)
  - TOON token count (shorter bar, showing reduction)
  - Percentage savings display (e.g., "≈30-60% less")
  - Animated transition when values change

- [ ] **Token Statistics**:
  - JSON tokens: X,XXX
  - TOON tokens: X,XXX
  - Savings: -XX% (X,XXX tokens saved)

### 3.5 Comparison Table (Bottom Section)
- [ ] Dark blue background section
- [ ] Light yellow text
- [ ] Table comparing:
  - **avg tokens**: Visual bars for TOON vs JSON
  - **retrieval accuracy**: Percentage values
  - **best for**: Use case descriptions
- [ ] Responsive design for mobile

---

## Phase 4: Core Functionality

### 4.1 JSON Input Handling
- [ ] **Real-time JSON Validation**:
  - Parse JSON on input change (debounced)
  - Show validation errors with helpful messages
  - Highlight syntax errors in editor
  - Auto-format JSON option

- [ ] **File Upload**:
  - Drag & drop support
  - File picker button
  - Support `.json` files
  - Show file name and size

- [ ] **Example Data**:
  - Pre-loaded examples:
    - Simple object
    - Array of objects (tabular)
    - Nested structures
    - Mixed arrays

### 4.2 TOON Conversion
- [ ] **Encode Function**:
  - Use `@toon-format/toon` `encode()` function
  - Apply user-selected options (delimiter, indent, keyFolding)
  - Handle errors gracefully
  - Show conversion status

- [ ] **Real-time Conversion**:
  - Convert on JSON input change (debounced)
  - Show loading state during conversion
  - Update output immediately

- [ ] **Output Formatting**:
  - Syntax highlighting for TOON (optional)
  - Line numbers (optional)
  - Monospace font
  - Proper indentation display

### 4.3 Token Counting
- [ ] **Token Counter**:
  - Use `gpt-tokenizer` with `o200k_base` encoding
  - Count tokens for JSON input
  - Count tokens for TOON output
  - Calculate percentage savings
  - Update visual bars

- [ ] **Performance**:
  - Debounce token counting (expensive operation)
  - Show "Calculating..." state
  - Cache results for same input

### 4.4 Output Actions
- [ ] **Copy to Clipboard**:
  - One-click copy button
  - Show "Copied!" feedback
  - Copy formatted TOON

- [ ] **Download**:
  - Download as `.toon` file
  - Default filename: `output.toon` or based on input filename

- [ ] **Share** (Optional):
  - Generate shareable link (encode data in URL or use service)
  - QR code for mobile sharing

---

## Phase 5: Advanced Features

### 5.1 Bidirectional Conversion
- [ ] **TOON to JSON**:
  - Toggle switch: "JSON → TOON" / "TOON → JSON"
  - Use `decode()` function from library
  - Validate TOON syntax
  - Show decoded JSON in formatted view

### 5.2 Workflow Visualization
- [ ] **Animated Workflow Diagram**:
  - JSON box → encode() box → TOON box → LLM box
  - Show current step in workflow
  - Smooth transitions

### 5.3 Error Handling & Validation
- [ ] **JSON Errors**:
  - Clear error messages
  - Line number indicators
  - Suggestions for fixes
  - Syntax highlighting for errors

- [ ] **TOON Errors** (if decoding):
  - Validate TOON syntax
  - Check array length matches
  - Validate delimiter consistency

### 5.4 History & Examples
- [ ] **Conversion History**:
  - Store recent conversions (localStorage)
  - Quick access to previous conversions
  - Clear history option

- [ ] **Example Gallery**:
  - Multiple example datasets
  - Categorized by use case:
    - Uniform arrays (best for TOON)
    - Nested structures
    - Mixed data
  - One-click load examples

---

## Phase 6: UX Enhancements

### 6.1 Responsive Design
- [ ] **Mobile Layout**:
  - Stack input/output vertically on mobile
  - Touch-friendly buttons
  - Optimized font sizes
  - Collapsible sections

- [ ] **Tablet Layout**:
  - Side-by-side layout when space allows
  - Optimized spacing

- [ ] **Desktop Layout**:
  - Full-width layout
  - Maximum content width for readability

### 6.2 Accessibility
- [ ] **Keyboard Navigation**:
  - Tab through all interactive elements
  - Enter to convert
  - Escape to close modals

- [ ] **Screen Reader Support**:
  - ARIA labels
  - Semantic HTML
  - Alt text for images

- [ ] **Color Contrast**:
  - WCAG AA compliance
  - High contrast mode option

### 6.3 Performance
- [ ] **Optimization**:
  - Lazy load heavy libraries
  - Debounce input handlers
  - Virtual scrolling for large outputs
  - Minimize re-renders

- [ ] **Loading States**:
  - Skeleton screens
  - Progress indicators
  - Smooth transitions

### 6.4 User Feedback
- [ ] **Toast Notifications**:
  - Success: "Converted successfully!"
  - Error: Clear error messages
  - Info: Helpful tips

- [ ] **Visual Feedback**:
  - Button hover states
  - Active states
  - Focus indicators
  - Smooth animations

---

## Phase 7: Documentation & Polish

### 7.1 Help & Documentation
- [ ] **Tooltips**:
  - Explain TOON format
  - Explain options
  - Show examples

- [ ] **Help Section**:
  - "What is TOON?" expandable section
  - Format examples
  - Use cases
  - Link to full specification

### 7.2 About Section
- [ ] **Information**:
  - Brief TOON description
  - Link to official spec
  - Link to GitHub repository
  - Credits (logo designer, etc.)

### 7.3 Footer
- [ ] **Links**:
  - GitHub link
  - Official TOON format link
  - License information
  - Version number

---

## Phase 8: Testing & Deployment

### 8.1 Testing
- [ ] **Functionality Tests**:
  - Test JSON to TOON conversion
  - Test TOON to JSON conversion
  - Test all delimiter options
  - Test error handling
  - Test token counting accuracy

- [ ] **Browser Testing**:
  - Chrome/Edge
  - Firefox
  - Safari
  - Mobile browsers

- [ ] **Edge Cases**:
  - Empty JSON
  - Invalid JSON
  - Very large JSON files
  - Special characters
  - Unicode/emoji

### 8.2 GitHub Pages Deployment
- [ ] **Setup GitHub Actions**:
  - Auto-deploy on push to main
  - Build process (if using bundler)
  - Deploy to `gh-pages` branch or `docs/` folder

- [ ] **Configuration**:
  - Set GitHub Pages source
  - Configure custom domain (if needed)
  - Add CNAME file (if using custom domain)

### 8.3 Final Polish
- [ ] **Performance Audit**:
  - Lighthouse score > 90
  - Fast load times
  - Optimized assets

- [ ] **SEO**:
  - Meta tags
  - Open Graph tags
  - Description
  - Keywords

- [ ] **Analytics** (Optional):
  - Google Analytics or similar
  - Track conversion usage
  - Monitor errors

---

## Technical Stack Recommendations

### Core Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling, CSS Grid/Flexbox
- **Vanilla JavaScript**: No framework needed for simplicity
- **OR**: Lightweight framework (Vue.js, Svelte) if preferred

### Libraries
- **@toon-format/toon**: Official TOON library (via CDN or npm)
- **gpt-tokenizer**: Token counting (via CDN or npm)
- **Monaco Editor** (optional): For syntax highlighting
- **OR**: Simple textarea with Prism.js for syntax highlighting

### Build Tools (Optional)
- **Vite**: Fast build tool
- **OR**: Use CDN links for simplicity (no build step needed)

---

## File Structure (Detailed)

```
json-to-toon/
├── index.html                 # Main HTML file
├── src/
│   ├── js/
│   │   ├── main.js            # Entry point, event listeners
│   │   ├── converter.js       # JSON ↔ TOON conversion logic
│   │   ├── token-counter.js   # Token counting logic
│   │   ├── ui.js              # UI updates, animations
│   │   └── utils.js           # Utility functions
│   ├── css/
│   │   ├── styles.css         # Main styles
│   │   ├── theme.css          # Color scheme, typography
│   │   ├── components.css     # Component-specific styles
│   │   └── responsive.css     # Media queries
│   └── assets/
│       ├── logo.svg           # TOON logo
│       └── icons/             # Icon set
├── examples/
│   ├── simple.json            # Example JSON files
│   ├── tabular.json
│   └── nested.json
├── docs/                      # GitHub Pages output (if using docs folder)
├── package.json
├── README.md
├── LICENSE
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions workflow
```

---

## Color Palette (Exact from Image Theme)

```css
:root {
  /* Light Yellow Background */
  --bg-primary: #FFF9E6;
  --bg-secondary: #FEF9E7;
  
  /* Dark Blue Primary */
  --text-primary: #1E3A5F;
  --text-secondary: #1A2F4F;
  
  /* Dark Blue Section */
  --section-dark: #1E3A5F;
  --text-on-dark: #FFF9E6;
  
  /* Accents */
  --accent-success: #4CAF50;
  --accent-error: #F44336;
  --accent-info: #2196F3;
  
  /* Borders & Dividers */
  --border-light: rgba(30, 58, 95, 0.1);
  --border-medium: rgba(30, 58, 95, 0.3);
}
```

---

## Key UX Principles

1. **Immediate Feedback**: Show conversion results instantly
2. **Clear Visual Hierarchy**: Important information stands out
3. **Error Prevention**: Validate input before conversion
4. **Accessibility First**: Works for all users
5. **Mobile Friendly**: Responsive and touch-optimized
6. **Performance**: Fast, smooth interactions
7. **Educational**: Help users understand TOON format

---

## Success Metrics

- ✅ Converts JSON to TOON accurately
- ✅ Shows token savings clearly
- ✅ Works on all modern browsers
- ✅ Fast load time (< 2 seconds)
- ✅ Accessible (WCAG AA compliant)
- ✅ Mobile responsive
- ✅ Zero build errors
- ✅ Successful GitHub Pages deployment

---

## Next Steps After Plan Approval

1. Review and refine plan with user
2. Set up project structure
3. Begin Phase 1 implementation
4. Iterate based on feedback
5. Deploy to GitHub Pages

---

**Estimated Timeline**: 2-3 weeks for full implementation (depending on complexity and polish level)

**Priority Order**:
1. Phase 1-2: Setup & Design (Foundation)
2. Phase 3-4: Core UI & Functionality (MVP)
3. Phase 5-6: Advanced Features & UX (Polish)
4. Phase 7-8: Documentation & Deployment (Launch)

