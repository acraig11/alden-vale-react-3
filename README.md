# Alden & Vale — React law firm concept

## Run locally

Requires Node.js 22.12+.

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

React 19 handles the interface and interaction state; Vite builds the site. Components are in `src/App.jsx`, styles in `src/styles.css`.

Firm details are illustrative. The inquiry form validates inputs and displays a local preview message; it does not send or store submissions. Photography and fonts require internet access.

## Pages and routing

One `index.html` loads React. React Router handles these routes without full-page reloads:

- `src/pages/HomePage.jsx` → `/`
- `src/pages/ExpertisePage.jsx` → `/expertise`
- `src/pages/ApproachPage.jsx` → `/approach`
- `src/pages/ContactPage.jsx` → `/contact`

Shared header and footer live in `src/components/`. Practice-area links preselect the contact form using a query parameter. Unknown routes show a page-not-found view.

For production hosting, configure an SPA fallback: serve `index.html` for unmatched page paths while serving existing assets normally. Vite's dev and preview servers provide this behavior locally.
