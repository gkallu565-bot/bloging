# BlogX Home Page E2E Results

## Environment

- Date: 2026-10-22
- Browser: Playwright CLI headed browser
- App URL: `http://127.0.0.1:5173/`
- App command: `npm run dev -- --host 127.0.0.1`
- Execution mode: Interactive runtime commands; no Playwright test script was written

## Results

| ID | Result | Evidence |
| --- | --- | --- |
| TC-01 | PASS | Page title: `BlogX \| Stories for curious minds`; page loaded at `/` |
| TC-02 | PASS | Headed snapshot showed `BlogX` and `Sign up` in the header |
| TC-03 | PASS | Runtime DOM count returned `10` for `[data-testid=blog-card]` |
| TC-04 | PASS | Snapshot showed category, title, excerpt, author, and date for all 10 cards |
| TC-05 | PASS | Clicked `a[href='#signup']`; URL changed to `/#signup` |
| TC-06 | PASS | Resized headed browser to `390x844`; mobile snapshot and screenshot completed; no horizontal overflow |
| TC-07 | PASS | `npm run build` completed successfully |
| TC-08 | PASS | Playwright CLI console showed zero errors after the favicon fix |

## Browser evidence

- Desktop screenshot: `RFP/blogx-home-page/home-desktop.png`
- Mobile screenshot: `RFP/blogx-home-page/home-mobile.png`
- Mobile snapshot: `RFP/blogx-home-page/home-mobile.yml`

## Commands used

```text
playwright-cli open http://127.0.0.1:5173 --headed
playwright-cli snapshot
playwright-cli console
playwright-cli --raw eval "document.querySelectorAll('[data-testid=blog-card]').length"
playwright-cli screenshot --filename=RFP/blogx-home-page/home-desktop.png
playwright-cli resize 390 844
playwright-cli snapshot --filename=RFP/blogx-home-page/home-mobile.yml
playwright-cli screenshot --filename=RFP/blogx-home-page/home-mobile.png
playwright-cli --raw eval "document.documentElement.scrollWidth <= document.documentElement.clientWidth"
playwright-cli click "a[href='#signup']"
playwright-cli --raw eval "location.hash"
playwright-cli close
```
