# Firebase Deployment

- Project ID: `bloaging`
- Hosting site: `bloaging`
- Deployment date: 2026-10-22
- Deployment command: `firebase deploy --project bloaging --only hosting`
- Build command: `npm run build`
- Deployed resource: Firebase Hosting
- Live URL: https://bloaging.web.app
- Firebase Console: https://console.firebase.google.com/project/bloaging/overview

## Production verification

Verified with the headed Playwright CLI against `https://bloaging.web.app`:

- Page title: `BlogX | Stories for curious minds`
- Header shows `BlogX` and `Sign up`
- Runtime blog card count: `10`
- Browser console errors: `0`
- Production snapshot captured successfully
