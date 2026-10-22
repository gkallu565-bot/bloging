# Firestore Blog Editor

## Requirement

Create a logged-in BlogX writing page at `/write` with a Markdown editor, live preview, and Firestore persistence. The homepage must load its latest 10 blogs from Firestore, sorted by creation time.

## Data model

Blogs are stored in the `blogs` collection with:

- `title`
- `excerpt`
- `category`
- `content` (Markdown)
- `author` (`uid`, `name`, `photoURL`)
- `createdAt` (Firestore server timestamp)
- `published`

## Acceptance criteria

1. Only an authenticated Google user can open and save a blog from `/write`.
2. The editor provides Markdown input and a live rendered preview.
3. A blog saves to Firestore with the authenticated author and server timestamp.
4. The homepage loads at most 10 Firestore blogs ordered by `createdAt` descending.
5. Empty title/content is rejected with a visible validation message.
6. Firestore rules protect writes while allowing public published-blog reads.
7. One test blog is created through the UI.
