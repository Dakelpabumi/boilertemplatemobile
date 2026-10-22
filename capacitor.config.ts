import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.nextjscapacitor",
  appName: "Next.js Capacitor",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
