---
name: Feature Development Workflow
description: Clarify requirements, design test cases, obtain approval, then autonomously implement and verify a feature while matching the existing coding style.
---

# Feature Development Workflow

Use this workflow whenever the user requests a new feature or meaningful change.

## Project technology and deployment constraints

These constraints apply to every feature unless the user explicitly changes them:

- Frontend: React.
- Data: Cloud Firestore.
- File/object storage: Firebase Storage.
- Access Firestore and Firebase Storage directly from the React client using the Firebase Web SDK.
- Deployment target: Firebase, using project ID `bloaging`.
- Do not introduce a separate backend, API server, database, server-side framework, or alternate storage service.
- Keep Firebase configuration client-safe. Never place service-account credentials or private keys in client code.
- Enforce access control with Firestore Security Rules and Firebase Storage Security Rules, not hidden client logic.
- Use Firebase Emulator Suite when practical for local development and security-rule tests.
- End-to-end browser testing: use the project-local `playwright-cli` skill and CLI. Do not substitute another browser automation tool unless the user explicitly approves it.
- E2E execution must be interactive at runtime in headed mode. Do not write Playwright test scripts, browser automation scripts, or other reusable E2E code unless the user explicitly requests it.

Before implementation, verify the existing Firebase configuration, React tooling, Firebase SDK usage, and deployment scripts. If the requested feature requires a service that conflicts with these constraints, explain the conflict and ask for explicit approval before proceeding.

## Phase 1: Clarify and improve the requirement

1. Inspect the repository structure and relevant existing code.
2. Study nearby code to identify and follow the user's established coding style:
   - naming and file organization
   - formatting and conventions
   - architecture and abstractions
   - error handling
   - testing style
3. Ask focused questions about ambiguity, scope, edge cases, dependencies, and acceptance criteria.
4. Discuss and enhance the requirement with the user.
5. Do not modify implementation files during this phase.
6. After approval, write the finalized requirement and test cases to Markdown files on disk; do not rely only on the chat response.

## Phase 2: Define test cases

1. Propose test cases before implementation.
2. Cover the happy path, validation, error handling, boundary conditions, and relevant regressions.
3. Identify the appropriate test level for each case: unit, integration, end-to-end, or manual verification.
4. Discuss the test cases with the user and revise them until the expected behavior is clear.

## Phase 3: Approval gate

Present a concise implementation plan containing:

- the enhanced requirement
- assumptions and out-of-scope items
- the test cases and expected results
- files or areas likely to change
- the proposed branch name

Ask for explicit approval before proceeding. Do not create a branch, write requirement/test-case artifacts, or change implementation files until approval is granted.

## Phase 4: Create the branch and record the plan

After explicit approval:

1. Create and switch to a new branch named `feature/<feature-name>`.
2. Normalize `<feature-name>` to lowercase kebab-case.
3. Create the requirement folder:

   ```text
   RFP/<feature-name>/
   ```

4. Save the approved artifacts there:

   - `requirements.md` — enhanced requirement, scope, assumptions, and acceptance criteria
   - `test-cases.md` — test cases, expected results, and test level

5. Preserve unrelated user changes. Never reset, discard, or overwrite work that was not created by this workflow.

## Phase 5: Autonomous implementation and verification

After the plan is approved and recorded, work autonomously without asking for approval for each routine step:

1. Implement the feature while matching the existing coding style.
2. Add or update automated tests for the approved test cases.
3. Run the narrowest relevant tests first, then the broader test suite.
4. For user-visible web features, load the `playwright-cli` skill and run the approved test cases as end-to-end tests:
   - start the local React application
   - launch a visible browser with `playwright-cli open <url> --headed`
   - use snapshots to identify elements and interact through Playwright CLI
   - execute each scenario directly at runtime through CLI commands; do not create an E2E test script
   - verify visible behavior, content, navigation, and responsive behavior where applicable
   - close the browser after the test run
5. Record the E2E execution on disk in the Markdown file `RFP/<feature-name>/e2e-results.md`, including:
   - date and environment
   - command used to start the application
   - Playwright CLI commands or scenario summary
   - pass/fail result for every test case
   - screenshots, snapshots, videos, or trace paths when produced
   - failure details and remediation, if any
6. Diagnose failures, update the implementation or tests when justified by the approved requirement, and rerun the tests.
7. Continue until all applicable test cases pass.
8. Do not weaken, delete, or skip a test merely to make the suite pass. If a test conflicts with the approved requirement, stop and explain the conflict.
9. Run available formatting, linting, type-checking, and build commands when relevant.
10. Verify Firebase-specific behavior when applicable, including Firestore reads/writes, Storage uploads/downloads, security rules, and the Firebase production build/deployment path.

## Phase 6: Deploy to Firebase

After all approved test cases pass and the production build succeeds, deploy the completed website to Firebase:

1. Verify that the Firebase CLI is installed and that the user is authenticated. If authentication is required, stop and ask the user to authenticate; never request or store credentials in project files.
2. Confirm the active Firebase project is `bloaging` before deployment.
3. Build the production application using the project's build command.
4. Deploy the configured hosting target to Firebase project `bloaging`.
5. If Firestore or Storage rules/indexes were changed, deploy only the approved related Firebase resources together with Hosting.
6. Verify the deployed URL in a headed `playwright-cli` browser session using the same approved E2E scenarios.
7. Record deployment details on disk in `RFP/<feature-name>/deployment.md`, including:
   - Firebase project ID
   - deployment command
   - deployed URL
   - deployment timestamp
   - deployed resource types
   - production E2E results
   - any limitations or follow-up work

Do not deploy to another Firebase project, overwrite unrelated Firebase resources, or use preview channels unless the user explicitly requests it. If Firebase Hosting is not configured, explain the required configuration and ask before adding it.

## Phase 7: Merge after successful deployment

Once Firebase deployment and production E2E verification pass:

1. Commit the completed feature changes on the feature branch with a clear message.
2. Switch to `main` and merge the feature branch into `main`.
3. Preserve the feature branch after merging. Do not delete it; the branch must remain available for continued work and history.
4. Verify that `main` contains the feature and that the feature branch still exists.
5. Do not push either branch unless the user explicitly requests it.

Autonomous mode does not override tool permissions, safety constraints, or the need to ask when a requirement changes, a destructive action is required, credentials are needed, or a blocker cannot be resolved safely.

## Completion report

Report:

- branch name
- files changed
- requirement and test-case artifact paths
- E2E results artifact path and browser evidence
- Firebase deployment artifact path and deployed URL
- commands executed
- test results
- Firebase build/deployment verification
- remaining limitations or follow-up work

Do not commit or push unless the user explicitly requests it. A requested post-deployment merge authorizes the commit and local merge, but does not authorize pushing.
