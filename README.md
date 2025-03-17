# HyperPerfect Website

This is the official website for HyperPerfect, built with Next.JS and deployed on GitHub Pages.

## Development

To run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build the site for production:

```bash
npm run build
```

This will create a static export in the `out` directory. In Next.js 14, the export functionality is now integrated into the build command when `output: 'export'` is set in next.config.js.

## Deploying to GitHub Pages

### Manual Deployment

1. Run the deploy script:
   ```bash
   npm run deploy
   ```

2. Follow the instructions provided by the script to push the contents to GitHub.

3. Alternatively, you can build the site manually:
   ```bash
   npm run build
   ```

4. The static site will be generated in the `out` directory.

5. Deploy the contents of the `out` directory to the branch that GitHub Pages serves (commonly `gh-pages` or the `main` branch if configured that way).

### Using GitHub Actions (Recommended)

You can set up GitHub Actions to automatically build and deploy your site whenever you push to the main branch. Create a file at `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
          branch: gh-pages
```

## Custom Domain

This site is configured to use the custom domain `www.hyperperfect.ai`. The CNAME file in the repository root contains this domain name.

When deploying, ensure that:

1. The CNAME file is included in the deployed static site (in the root directory).
2. Your DNS settings point to GitHub Pages.
3. The custom domain is configured in the GitHub repository settings. 
