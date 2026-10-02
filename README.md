# E-commerce Dashboard

A Next.js and TypeScript app using the Fake Store API. It lets you browse products, filter the catalog, and manage a shopping cart. The cart uses Zustand and saves items in localStorage.

## Run locally

This project was developed with Node.js 24 and npm.

Install the dependencies:

```bash
npm ci
```

Copy `.env.example` to `.env.local`:

```dotenv
FAKE_STORE_API_URL=https://fakestoreapi.com
SITE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000. You'll be redirected to `/products`. The API URL defaults to `https://fakestoreapi.com` when `FAKE_STORE_API_URL` is missing or blank. Products and images need an internet connection. Restart the server after changing the environment variables.

## Features

- Product listing and detail pages, including images, prices, categories, and ratings.
- API sorting, search by name, category and price filters, and pagination.
- Shareable filter URLs with browser back and forward support.
- Add to cart, update quantities, remove items, and see the total.
- Fake Store login and a cart saved separately for each account in the browser.
- Responsive layouts with loading, error, and empty states.
- Page metadata, Product JSON-LD, sitemap, and robots.txt.

## How it works

The product listing and detail pages fetch data on the server using Server Components. Sorting passes `sort=asc` or `sort=desc` to the API, which sorts by product ID.

Search, category, and price filters run in the browser on the fetched products. Pagination comes after filtering, with eight products per page. Filters and pagination update the URL without fetching the catalog again. Changing the sort order makes a new server request.

The URL keeps the filters and page number, so you can share a view or return to it using back and forward. For example:

```text
/products?category=electronics&sort=asc&minPrice=10&maxPrice=200
```

API requests use the native fetch wrapper in `src/lib/api/fetcher.ts` for response and error handling. Cart operations stay local and don't call the API.

Product pages include metadata and JSON-LD. `/sitemap.xml` gets its product URLs from the API, and `/robots.txt` links to it. Login, cart, and filtered catalog URLs use `noindex`.

## Authentication

Use an existing Fake Store test account to log in. A Server Action checks the credentials through `/auth/login`. The username is then saved in sessionStorage, which keeps you logged in across reloads in the same tab. The API token isn't stored or used for cart operations.

Logging out hides the cart. Logging back into the same account restores it from localStorage.

Authentication is basic in this version. Cart access is checked in the browser, and the saved username can be changed there. It shouldn't be used to protect server data or a real checkout.

## Production and scalability

Before using this for a real store, authentication would need signed, expiring sessions in HttpOnly cookies and server-side access checks. Logout and session expiry would also need to be handled on the server.

Multiple server instances would need the same session configuration. A shared session store would be needed if sessions must be revoked immediately. Product prices would also need to be verified on the server before taking payment.

These are future improvements. The cart stays in Zustand and localStorage for Now.

When deploying, change `SITE_URL` to the site's public origin before building. `SITE_URL` must include `http://` or `https://`; it defaults to localhost. Metadata and sitemap links use this value. Set `FAKE_STORE_API_URL` if you want to override the default Fake Store API. Product requests, login requests, and the image allowlist use the same API URL.

## Build and checks

```bash
npm run lint
npm run build
npm start
```

The build checks TypeScript too. You can also run it separately:

```bash
npx tsc --noEmit
```
