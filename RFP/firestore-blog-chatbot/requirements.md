# Firestore Blog Chatbot

## Requirement

Add a floating BlogX chatbot that answers questions using only blog data read from Firestore. The chatbot is available to logged-out and logged-in visitors and does not write chatbot data to Firestore.

## Behavior

- Read up to the latest 20 blogs from Firestore in the Firebase TypeScript callable function.
- Send only blog title, category, excerpt/content, and the user's question to Gemini.
- Use Gemini model `gemini-2.5-flash`.
- Return a concise answer and source blog titles.
- If the answer is not in the Firestore context, return: `I couldn't find that in the BlogX stories.`
- Keep the Google AI Studio key in Firebase Secret Manager as `GEMINI_API_KEY`; never expose it in React.

## Acceptance criteria

1. Visitors can open and close the chatbot from the homepage.
2. A question is sent to a Firebase callable function.
3. The function reads blog context from Firestore only.
4. The answer and source titles appear in the chat panel.
5. Questions over 500 characters are rejected.
6. The function does not write to Firestore.
7. Gemini/API failures show a friendly error.
8. The React app and TypeScript function build successfully.
