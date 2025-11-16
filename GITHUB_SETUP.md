# GitHub Repository & Pages Setup Guide

## Step 1: Create GitHub Repository

1. **Go to GitHub**: Visit [github.com](https://github.com) and sign in
2. **Create New Repository**:
   - Click the "+" icon in the top right
   - Select "New repository"
   - Repository name: `json-to-toon`
   - Description: "A user-friendly web application for converting JSON to TOON format - Save 30-60% tokens for LLM prompts"
   - Visibility: **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, run these commands in your terminal:

```bash
# Add the remote repository (replace with your actual username if different)
git remote add origin https://github.com/ydrgzm/json-to-toon.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. **Go to Repository Settings**:
   - In your GitHub repository, click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar

2. **Configure Pages**:
   - **Source**: Select "GitHub Actions" (not "Deploy from a branch")
   - The workflow will automatically deploy when you push to main

3. **Verify Deployment**:
   - Go to the "Actions" tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow running
   - Wait for it to complete (usually 1-2 minutes)
   - Once complete, your site will be available at:
     `https://ydrgzm.github.io/json-to-toon/`

## Step 4: Update Base Path (If Repository Name Differs)

If your repository name is different from `json-to-toon`, update `vite.config.js`:

```javascript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

## Troubleshooting

### Workflow Not Running
- Check that the workflow file exists at `.github/workflows/deploy.yml`
- Verify you've pushed the code to the `main` branch
- Check the "Actions" tab for any errors

### Build Fails
- Check Node.js version (should be 20+)
- Verify all dependencies are in `package.json`
- Check the Actions logs for specific errors

### Pages Not Loading
- Wait a few minutes after deployment completes
- Check the Pages settings show "GitHub Actions" as source
- Verify the base path in `vite.config.js` matches your repo name

### 404 Errors
- Ensure the base path in `vite.config.js` is correct
- Check that files are in the `dist/` folder after build
- Verify the workflow completed successfully

## Manual Deployment (Alternative)

If GitHub Actions doesn't work, you can deploy manually:

```bash
# Build the project
npm run build

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

Then in GitHub Settings > Pages, select "Deploy from a branch" and choose `gh-pages` branch.

## Next Steps

1. ✅ Repository created and code pushed
2. ✅ GitHub Pages enabled
3. ✅ Site accessible at `https://ydrgzm.github.io/json-to-toon/`
4. 🎉 Share your converter with the world!

## Repository URL Format

Your repository URL will be:
- **Repository**: `https://github.com/ydrgzm/json-to-toon`
- **Live Site**: `https://ydrgzm.github.io/json-to-toon/`

