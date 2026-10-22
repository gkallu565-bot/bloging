# Firestore Blog Editor

## Requirement

Create a logged-in BlogX writing page at `/write` with a Markdown editor, live preview, image upload, and Firestore persistence. The homepage must load its latest 10 blogs from Firestore, sorted by creation time.

## Data model

Blogs are stored in the `blogs` collection with:

- `title`
- `excerpt`
- `category`
- `content` (Markdown)
- `imageUrl`
- `author` (`uid`, `name`, `photoURL`)
- `createdAt` (Firestore server timestamp)
- `published`

Images are stored under `blog-images/{userId}/{fileName}` in Firebase Storage.

## Acceptance criteria

1. Only an authenticated Google user can open and save a blog from `/write`.
2. The editor provides Markdown input and a live rendered preview.
3. The user can select an image, upload it to Firebase Storage, and save its URL with the blog.
4. A blog saves to Firestore with the authenticated author and server timestamp.
5. The homepage loads at most 10 Firestore blogs ordered by `createdAt` descending.
6. The uploaded image appears on the homepage card.
7. Empty title/content is rejected with a visible validation message.
8. Firestore and Storage rules protect writes while allowing public published-blog reads.
9. The supplied `1.webp` is used to create one test blog through the UI.
