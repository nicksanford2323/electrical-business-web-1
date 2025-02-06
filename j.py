#!/usr/bin/env python3
import os
import subprocess
import requests
import sys

# Configuration variables
GITHUB_USERNAME = "nicksanford2323"
REPO_NAME = "electrical123"
GITHUB_API_URL = "https://api.github.com"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")

if not GITHUB_TOKEN:
    print("Error: GITHUB_TOKEN environment variable not set.")
    sys.exit(1)

def run_cmd(cmd):
    """Run a shell command and exit if it fails."""
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Command failed: {cmd}")
        print("STDOUT:", result.stdout)
        print("STDERR:", result.stderr)
        sys.exit(result.returncode)
    return result.stdout.strip()

def create_github_repo():
    """Create a new GitHub repository using the GitHub API."""
    url = f"{GITHUB_API_URL}/user/repos"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    data = {
        "name": REPO_NAME,
        "private": False,  # Set to True if you want a private repo
    }
    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 201:
        print(f"Repository '{REPO_NAME}' created successfully.")
    elif response.status_code == 422:
        # Repository may already exist
        print(f"Repository '{REPO_NAME}' may already exist. Continuing...")
    else:
        print("Failed to create repository. Response:")
        print(response.json())
        sys.exit(1)

def setup_git_repo():
    """Initialize a local Git repository, commit changes, and push to GitHub."""
    # Initialize git if not already initialized
    if not os.path.exists(".git"):
        run_cmd("git init")
    else:
        print("Git repository already initialized.")

    # Add all files and commit changes
    run_cmd("git add .")
    try:
        run_cmd('git commit -m "Initial commit"')
    except SystemExit:
        print("Nothing to commit or commit already exists.")

    # Ensure the branch is named main
    run_cmd("git branch -M main")

    # Remove existing remote (if any)
    try:
        run_cmd("git remote remove origin")
    except Exception as e:
        print("No existing remote origin found; continuing...")

    # Set remote URL using your token for HTTPS authentication
    remote_url = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
    run_cmd(f"git remote add origin {remote_url}")

    # Push the code to GitHub (push the main branch)
    run_cmd("git push -u origin main")

def main():
    print("Creating GitHub repository...")
    create_github_repo()

    print("Setting up local Git repository and pushing code...")
    setup_git_repo()

    print("Repository setup complete!")
    print("Now, to deploy your site via GitHub Pages, run:")
    print("    npm run deploy")
    print("Then, configure GitHub Pages in your repository settings to serve from the gh-pages branch.")

if __name__ == "__main__":
    main()
