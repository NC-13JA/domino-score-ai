# Domino Score AI

A mobile-first, offline-friendly domino score tracker with camera-assisted tile capture, player management, round history, Arabic/French UI, and local persistence.

## Run
Open `index.html` in a browser, or enable GitHub Pages from Settings → Pages and choose the `main` branch / root.

## Current features
- Add and manage players
- Record round scores and cumulative totals
- Undo the latest round
- Persist match data in local storage
- Arabic and French interface
- Camera/photo picker for assisted domino capture (manual score confirmation remains available)
- PWA manifest and service worker for offline use after first load

## Roadmap
Improve camera-based domino tile and pip detection using bundled OpenCV.js, run unit and browser smoke tests in GitHub Actions, and keep the Android build gated on passing tests.

## License
MIT


## Camera pip counting (experimental)
The browser now includes a local image-processing estimate that highlights dark connected components that may be domino pips. Lighting, shadows, tile borders, and backgrounds can cause false positives or missed dots, so verify the count and correct it before using it. This is not yet a trained computer-vision model and is not equivalent to a dedicated camera-recognition model.

## Spinner scoring option
The rules dialog includes an optional manual x2 round multiplier. Domino rules vary, so enable it only when it matches your table rules. Blank sides naturally contribute zero detected pips.

## Android build
A GitHub Actions workflow builds a debug APK using Capacitor. After a successful run, download the domino-score-ai-debug-apk artifact from the Actions run.


## Automated checks
- `npm test` runs score utility unit tests.
- `npm run test:e2e` runs Playwright browser smoke tests.
- Android builds bundle OpenCV.js locally; no network connection is needed to load the computer-vision library. The detector remains experimental and must be checked against real domino photos.
