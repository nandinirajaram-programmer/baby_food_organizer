# GitHub Actions Setup

This project includes automated CI/CD pipelines using GitHub Actions.

## Quick Setup

```bash
# Run once to create GitHub Actions workflows
node setup-github-actions.js

# Commit and push to GitHub
git add .github/
git commit -m "feat: add GitHub Actions CI/CD pipeline"
git push origin main
```

## Workflow Configuration

### File Structure
```
.github/
├── workflows/
│   └── ci-cd.yml              # Main CI/CD workflow
├── CODEOWNERS                  # Code ownership rules
└── pull_request_template.md    # PR template
```

## CI/CD Pipeline Overview

### Build Job
Runs on every **push** and **pull request** to `main` or `develop` branches.

**Steps:**
1. 📥 Checkout code
2. 📦 Setup Node.js 18.x
3. 🧹 Run project cleanup
4. 📚 Install dependencies
5. 🔍 Lint code (if available)
6. 🏗️ Build React app
7. ✅ Run tests
8. 📊 Verify build output

### Deploy Job
Runs **only** on successful build when pushing to `main` branch.

**Steps:**
1. 📥 Checkout code
2. 📦 Setup Node.js
3. 🧹 Clean project structure
4. 📚 Install dependencies
5. 🏗️ Build application
6. 🚀 Deploy to GitHub Pages

## Enabling GitHub Pages Deployment

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - This enables automatic deployment from CI/CD

## Viewing Workflow Status

1. Go to your repository
2. Click **Actions** tab
3. View workflow runs and their status
4. Click on any run to see detailed logs

## Workflow Triggers

- **Push to main/develop**: Builds and tests
- **Pull Request to main/develop**: Builds and tests
- **Successful build on main**: Also deploys to GitHub Pages

## Environment Variables (Optional)

Add secrets in repository **Settings** → **Secrets and variables** → **Actions**

Example for custom deployments:
- `GITHUB_TOKEN` (automatically provided)
- Custom domain in `cname` field (if using custom domain)

## Customization

### Change Node.js Version
Edit `.github/workflows/ci-cd.yml`, line with `node-version`:
```yaml
node-version: '20.x'  # Change to desired version
```

### Add Linting
If you add ESLint, the workflow will automatically detect and run it:
```bash
npm install --save-dev eslint
npm run lint  # Add this script to package.json
```

### Add Custom Domain
Edit `.github/workflows/ci-cd.yml`, add in deploy step:
```yaml
cname: yourdomain.com
```

### Disable Auto-Deploy
Remove or comment out the `deploy` job section in `ci-cd.yml`

## Status Badge

Add to your README.md:
```markdown
[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/baby_food_organizer/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/YOUR_USERNAME/baby_food_organizer/actions)
```

## Troubleshooting

### Build Fails
1. Check **Actions** tab for error logs
2. Common issues:
   - Missing `clean.js` - ensure it exists in root
   - Node version incompatibility - check Node.js version
   - Missing dependencies - run `npm install` locally

### GitHub Pages Not Updating
1. Verify **Settings** → **Pages** is set to "GitHub Actions"
2. Check deploy job ran successfully in **Actions** tab
3. Clear browser cache (Ctrl+Shift+Del)
4. Wait a few minutes for GitHub to publish

### Tests Timeout
Edit workflow timeout:
```yaml
timeout-minutes: 30  # Add to job config
```

## Advanced Features

### Matrix Testing
Test against multiple Node versions:
```yaml
matrix:
  node-version: [16.x, 18.x, 20.x]
```

### Conditional Steps
```yaml
if: github.event_name == 'push'  # Only on push
if: github.event.pull_request.draft == false  # Skip draft PRs
```

### Artifacts
Save build outputs:
```yaml
- name: Upload artifact
  uses: actions/upload-artifact@v3
  with:
    name: build
    path: build/
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js Setup Action](https://github.com/actions/setup-node)
- [GitHub Pages Deploy Action](https://github.com/peaceiris/actions-gh-pages)
