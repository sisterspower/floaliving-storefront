# Uploading this project to GitHub from a phone or browser

1. Download and unzip the project.
2. Open your empty GitHub repository `floaliving-storefront` in a browser.
3. Choose **Add file → Upload files**.
4. Upload the **contents inside** the unzipped `floaliving-storefront` folder (not the ZIP itself).
5. Commit message: `Initial FLOALIVING storefront`.
6. Commit directly to `main`.

If your browser does not allow selecting folders, upload the top-level files and folders in batches, preserving their paths. A laptop/desktop Git client is easier for a multi-folder project.

## Better option with terminal
```bash
cd floaliving-storefront
git init
git branch -M main
git add .
git commit -m "Initial FLOALIVING storefront"
git remote add origin https://github.com/sisterspower/floaliving-storefront.git
git push -u origin main
```
