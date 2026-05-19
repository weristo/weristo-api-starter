# Analytics

## What GitHub gives you

GitHub repository owners can open `Insights -> Traffic` to see:

- repository views,
- unique visitors,
- clones,
- unique cloners,
- referring sites,
- popular content.

This is useful for measuring developer interest.

## What GitHub does not reliably give you

GitHub does not provide perfect public README impression tracking. If someone views an embedded image, GitHub may cache it.

## Release downloads

If you publish release assets, GitHub tracks download counts for those assets.

Good measurable assets:

- `openapi.yaml`
- SDK zip files
- Postman collection
- example package archives

## Better external funnel

For campaign-level analytics, link from the README to a Weristo landing page with UTM parameters:

```text
https://weristo.de/developers.html?utm_source=github&utm_medium=readme&utm_campaign=api_starter
```

That gives cleaner product analytics than relying only on GitHub traffic stats.
