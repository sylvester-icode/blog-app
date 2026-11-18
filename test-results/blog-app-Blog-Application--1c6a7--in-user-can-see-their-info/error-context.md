# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-app.spec.ts >> Blog Application >> Authentication >> logged in user can see their info
- Location: tests\blog-app.spec.ts:83:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "/" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "My Blogs" [ref=e5] [cursor=pointer]:
        - /url: /
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "home" [ref=e9] [cursor=pointer]:
            - /url: /
        - listitem [ref=e10]:
          - link "blogs" [ref=e11] [cursor=pointer]:
            - /url: /blogs
        - listitem [ref=e12]:
          - link "users" [ref=e13] [cursor=pointer]:
            - /url: /users
      - generic [ref=e14]:
        - link "login" [ref=e15] [cursor=pointer]:
          - /url: /login
        - link "register" [ref=e16] [cursor=pointer]:
          - /url: /register
  - generic [ref=e19]:
    - heading "Login" [level=2] [ref=e20]
    - generic [ref=e21]: Invalid username or password
    - generic [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e27]: Username
        - textbox "Username" [ref=e29]:
          - /placeholder: Enter your username
          - text: testuser
      - generic [ref=e30]:
        - generic [ref=e31]: Password
        - textbox "Password" [ref=e33]:
          - /placeholder: ••••••••
          - text: testpass123
      - button "Login" [ref=e35] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e41] [cursor=pointer]
  - alert [ref=e45]
```

# Test source

```ts
  1  | import { Page } from "@playwright/test"
  2  | 
  3  | const baseUrl = "http://localhost:3000"
  4  | 
  5  | export const resetDatabase = async () => {
  6  |   const response = await fetch(`${baseUrl}/api/testing/reset`, {
  7  |     method: "DELETE",
  8  |   })
  9  |   if (!response.ok) {
  10 |     const errorText = await response.text()
  11 |     throw new Error(
  12 |       `Failed to reset database: ${response.status} ${response.statusText} - ${errorText}`,
  13 |     )
  14 |   }
  15 | }
  16 | 
  17 | export const createUser = async (
  18 |   username: string,
  19 |   name: string,
  20 |   password: string,
  21 | ) => {
  22 |   const response = await fetch(`${baseUrl}/api/testing/users`, {
  23 |     method: "POST",
  24 |     headers: {
  25 |       "Content-Type": "application/json",
  26 |     },
  27 |     body: JSON.stringify({ username, name, password }),
  28 |   })
  29 |   if (!response.ok) {
  30 |     const errorText = await response.text()
  31 |     throw new Error(
  32 |       `Failed to create user: ${response.status} ${response.statusText} - ${errorText}`,
  33 |     )
  34 |   }
  35 |   return response.json()
  36 | }
  37 | 
  38 | export const loginUser = async (
  39 |   page: Page,
  40 |   username: string,
  41 |   password: string,
  42 | ) => {
  43 |   await page.goto("/login")
  44 |   await page.getByLabel("Username", { exact: true }).fill(username)
  45 |   await page.getByLabel("Password", { exact: true }).fill(password)
  46 |   await page.getByRole("button", { name: "Login" }).click()
  47 |   // Wait for navigation or notification
> 48 |   await page.waitForURL("/")
     |              ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  49 | }
  50 | 
  51 | export const createBlog = async (
  52 |   page: Page,
  53 |   title: string,
  54 |   author: string,
  55 |   url: string,
  56 | ) => {
  57 |   await page.goto("/blogs/new")
  58 |   await page.getByLabel("Title", { exact: true }).fill(title)
  59 |   await page.getByLabel("Author", { exact: true }).fill(author)
  60 |   await page.getByLabel("URL", { exact: true }).fill(url)
  61 |   await page.getByRole("button", { name: "Create" }).click()
  62 |   // Wait for navigation to blogs page
  63 |   await page.waitForURL("/blogs")
  64 | }
```