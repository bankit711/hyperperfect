#!/bin/bash

# Exit on error
set -e

# Build the site
echo "Building the site..."
npm run build

# Ensure CNAME file is in the out directory
echo "Copying CNAME file to out directory..."
cp CNAME out/

# If you want to deploy manually without GitHub Actions
echo "To deploy manually, you can run:"
echo "git subtree push --prefix out origin gh-pages"
echo "or push the contents of the out directory to your gh-pages branch."

echo "Deployment preparation complete!" 