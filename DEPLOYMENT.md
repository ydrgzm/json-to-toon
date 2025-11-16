# Deployment Guide

## GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Push to main branch**: The workflow automatically deploys when you push to the `main` branch
2. **Manual trigger**: You can also trigger deployment manually from the Actions tab

### Manual Setup

If automatic deployment isn't working, follow these steps:

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages
   - Select "GitHub Actions" as the source

2. **Update base path** (if needed):
   - If your repository name is not `json-to-toon`, update `vite.config.js`:
   ```js
   base: '/your-repo-name/',
   ```

3. **Build and deploy**:
   ```bash
   npm install
   npm run build
   ```

### Using CDN (No Build Required)

The app can also work without a build step by using CDN links directly. The current setup uses ES modules with CDN imports, which works in modern browsers.

### Local Development

1. **Simple (no build)**:
   - Just open `index.html` in a browser
   - Note: Some features may not work due to CORS restrictions

2. **With local server**:
   ```bash
   npm install
   npm run dev
   ```
   - Opens at `http://localhost:3000`

3. **With Python**:
   ```bash
   python -m http.server 8000
   ```
   - Opens at `http://localhost:8000`

### Troubleshooting

- **Library not loading**: Check browser console for CORS errors. Use a local server or deploy to GitHub Pages
- **Build errors**: Make sure Node.js 20+ is installed
- **Deployment fails**: Check GitHub Actions logs for specific errors

