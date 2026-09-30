# Task A - E-commerce Dashboard

An e-commerce dashboard built with Next.js, TypeScript, and the Fake Store API. The cart uses Zustand and is saved in localStorage.

## Run locally

Developed with Node.js 24 and npm.

```bash
npm ci
```

Copy `.env.example` to `.env.local` and make sure it contains:

```dotenv
FAKE_STORE_API_URL=https://fakestoreapi.com
```

Then start the app:

```bash
npm run dev
```

Open http://localhost:3000. The home page redirects to `/products`.

The API URL is required. If you change it, restart the server. Product data and images need an internet connection.

## Features

- Product listing with images, prices, categories, and ratings.
- Ascending and descending sorting through the API.
- Search by name, category and price filters, and pagination.
- A details page for each product.
- Add to cart, change quantities, remove items, and view the total.
- Cart saved across page reloads using localStorage.
- Loading, error, and empty states, with responsive layouts.

## Implementation notes

The listing and product details pages fetch data in Server Components. Sorting is sent to the API through the `sort` parameter; it sorts by product ID.

Search and filters run in the browser on the fetched products. Pagination is applied after filtering, with eight products per page.

API calls use the shared native fetch wrapper in `src/lib/api/fetcher.ts`. Cart actions are handled locally and do not call the API.

## Build and checks

```bash
npm run lint
npm run build
npm start
```

The production build also checks TypeScript. To run a separate type check after the build:

```bash
npx tsc --noEmit
```

Set `FAKE_STORE_API_URL` in the deployment environment as well.
