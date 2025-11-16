# Quick Start Guide

## 🚀 Getting Started

### Option 1: Use Directly (No Build)

1. **Open in Browser**:
   - Simply open `index.html` in a modern browser
   - Note: Some features require a local server due to CORS

2. **Use Local Server**:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

### Option 2: Development Mode

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:3000`

3. **Build for Production**:
   ```bash
   npm run build
   ```
   - Output in `dist/` folder

## 📝 Usage

1. **Enter JSON**: Type or paste JSON in the input area
2. **Load Example**: Click "Load Example" for sample data
3. **Upload File**: Click "Upload File" to load a JSON file
4. **Configure**: Adjust delimiter, indentation, and key folding options
5. **View Output**: See TOON format output in real-time
6. **Export**: Copy or download the TOON output

## 🎨 Features

- ✅ Real-time JSON to TOON conversion
- ✅ Visual token comparison
- ✅ Multiple delimiter options (comma, tab, pipe)
- ✅ Customizable indentation
- ✅ Key folding support
- ✅ File upload/download
- ✅ Copy to clipboard
- ✅ Responsive design

## 🐛 Troubleshooting

### Library Not Loading
- **Issue**: "TOON library not loaded" error
- **Solution**: 
  - Check internet connection (library loads from CDN)
  - Use a local server instead of opening file directly
  - Check browser console for CORS errors

### Conversion Not Working
- **Issue**: No output appears
- **Solution**:
  - Check JSON is valid (look for validation indicator)
  - Check browser console for errors
  - Try the example data first

### Token Count Not Updating
- **Issue**: Token counts show 0 or don't update
- **Solution**:
  - Wait a moment (token counting is debounced)
  - Check browser console for errors
  - Token counting uses approximation if library not available

## 📦 Project Structure

```
json-to-toon/
├── index.html          # Main HTML file
├── src/
│   ├── css/           # Stylesheets
│   └── js/            # JavaScript modules
├── examples/           # Example JSON files
└── package.json        # Dependencies
```

## 🔗 Next Steps

1. **Test the Converter**:
   - Try different JSON structures
   - Test with the example files
   - Experiment with different options

2. **Deploy to GitHub Pages**:
   - Push to GitHub
   - Enable GitHub Pages in repository settings
   - See DEPLOYMENT.md for details

3. **Customize**:
   - Modify colors in `src/css/theme.css`
   - Add features in `src/js/`
   - Update styling in `src/css/`

## 💡 Tips

- **Best for TOON**: Uniform arrays of objects (tabular data)
- **Token Savings**: Typically 30-60% reduction vs JSON
- **Delimiters**: Tab often provides best token efficiency
- **Key Folding**: Useful for deeply nested structures

## 📚 Resources

- [TOON Format Specification](https://github.com/toon-format/spec)
- [TOON Format GitHub](https://github.com/toon-format/toon)
- [Project Plan](./PROJECT_PLAN.md)
- [Deployment Guide](./DEPLOYMENT.md)

