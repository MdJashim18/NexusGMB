# Nexus GMB — Landing Page

## Folder Structure

```
nexus-gmb/
├── index.html          ← Main HTML page (links to CSS + JS)
├── css/
│   └── styles.css      ← All styles (variables, layout, components)
├── js/
│   └── main.js         ← FAQ toggle, scroll reveal, nav shrink
└── react/
    └── App.jsx         ← Full React version (same page, all components)
```

## Option 1: Plain HTML (Recommended for quick deploy)

Just open `index.html` in a browser or deploy to any static host:
- Netlify: drag & drop the `nexus-gmb/` folder
- GitHub Pages: push to a repo, enable Pages
- Vercel: connect repo or drag & drop

No build step needed.

## Option 2: React (Vite recommended)

1. Create a new Vite project:
   ```bash
   npm create vite@latest nexus-gmb-react -- --template react
   cd nexus-gmb-react
   ```

2. Replace `src/App.jsx` with the contents of `react/App.jsx`

3. Add the CSS import to `src/main.jsx`:
   ```jsx
   import './index.css'  // or paste styles.css content here
   ```

4. Copy `css/styles.css` content into `src/index.css`

5. Add Google Fonts to `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
   ```

6. Run:
   ```bash
   npm install
   npm run dev
   ```

## Contact Info (already embedded)
- WhatsApp: +8801690129663
- Email: nokibulabsarshawon@gmail.com

## Customization Tips
- **Add real clients**: Replace demo portfolio cards with real niche/city/metrics
- **Add real reviews**: Swap placeholder testimonials as you close clients
- **Update pricing**: Edit PACKAGES array in App.jsx or the HTML directly
- **Colors**: Change `--accent` in `:root` in styles.css for full rebrand
