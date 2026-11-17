# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-app.spec.ts >> Blog Application >> Authentication >> registration fails with mismatched passwords
- Location: tests\blog-app.spec.ts:42:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Username', { exact: true })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: My Blogs
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home" [ref=e9] [cursor=pointer]:
            - /url: /
        - listitem [ref=e10]:
          - link "Blogs" [ref=e11] [cursor=pointer]:
            - /url: /blogs
        - listitem [ref=e12]:
          - link "Users" [ref=e13] [cursor=pointer]:
            - /url: /users
      - generic [ref=e14]:
        - link "Login" [ref=e15] [cursor=pointer]:
          - /url: /login
        - link "Register" [ref=e16] [cursor=pointer]:
          - /url: /register
  - generic [ref=e19]:
    - heading "Register" [level=2] [ref=e20]
    - generic [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]: Username
        - textbox "Choose a username" [ref=e25]
      - generic [ref=e26]:
        - generic [ref=e27]: Name
        - textbox "Enter your name" [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e31]: Password
        - textbox "••••••••" [ref=e33]
      - generic [ref=e34]:
        - generic [ref=e35]: Confirm Password
        - textbox "••••••••" [ref=e37]
      - button "Register" [ref=e39] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e45] [cursor=pointer]
  - alert [ref=e49]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test"
  2   | import { resetDatabase, createUser, loginUser, createBlog } from "./helpers"
  3   | 
  4   | test.describe("Blog Application", () => {
  5   |   test.beforeEach(async () => {
  6   |     await resetDatabase()
  7   |   })
  8   | 
  9   |   test.describe("Authentication", () => {
  10  |     test("user can register", async ({ page }) => {
  11  |       await page.goto("/register")
  12  | 
  13  |       await page.getByLabel("Username", { exact: true }).fill("testuser")
  14  |       await page.getByLabel("Name", { exact: true }).fill("Test User")
  15  |       await page.getByLabel("Password", { exact: true }).fill("testpass123")
  16  |       await page
  17  |         .getByLabel("Confirm Password", { exact: true })
  18  |         .fill("testpass123")
  19  | 
  20  |       await page.getByTestId("register-button").click()
  21  | 
  22  |       // Should redirect to login page
  23  |       await expect(page).toHaveURL("/login")
  24  |     })
  25  | 
  26  |     test("registration fails with short username", async ({ page }) => {
  27  |       await page.goto("/register")
  28  | 
  29  |       await page.getByLabel("Username", { exact: true }).fill("usr")
  30  |       await page.getByLabel("Name", { exact: true }).fill("Test User")
  31  |       await page.getByLabel("Password", { exact: true }).fill("testpass123")
  32  |       await page
  33  |         .getByLabel("Confirm Password", { exact: true })
  34  |         .fill("testpass123")
  35  | 
  36  |       await page.getByTestId("register-button").click()
  37  | 
  38  |       // Should show error message
  39  |       await expect(page.getByTestId("username-error")).toBeVisible()
  40  |     })
  41  | 
  42  |     test("registration fails with mismatched passwords", async ({ page }) => {
  43  |       await page.goto("/register")
  44  | 
> 45  |       await page.getByLabel("Username", { exact: true }).fill("testuser")
      |                                                          ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  46  |       await page.getByLabel("Name", { exact: true }).fill("Test User")
  47  |       await page.getByLabel("Password", { exact: true }).fill("testpass123")
  48  |       await page
  49  |         .getByLabel("Confirm Password", { exact: true })
  50  |         .fill("differentpass")
  51  | 
  52  |       await page.getByTestId("register-button").click()
  53  | 
  54  |       // Should show error message
  55  |       await expect(page.getByTestId("passwordConfirm-error")).toBeVisible()
  56  |     })
  57  | 
  58  |     test("user can login", async ({ page }) => {
  59  |       await createUser("testuser", "Test User", "testpass123")
  60  | 
  61  |       await page.goto("/login")
  62  |       await page.getByLabel("Username", { exact: true }).fill("testuser")
  63  |       await page.getByLabel("Password", { exact: true }).fill("testpass123")
  64  |       await page.getByTestId("login-button").click()
  65  | 
  66  |       // Should redirect to home page and show success notification
  67  |       await expect(page).toHaveURL("/")
  68  |       await expect(page.getByTestId("notification")).toBeVisible()
  69  |     })
  70  | 
  71  |     test("login fails with wrong credentials", async ({ page }) => {
  72  |       await createUser("testuser", "Test User", "testpass123")
  73  | 
  74  |       await page.goto("/login")
  75  |       await page.getByLabel("Username", { exact: true }).fill("testuser")
  76  |       await page.getByLabel("Password", { exact: true }).fill("wrongpassword")
  77  |       await page.getByTestId("login-button").click()
  78  | 
  79  |       // Should show error message
  80  |       await expect(page.getByTestId("error-message")).toBeVisible()
  81  |     })
  82  | 
  83  |     test("logged in user can see their info", async ({ page }) => {
  84  |       await createUser("testuser", "Test User", "testpass123")
  85  |       await loginUser(page, "testuser", "testpass123")
  86  | 
  87  |       // Navigate to me page to see user info
  88  |       await page.goto("/me")
  89  | 
  90  |       // Should show username on me page
  91  |       await expect(page.getByTestId("user-username")).toBeVisible()
  92  |     })
  93  | 
  94  |     test("user can logout", async ({ page }) => {
  95  |       await createUser("testuser", "Test User", "testpass123")
  96  |       await loginUser(page, "testuser", "testpass123")
  97  | 
  98  |       await page.goto("/blogs")
  99  | 
  100 |       // Click logout button
  101 |       await page.getByRole("button", { name: /logout/i }).click()
  102 | 
  103 |       // Should redirect and show login link in navbar
  104 |       await expect(
  105 |         page.getByRole("link", { name: "login", exact: true }),
  106 |       ).toBeVisible()
  107 |     })
  108 |   })
  109 | 
  110 |   test.describe("Navigation", () => {
  111 |     test("home page can be opened", async ({ page }) => {
  112 |       await page.goto("/")
  113 | 
  114 |       // Should show the homepage content
  115 |       await expect(page).toHaveURL("/")
  116 |     })
  117 | 
  118 |     test("navigation links are visible for non-logged in user", async ({
  119 |       page,
  120 |     }) => {
  121 |       await page.goto("/")
  122 | 
  123 |       // Should show login and register links in navbar
  124 |       await expect(
  125 |         page.getByRole("link", { name: "login", exact: true }),
  126 |       ).toBeVisible()
  127 |       await expect(
  128 |         page.getByRole("link", { name: "register", exact: true }),
  129 |       ).toBeVisible()
  130 |     })
  131 | 
  132 |     test("navigation links change after login", async ({ page }) => {
  133 |       await createUser("testuser", "Test User", "testpass123")
  134 |       await loginUser(page, "testuser", "testpass123")
  135 | 
  136 |       await page.goto("/")
  137 | 
  138 |       // Login and Register links in navbar should not be visible
  139 |       await expect(
  140 |         page.getByRole("link", { name: "login", exact: true }),
  141 |       ).not.toBeVisible()
  142 |       await expect(
  143 |         page.getByRole("link", { name: "register", exact: true }),
  144 |       ).not.toBeVisible()
  145 | 
```