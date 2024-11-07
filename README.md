## Bun installation

`npm install -g bun`

## Install dependencies

`bun install --pure-lockfile`

## Authentication

-   all pages are protected by ./middleware.ts with [next-auth](https://www.youtube.com/watch?v=w2h54xz6Ndw)

## Authorization

-   page authorization is ignored, only component is applied

-   [setup ](https://www.youtube.com/watch?v=ay-atEUGIc4)

### Example of role protection

```ts
const { data: session } = useSession({
    required: true
});

if (session?.user.role !== 'user') {
    return <h1 className="text-5xl">Access Denied</h1>;
}
```

# Fetching best practices

1. [Best Practices](https://www.youtube.com/watch?v=udOD6yAhjB4)
2.

## Webhooks

### API Route Pattern

[API Route Handlers](https://www.youtube.com/watch?v=yRJd_tlHu9I)
[3 Important Patterns](https://www.youtube.com/watch?v=T6mWYLLngnE)

## Refetching data, ex. update values every minute

### NEXT Server Actions + React Query

[Server Actions + React Query](https://www.youtube.com/watch?v=OgVeQVXt7xU)

## Display values only on initial render, prefill
