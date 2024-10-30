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
