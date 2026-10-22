# Firebase Google Authentication

## Requirement

Add Google authentication to the BlogX homepage using Firebase Authentication. The homepage header must allow a visitor to sign in or sign up with Google and must show the authenticated user's identity and a sign-out control after success.

## Scope

- Use the Firebase Web SDK and Firebase project `bloaging`.
- Use Google's Firebase provider with Firebase redirect authentication.
- Listen for auth state changes so refreshes restore the current Firebase session.
- Show a Google sign-in/sign-up action while logged out.
- Show the user's avatar/name or email and a sign-out action while logged in.
- Show a friendly error when authentication fails or is cancelled unexpectedly.
- Keep the implementation client-side in React; no backend is added.

## Firebase setup

- Firebase Web App: `blogx`
- App ID: `1:722269312962:web:2c8fe4ae2ec3ba3fb6685b`
- Google provider must be enabled in Firebase Console under Authentication → Sign-in method.
- `bloaging.web.app` must be an authorized domain.

## Acceptance criteria

1. Logged-out visitors see a Google sign-in/sign-up control in the homepage header.
2. Clicking the control opens the Google authentication popup.
3. A successful Google authentication updates the header with user identity and a sign-out control.
4. Refreshing the page preserves the authenticated state while the Firebase session is active.
5. Signing out returns the header to the logged-out state.
6. Authentication failures are communicated without breaking the homepage.
7. Production build, headed runtime E2E checks, and Firebase deployment pass.
