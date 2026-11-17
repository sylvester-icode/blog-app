# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-app.spec.ts >> Blog Application >> Authentication >> user can login
- Location: tests\blog-app.spec.ts:58:5

# Error details

```
Error: page.goto: net::ERR_ABORTED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

```
Error: browserContext._wrapApiCall: Target page, context or browser has been closed
```