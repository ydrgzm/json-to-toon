# JSON to TOON Converter

A user-friendly web application for converting JSON to TOON (Token-Oriented Object Notation) format. TOON is a compact, human-readable format for serializing JSON data in LLM prompts, typically achieving 30-60% token reduction compared to standard JSON.

## Features

- ✨ **Real-time Conversion**: Convert JSON to TOON format instantly
- 📊 **Token Comparison**: Visual comparison showing token savings
- 🎨 **Beautiful UI**: Light yellow and dark blue theme matching TOON branding
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔧 **Customizable Options**: Choose delimiter (comma, tab, pipe), indentation, and key folding
- 📁 **File Support**: Upload JSON files or paste directly
- 📋 **Copy & Download**: Easy export of converted TOON format

## Live Demo

Visit the [GitHub Pages deployment](https://ydrgzm.github.io/json-to-toon/) to try it out!

## Getting Started

### Option 1: Use GitHub Pages (No Installation)

The app is designed to work directly from GitHub Pages using CDN links. Just clone and deploy:

```bash
git clone https://github.com/your-username/json-to-toon.git
cd json-to-toon
# Push to GitHub and enable GitHub Pages
```

### Option 2: Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/json-to-toon.git
cd json-to-toon
```

2. Install dependencies (optional, for development):
```bash
npm install
```

3. Serve locally:
   - **Simple**: Open `index.html` in a browser
   - **With Vite**: Run `npm run dev`

4. Build for production:
```bash
npm run build
```

## Project Structure

```
json-to-toon/
├── index.html              # Main HTML file
├── src/
│   ├── css/
│   │   ├── theme.css       # Color scheme and typography
│   │   ├── styles.css      # Main layout styles
│   │   ├── components.css  # Component styles
│   │   └── responsive.css  # Responsive design
│   └── js/
│       ├── main.js         # Entry point
│       ├── converter.js    # JSON ↔ TOON conversion
│       ├── token-counter.js # Token counting logic
│       └── ui.js           # UI event handlers
├── package.json
└── README.md
```

## Usage

1. **Enter JSON**: Paste or type JSON in the input area, or upload a JSON file
2. **Configure Options**: Choose delimiter, indentation, and key folding settings
3. **View Output**: See the TOON format output in real-time
4. **Compare Tokens**: Check the visual comparison showing token savings
5. **Export**: Copy to clipboard or download as `.toon` file

## Example

**Input (JSON):**
```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}
```

**Output (TOON):**
```
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

## Technologies

- **Vanilla JavaScript**: No framework dependencies
- **@toon-format/toon**: Official TOON encoding/decoding library
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **HTML5**: Semantic markup

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Credits

- [TOON Format](https://github.com/toon-format/toon) - Official TOON specification and library
- Logo design inspired by TOON branding

## Related Links

- [TOON Format Specification](https://github.com/toon-format/spec)
- [TOON Format GitHub](https://github.com/toon-format/toon)
- [TOON Format npm Package](https://www.npmjs.com/package/@toon-format/toon)

