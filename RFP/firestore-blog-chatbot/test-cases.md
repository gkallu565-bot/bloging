# Firestore Blog Chatbot Test Cases

| ID | Scenario | Expected result | Level |
| --- | --- | --- | --- |
| TC-01 | Open homepage | `Ask BlogX` chatbot control is visible | E2E |
| TC-02 | Open chatbot | Chat panel, input, and Send button are visible | E2E |
| TC-03 | Ask a question about a blog | Answer is returned from Firestore-backed context | E2E/manual |
| TC-04 | Ask an unrelated question | Bot says it could not find the answer in BlogX stories | Function/E2E |
| TC-05 | Inspect sources | Returned source blog titles appear in the response | E2E |
| TC-06 | Submit a question over 500 characters | Friendly validation error is returned | Function |
| TC-07 | Gemini failure | Chat panel remains usable and shows a friendly error | E2E |
| TC-08 | Verify data access | Function reads blogs but does not write chatbot data | Function/security |
| TC-09 | Build frontend | Vite production build passes | Build |
| TC-10 | Build functions | TypeScript compilation passes | Build |
| TC-11 | Deploy function | Function deploys with `GEMINI_API_KEY` secret | Deployment |
