import os
import requests
import subprocess
from datetime import datetime

# GitHub configuration
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
USERNAME = "Nicksanford2323"
REPO_NAME = f"ELECTRIC-SITE-{datetime.now().strftime('%Y%m%d')}"

# GitHub API headers
headers = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.v3+json'
}

def create_repo():
    """Create a new repository on GitHub"""
    url = 'https://api.github.com/user/repos'
    data = {
        'name': REPO_NAME,
        'description': 'Electrical Business Website',
        'private': False,
        'has_issues': True,
        'has_projects': True,
        'has_wiki': True
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 201:
        print(f"Successfully created repository: {REPO_NAME}")
        return True
    else:
        print(f"Failed to create repository: {response.status_code}")
        print(response.json())
        return False

def setup_local_repo():
    """Initialize local repository and push to GitHub"""
    try:
        # Initialize git if not already initialized
        if not os.path.exists('.git'):
            subprocess.run(['git', 'init'], check=True)

        # Create .gitignore
        with open('.gitignore', 'w') as f:
            f.write("""
node_modules/
.DS_Store
dist/
.env
.env.local
*.log
            """.strip())

        # Create GitHub Actions workflow for GitHub Pages
        os.makedirs('.github/workflows', exist_ok=True)
        with open('.github/workflows/deploy.yml', 'w') as f:
            f.write("""
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: dist
            """.strip())

        # Add all files
        subprocess.run(['git', 'add', '.'], check=True)

        # Commit
        subprocess.run(['git', 'commit', '-m', 'Initial commit'], check=True)

        # Update remote if it exists, add if it doesn't
        remote_url = f'https://{GITHUB_TOKEN}@github.com/{USERNAME}/{REPO_NAME}.git'
        try:
            # Try to remove existing remote
            subprocess.run(['git', 'remote', 'remove', 'origin'], check=False)
        except:
            pass

        # Add new remote
        subprocess.run(['git', 'remote', 'add', 'origin', remote_url], check=True)

        # Force push to GitHub
        subprocess.run(['git', 'push', '-u', 'origin', 'main', '--force'], check=True)

        print("Successfully set up local repository and pushed to GitHub")
        return True

    except subprocess.CalledProcessError as e:
        print(f"Error during git operations: {e}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

def update_vite_config():
    """Update vite.config.js for GitHub Pages"""
    vite_config = '''
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
})
'''.strip()

    with open('vite.config.js', 'w') as f:
        f.write(vite_config)

def main():
    if not GITHUB_TOKEN:
        print("Error: GITHUB_TOKEN environment variable not set")
        return

    # Create repository on GitHub
    if not create_repo():
        return

    # Update vite config for GitHub Pages
    update_vite_config()

    # Setup local repo and push to GitHub
    if setup_local_repo():
        print(f"""
Repository successfully created and code pushed!

Your repository is available at: https://github.com/{USERNAME}/{REPO_NAME}
The site will be available at: https://{USERNAME}.github.io/{REPO_NAME}

Next steps:
1. Go to repository settings
2. Navigate to Pages section
3. Ensure source is set to gh-pages branch
4. Wait a few minutes for the GitHub Action to complete
5. Your site should be live!
        """)

if __name__ == "__main__":
    main()