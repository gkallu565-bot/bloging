# Blog Summarization Test Cases

| ID | Scenario | Expected result | Level |
| --- | --- | --- | --- |
| TC-01 | View a blog as its creator | `Summarize blog` button is visible | E2E |
| TC-02 | View a blog as another authenticated user | Summarize button is not visible | E2E/security |
| TC-03 | Call the function while signed out | Function returns `unauthenticated` | Function |
| TC-04 | Call the function for another user's blog | Function returns `permission-denied` | Function/security |
| TC-05 | Creator clicks Summarize | Button shows progress and Gemini returns a summary | E2E/manual auth |
| TC-06 | Summary completes | Summary appears and Firestore contains `summary`, `summarizedAt`, and `summarizedBy` | E2E/manual auth |
| TC-07 | Gemini failure | Friendly error appears and the page remains usable | E2E |
| TC-08 | Build functions | TypeScript compilation passes | Build |
| TC-09 | Build frontend | Vite production build passes | Build |
| TC-10 | Deploy function | Firebase Function deploys with `GEMINI_API_KEY` secret | Deployment |
