# Harber Auth Sync Host

This is the authentication sync host for the Harber Chrome Extension. It enables:
- ✅ Attack protection (CAPTCHA)
- ✅ OAuth (Google, GitHub, etc.)
- ✅ All Clerk authentication features

## Deployment to GitHub Pages

### Step 1: Create a new GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `harber-auth` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. Create the repository

### Step 2: Set up the project locally

```bash
cd sync-host
npm install
```

### Step 3: Create your .env file

```bash
echo "VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE" > .env
```

Use the same Clerk publishable key as your extension.

### Step 4: Build the project

```bash
npm run build
```

### Step 5: Deploy to GitHub Pages

**Option A: Using GitHub Actions (Recommended)**

1. Push the entire `sync-host` folder to your new repo
2. Go to repo Settings → Pages
3. Set Source to "GitHub Actions"
4. Create `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_CLERK_PUBLISHABLE_KEY: ${{ secrets.VITE_CLERK_PUBLISHABLE_KEY }}
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

5. Add your Clerk key as a repository secret:
   - Go to Settings → Secrets and variables → Actions
   - Add `VITE_CLERK_PUBLISHABLE_KEY` with your publishable key

**Option B: Manual deployment**

1. Build locally: `npm run build`
2. Push the `dist` folder contents to a `gh-pages` branch

### Step 6: Get your GitHub Pages URL

Your URL will be: `https://YOUR_USERNAME.github.io/harber-auth/`

### Step 7: Configure Clerk

In the Clerk Dashboard, add your GitHub Pages URL to allowed origins:
1. Go to Configure → Paths
2. Add `https://YOUR_USERNAME.github.io` to allowed redirect URIs

### Step 8: Update your extension

In the extension's `.env` file, add:

```
VITE_CLERK_SYNC_HOST=https://YOUR_USERNAME.github.io/harber-auth
```

Then rebuild the extension: `npm run build`

## Local Development

```bash
npm run dev
```

Opens at http://localhost:3000
