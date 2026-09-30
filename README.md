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
SITE_URL=http://localhost:3000
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
- Shareable filter URLs with browser back and forward support.
- A details page for each product.
- Add to cart, change quantities, remove items, and view the total.
- Cart saved across page reloads using localStorage.
- Login through the Fake Store API, with cart access restricted to logged-in users.
- Page metadata, Product JSON-LD, and a sitemap linked from robots.txt.
- Loading, error, and empty states, with responsive layouts.

## Implementation notes

The listing and product details pages fetch data in Server Components. Sorting is sent to the API through the `sort` parameter; it sorts by product ID.

Search and filters run in the browser on the fetched products. Pagination is applied after filtering, with eight products per page.

The URL stores `search`, `category`, `minPrice`, `maxPrice`, `sort`, and `page`, so opening a shared link or using browser back and forward restores the view. For example: `/products?category=electronics&sort=asc&minPrice=10&maxPrice=200`. Changing filters or sorting returns to page one. Reset filters keeps the selected sort order. Consecutive typing within a filter field updates one history entry; category and page changes add separate entries. Filter and page changes use browser history without refetching the catalog; changing sort still fetches the API on the server.

API calls use the shared native fetch wrapper in `src/lib/api/fetcher.ts`. Cart actions are handled locally and do not call the API.

The login form calls a Server Action, which verifies the credentials using Fake Store's `/auth/login` through the API wrapper. After success, a separate auth context stores the username in sessionStorage so login survives reloads in the same tab. The returned API token is not stored or used for cart operations. Logging out clears the auth state and sessionStorage entry.

Cart UI and actions are gated on the client, this is not server-side authorization. Real checkout or protected server data would need a server-verified session. No session cookie or session secret is used.

Carts are stored separately for each username in localStorage. Logging out hides the cart; logging back into the same account restores it. Old carts saved before authentication was added are not assigned to an account. Cart data stays on the browser and is not suitable for enforcing real checkout prices or authorization.

Use an existing Fake Store test account to log in.

Product pages generate titles, descriptions, canonical URLs and Open Graph metadata from the same product data used by the page. A request-scoped cache shares the product lookup between metadata and page rendering. JSON-LD includes the displayed product, price in USD and ratings, with script content escaped before embedding it in HTML.

`/sitemap.xml` lists `/products` and each product detail URL using the API catalog. It is generated at request time and requires the API to be available. The API does not supply modification dates, so the sitemap omits them. `/robots.txt` points crawlers to the sitemap. Login, cart and catalog query variants use `noindex`; the base catalog and product detail pages remain indexable.

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

Set `FAKE_STORE_API_URL` and `SITE_URL` in the deployment environment before building. `SITE_URL` is the public site origin, such as `https://yourStore.example`, and must include `http://` or `https://`. It defaults to `http://localhost:3000` for local development. Use actual deployed origin so canonical links, structured data and sitemap URLs point to the live site.
