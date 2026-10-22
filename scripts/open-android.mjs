#!/usr/bin/env node
/**
 * Opens the Android project in Android Studio.
 *
 * Capacitor only checks the CAPACITOR_ANDROID_STUDIO_PATH env var or its
 * hard-coded /usr/local/android-studio path on Linux, which does not match
 * every distro (Omarchy/Arch installs to /usr/share). Point it at the first
 * launcher that actually exists so no shell configuration is required.
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const candidates = [
  process.env.CAPACITOR_ANDROID_STUDIO_PATH,
  "/usr/local/android-studio/bin/studio.sh",
  "/usr/local/android-studio/bin/studio",
  "/usr/share/android-studio/bin/studio.sh",
  "/opt/android-studio/bin/studio.sh",
  "C:\\Program Files\\Android\\Android Studio\\bin\\studio64.exe",
];

const studioPath = candidates.find((candidate) => candidate && existsSync(candidate));

const env = { ...process.env };
if (studioPath) {
  env.CAPACITOR_ANDROID_STUDIO_PATH = studioPath;
}

const isWindows = process.platform === "win32";
const result = spawnSync(isWindows ? "cap.cmd" : "cap", ["open", "android"], {
  env,
  stdio: "inherit",
  shell: isWindows,
});

process.exit(result.status ?? 1);
