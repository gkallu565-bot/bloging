# Firestore Blog Editor Test Cases

| ID | Scenario | Expected result | Level |
| --- | --- | --- | --- |
| TC-01 | Open `/write` while logged out | Editor is not available and the user is prompted to sign in | E2E |
| TC-02 | Open `/write` while logged in | Markdown editor, preview, image picker, and publish button are visible | E2E/manual auth |
| TC-03 | Type Markdown | Preview renders headings, emphasis, lists, and paragraphs | E2E |
| TC-04 | Submit empty title/content | Validation message appears and no Firestore write occurs | E2E |
| TC-05 | Publish a completed blog | Blog document saves to Firestore with author and server timestamp | E2E/manual auth |
| TC-06 | Visit homepage after publishing | New blog appears on the homepage | E2E/manual auth |
| TC-07 | Inspect ordering | Homepage shows newest blogs first by `createdAt` | E2E/manual auth |
| TC-08 | Refresh homepage | Firestore data remains visible after refresh | E2E |
| TC-09 | Build and deploy | Production build, Firestore rules, Hosting, and live verification pass | Build/deployment |
