# API Layer Architecture

Public API only (no auth). Structure: **endpoints** → **client** → **services** → **hooks**.

## Structure

```
src/
├── api/
│   ├── endpoints.ts    # All API path constants (e.g. /tours, /tours/:slug)
│   ├── client.ts       # Base HTTP client (apiGet, apiPost, error handling)
│   ├── types.ts        # Shared API types (ApiError, ApiResponse)
│   ├── services/       # One service per resource; uses client + endpoints
│   │   ├── tours.service.ts
│   │   ├── destinations.service.ts
│   │   ├── blog.service.ts
│   │   ├── contact.service.ts
│   │   └── index.ts
│   └── index.ts
├── hooks/              # React hooks that call services
│   ├── useApi.ts       # Generic useApi(fetcher) for GET requests
│   ├── useTours.ts
│   ├── useTourBySlug.ts
│   ├── useDestinations.ts
│   ├── useDestinationBySlug.ts
│   ├── useBlog.ts
│   ├── useContactSubmit.ts
│   └── index.ts
```

## Flow

1. **Endpoints** – Define path strings only. Base URL comes from env in `client`.
2. **Client** – `apiGet`, `apiPost`, etc. Build full URL, set headers, parse JSON, throw `ClientError` on non-2xx.
3. **Services** – Call `apiGet(path)` / `apiPost(path, body)` with typed responses. No React.
4. **Hooks** – Use services and expose `{ data, error, isLoading, refetch }` (or for contact: `{ submit, isLoading, error, success }`).

## Usage

**In a page/component (list):**

```ts
import { useTours } from "@/hooks";

const { data: tours, error, isLoading, refetch } = useTours();
```

**By slug:**

```ts
import { useTourBySlug } from "@/hooks";

const { data: tour, error, isLoading } = useTourBySlug(slug);
```

**Contact form:**

```ts
import { useContactSubmit } from "@/hooks";

const { submit, isLoading, error, success, reset } = useContactSubmit();
await submit({ name, email, phone, subject, message });
```

**Without a hook (e.g. server or one-off):**

```ts
import { toursService } from "@/api/services";

const tours = await toursService.getAll();
```

## Config

- Set `NEXT_PUBLIC_API_BASE_URL` (and optionally `API_BASE_URL` for server) in `.env` if the API is on another origin. Leave unset for same-origin (e.g. Next.js API routes under `/api/tours`); then change paths in `endpoints.ts` to `/api/tours`, etc.
