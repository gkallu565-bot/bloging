# BlogX Home Page

## Requirement

Create a React home page for a blogging website named **BlogX**. The page must show exactly 10 blog posts using local dummy data.

## Scope

- Build the home page in React.
- Display the BlogX brand in the header.
- Display a Sign Up control in the header.
- Display exactly 10 blog cards with title, excerpt, author, date, category, and visual placeholder.
- Provide a responsive layout for desktop and mobile widths.
- Use local dummy data only for this feature; Firestore integration is out of scope.
- Sign Up is a presentational link for now; authentication is out of scope.

## Constraints

- Use the existing project React conventions.
- Do not add a backend or alternate data service.
- Use runtime headed Playwright CLI checks; do not create Playwright test scripts.

## Acceptance criteria

1. The home page loads successfully.
2. The header shows `BlogX` and a `Sign up` control.
3. Exactly 10 blog cards are visible.
4. Each card includes the approved dummy blog content fields.
5. The layout adapts to narrow screens.
6. The production build completes successfully.
