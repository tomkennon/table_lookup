# Wedding Guest Table Lookup App

A mobile-first, static GitHub Pages web application for wedding guests to quickly look up their table assignment by full name or table number.

## Target GitHub Pages URL

Expected Deployment URL: **[https://tomkennon.github.io/table_lookup/](https://tomkennon.github.io/table_lookup/)**

---

## Features

- **Mobile-First Design**: Optimized for guests scanning a QR code on iPhone Safari / Android Chrome.
- **Combined Filtering**: Search by name (case-insensitive partial matching) and filter by Table Number with combined AND logic.
- **Alphabetical Sorting**: Default alphabetical sorting by guest full name.
- **Offline / Static**: Pure static React + Vite web application without any backend, database, external API, tracking, or runtime external dependencies.
- **Custom QR Code Generator**: Includes a Python script generating high-resolution PNG and SVG QR codes featuring a centered "T & L" monogram overlay.

---

## How to Run the App Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/table_lookup/` in your browser.

3. **Run Unit Tests**:
   ```bash
   npm test
   ```

---

## How to Update Guest / Table Data

Guest data is stored in JSON format at [`src/data/guests.json`](src/data/guests.json).

To update or add a guest:
1. Open `src/data/guests.json`.
2. Add or edit a guest object in the list:
   ```json
   {
     "name": "Full Name",
     "table": "Table X"
   }
   ```
3. Run `npm test` to verify dataset integrity.

---

## How to Build for Production

To create the production static bundle:

```bash
npm run build
```

The output will be placed in the `dist/` directory, pre-configured with the base path `/table_lookup/` for GitHub Pages.

---

## How to Generate the QR Code

A Python script is provided in `scripts/generate_qr.py` to produce print-ready high-resolution QR codes.

1. **Install Python dependencies**:
   ```bash
   pip install qrcode[pil]
   ```

2. **Run the script**:
   ```bash
   python3 scripts/generate_qr.py
   ```

3. **Generated QR Code Location**:
   - High-Resolution PNG: `public/qr_code.png` (also copied to `dist/qr_code.png` upon build)
   - Scalable Vector SVG: `public/qr_code.svg` (also copied to `dist/qr_code.svg` upon build)

---

## How GitHub Pages Deployment Works

This repository uses a GitHub Actions workflow located at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

When changes are pushed to the `main` branch, GitHub Actions will automatically:
1. Install dependencies (`npm ci`).
2. Run test suites (`npm test`).
3. Build the application (`npm run build`).
4. Upload the built static files in `dist/` to GitHub Pages.

### Enabling GitHub Pages in Repository Settings:
1. Go to your GitHub repository: **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Pushing to `main` will automatically trigger deployment to `https://tomkennon.github.io/table_lookup/`.
