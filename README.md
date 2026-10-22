# Next.js + Tailwind CSS + Capacitor

A minimal, production-shaped boilerplate for shipping a **Next.js** app as a native **Android** app with **Capacitor**. The web layer is statically exported, Tailwind handles styling, and Capacitor provides the native shell, plugins, and device APIs.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 (CSS-first config) |
| Native shell | Capacitor 8 (Android) |
| Language | TypeScript |
| Output | Static export to `out/` |

## Requirements

- **Node.js 22+** (required by the Capacitor 8 CLI)
- **npm**
- **Android Studio** with the Android SDK installed
- **JDK 21** (bundled with recent Android Studio releases)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app is a normal Next.js site until you build and sync it into the native project.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server (browser only) |
| `npm run build` | Build and statically export the app to `out/` |
| `npm run preview` | Serve the exported `out/` directory locally |
| `npm run lint` | Run ESLint |
| `npm run cap:sync` | Build the web app, copy it into Android, and update native plugins |
| `npm run cap:copy` | Build and copy web assets without updating plugins |
| `npm run cap:resources` | Regenerate Android icons and splash screens from `assets/` |
| `npm run cap:android` | Run `cap:sync`, then open the project in Android Studio |
| `npm run cap:run:android` | Run `cap:sync`, then install and launch on a device/emulator |
| `npm run cap:add:android` | Add the `android/` platform again if it is missing |

### `cap:sync`

The main native loop:

```bash
npm run cap:sync
```

This runs `next build` (which writes `out/`), copies the exported site into `android/app/src/main/assets/public`, and updates native plugin wiring. Run it after **any** web change or plugin install before testing in Android Studio.

### `cap:resources`

```bash
npm run cap:resources
```

Regenerates every Android launcher icon density and splash screen from the source images in `assets/`:

- `assets/icon.png` — **1024x1024** PNG
- `assets/splash.png` — **2732x2732** PNG

Optional sources supported by Capacitor Assets include `splash-dark.png`, `icon-foreground.png`, and `icon-background.png`. Replace the placeholder images, then rerun the command. The script targets Android; for a future iOS platform use `npx capacitor-assets generate --ios`.

### `cap:android`

```bash
npm run cap:android
```

Syncs the latest web build and opens the native project in Android Studio. From there, pick an emulator or connected device and press **Run**. If Android Studio does not launch, open the `android/` folder manually.

## Project structure

```text
.
├── assets/                  # Source icon and splash images
├── android/                 # Generated Capacitor Android project
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind import and theme tokens
│   │   ├── layout.tsx       # Root layout, metadata, viewport/safe areas
│   │   └── page.tsx         # Example responsive home screen
│   └── components/
│       └── platform-badge.tsx
├── capacitor.config.ts      # App ID, name, webDir
├── next.config.ts           # Static export configuration
└── package.json
```

## Configuration

Edit `capacitor.config.ts` to change your app identity:

```ts
const config: CapacitorConfig = {
  appId: "com.example.nextjscapacitor",
  appName: "Next.js Capacitor",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};
```

- `appId` must be a unique reverse-DNS identifier. Change it **before** installing the app on a device.
- `appName` is the launcher label.
- `webDir` stays `out/` to match the Next.js static export.

After changing `appId`/`appName`, rerun `npm run cap:sync`. If you changed the app ID after the Android project was created, remove `android/` and recreate it with `npm run cap:add:android` so the package name, namespace, and folder structure are regenerated.

## Static export constraints

`next.config.ts` enables:

```ts
output: "export",
trailingSlash: true,
images: { unoptimized: true },
```

Because the app runs entirely from the device, server-only Next.js features are unavailable at runtime:

- No API routes, server actions, middleware, or ISR
- No dynamic rendering or cookies/headers access
- `next/image` optimization is disabled
- Call remote APIs from client components or a separate backend

Dynamic routes can still be exported with `generateStaticParams`.

## Using Capacitor APIs

Capacitor plugins touch browser/native globals, so use them in client components and load them on the client. The included `PlatformBadge` shows the safe pattern:

```tsx
"use client";

useEffect(() => {
  import("@capacitor/core").then(({ Capacitor }) => {
    console.log(Capacitor.getPlatform());
  });
}, []);
```

Install a plugin, then sync:

```bash
npm install @capacitor/camera
npm run cap:sync
```

Some plugins require Android permissions in `android/app/src/main/AndroidManifest.xml`.

## Safe areas

The root layout sets `viewportFit: "cover"`. Use CSS environment variables for notches and system bars:

```tsx
<div className="pt-[max(1rem,env(safe-area-inset-top))]">
```

The example page already accounts for the top safe area.

## Android builds

- **Debug:** use **Run** in Android Studio, or `npm run cap:run:android` with a device connected.
- **APK output:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release:** use Android Studio's **Generate Signed Bundle / APK** flow and configure your signing key.

## Optional: iOS

iOS requires macOS with Xcode:

```bash
npm install @capacitor/ios
npm run build
npx cap add ios
npx cap open ios
npx capacitor-assets generate --ios
```

## Troubleshooting

- **Blank screen on device:** confirm `out/` exists (`npm run build`) and rerun `npm run cap:sync`. On Android, inspect the WebView via `chrome://inspect`.
- **Capacitor config not applied:** stop the app, run `npm run cap:sync`, and rebuild in Android Studio.
- **Asset generation fails:** `npm run cap:resources` is scoped to Android on purpose. Use the `--ios` flag only when an iOS project exists.
- **Gradle/Java errors:** verify Android Studio's bundled JDK is selected and the Android SDK is installed.
