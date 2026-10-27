# Creator-only Blog Summarization

## Requirement

Add a `Summarize blog` action to BlogX. Only the authenticated creator of a blog may request a summary. The request must be handled by a Firebase TypeScript callable function using Gemini `gemini-2.5-flash`, and the generated summary must be saved in the blog's Firestore document.

## Security

- The callable function rejects unauthenticated requests.
- The function loads the blog from Firestore and compares `blog.author.uid` with `request.auth.uid`.
- The Gemini API key is stored in Firebase Secret Manager as `GEMINI_API_KEY` and is never sent to the browser.

## Acceptance criteria

1. The creator sees the `Summarize blog` button on their blog.
2. Other authenticated users do not see the button.
3. Unauthenticated callable requests are rejected.
4. A creator request generates a 2–3 sentence Gemini summary.
5. The summary, `summarizedAt`, and `summarizedBy` are saved to Firestore.
6. The generated summary appears on the blog card without a page reload.
7. The function and React app build successfully.
8. The function is deployed to project `bloaging` after Secret Manager permissions are available.
