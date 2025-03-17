#!/bin/bash

# Exit on error
set -e

# Build the site
echo "Building the site..."
npm run build

# Ensure CNAME file is in the out directory
echo "Copying CNAME file to out directory..."
cp CNAME out/

# Make sure all styles are properly copied
echo "Ensuring styles are properly copied..."
mkdir -p out/styles
cp -r styles/* out/styles/ || true

# Create .nojekyll file to bypass Jekyll processing
echo "Creating .nojekyll file..."
touch out/.nojekyll

# Fix path issues in the HTML files
echo "Fixing path issues in HTML files..."
# Commented out to avoid path rewrites - let Next.js handle paths correctly
# find out -name "*.html" -exec sed -i '' 's|/_next/|./_next/|g' {} \;

# Verify the changes
echo "Path replacements no longer needed with updated config"
# grep -n "./_next/" out/index.html | head -3

# If you want to deploy manually without GitHub Actions
echo "To deploy manually, you can run:"
echo "git subtree push --prefix out origin gh-pages"
echo "or push the contents of the out directory to your gh-pages branch."
echo "or use: npx gh-pages -d out"

echo "Deployment preparation complete!" 