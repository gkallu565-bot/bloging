# Firestore Blog Chatbot E2E Results

## Current results

- TC-01: PASS — `Ask BlogX` control is visible on the homepage.
- TC-02: PASS — Chat panel, question input, and Send button render in headed Playwright CLI.
- TC-09: PASS — React production build completed.
- TC-10: PASS — Firebase Function TypeScript build completed.
- TC-03/04/05/07: PENDING — requires deployed callable function and Gemini secret.
- TC-06/08: PENDING — function deployment required.
- TC-11: BLOCKED — Firebase project must be on Blaze plan and Secret Manager must be available.

## Playwright CLI run

- Chatbot opened: PASS
- Question input and Send button: PASS
- Question submitted: PASS
- Response: BLOCKED — `askBlogBot` is not deployed; browser reported a CORS failure for `https://us-central1-bloaging.cloudfunctions.net/askBlogBot`.
- Authentication: The screenshot's `Sign out` control confirms the displayed session is signed in; it is unrelated to the chatbot failure.
