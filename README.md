# brainsense

Static redesign of [brainsense.nl](https://www.brainsense.nl/), hosted on GitHub Pages.

- Pages: `index.html`, `slimmer-leren.html`, `slimmer-lesgeven.html`, `slimmer-werken.html`, `lezingen.html`, `contact.html`
- Styles/scripts: `assets/css/style.css`, `assets/js/main.js`
- Contact form posts to Web3Forms (`WEB3FORMS_KEY` in `assets/js/main.js`); submissions go to the inbox registered with that key.
- Deployed by `.github/workflows/pages.yml` on every push to `main` (Settings > Pages > Source: **GitHub Actions**).

Preview locally: `python -m http.server 8000` and open http://localhost:8000.