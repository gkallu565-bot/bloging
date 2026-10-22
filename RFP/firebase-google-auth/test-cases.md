# Firebase Google Authentication Test Cases

| ID | Scenario | Expected result | Level |
| --- | --- | --- | --- |
| TC-01 | Load the homepage while logged out | BlogX homepage loads and the Google sign-in/sign-up control is visible | E2E |
| TC-02 | Click Google sign-in/sign-up | A headed browser redirects to the Google authentication page | E2E/manual approval |
| TC-03 | Complete Google authentication | Header shows the authenticated user's identity and `Sign out` | E2E/manual approval |
| TC-04 | Reload after authentication | Firebase restores the session and the signed-in header remains visible | E2E/manual approval |
| TC-05 | Sign out | User returns to the logged-out Google sign-in/sign-up control | E2E/manual approval |
| TC-06 | Cancel or fail authentication | A friendly error is shown and the homepage remains usable | E2E/manual approval |
| TC-07 | Inspect existing content | All 10 blog cards remain visible in both auth states | E2E |
| TC-08 | Build the application | Production build completes successfully | Build |
| TC-09 | Deploy and verify live site | Firebase Hosting deploys and the live page loads without console errors | E2E/deployment |
