import { PlatformBadge } from "@/components/platform-badge";

const workflow = [
  {
    step: "01",
    title: "Develop in the browser",
    description:
      "Use the Next.js dev server with fast refresh. Everything is a normal web app until you need a native API.",
    command: "npm run dev",
  },
  {
    step: "02",
    title: "Build and sync",
    description:
      "Export the app to out/ and copy the web bundle plus native plugins into the Android project.",
    command: "npm run cap:sync",
  },
  {
    step: "03",
    title: "Generate app icons",
    description:
      "Drop a 1024x1024 icon and a 2732x2732 splash into assets/, then let Capacitor Assets build every density.",
    command: "npm run cap:resources",
  },
  {
    step: "04",
    title: "Open Android Studio",
    description:
      "Sync one more time, launch the native project, and run it on an emulator or a physical device.",
    command: "npm run cap:android",
  },
];

const stack = [
  { label: "Framework", value: "Next.js 16" },
  { label: "Styling", value: "Tailwind CSS 4" },
  { label: "Native", value: "Capacitor 8" },
  { label: "Output", value: "Static export" },
];

function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-9">
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        fill="#111214"
        stroke="#313237"
      />
      <path d="M18.6 5 8.4 18.2h6.1l-2.1 8.8 10.2-13.2h-6.1L18.6 5Z" fill="#c8f751" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="pointer-events-none absolute -top-64 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mark />
            <div className="leading-tight">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Boilerplate
              </p>
              <p className="text-sm font-medium">Next.js + Capacitor</p>
            </div>
          </div>
          <PlatformBadge />
        </header>

        <main>
          <section className="grid items-center gap-12 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                <span className="size-1.5 rounded-full bg-accent" />
                Web speed. Native shell.
              </p>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Ship your Next.js app
                <span className="text-accent"> inside Android.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                A lean starter for the App Router, Tailwind CSS 4, and
                Capacitor 8. Static export keeps the web bundle fast, while
                Capacitor gives it a real native project and device APIs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#workflow"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-ink transition hover:bg-paper"
                >
                  View the workflow
                </a>
                <code className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-ink-soft px-5 font-mono text-xs text-muted">
                  <span className="text-accent">$</span>
                  npm run cap:android
                </code>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-line to-transparent opacity-70" />
              <div className="relative rounded-3xl border border-line bg-ink-soft/80 p-6 backdrop-blur sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Project status
                  </p>
                  <span className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-line" />
                    <span className="size-2 rounded-full bg-line" />
                    <span className="size-2 rounded-full bg-accent" />
                  </span>
                </div>

                <dl className="mt-6 divide-y divide-line">
                  {stack.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <dt className="text-muted">{item.label}</dt>
                      <dd className="font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 rounded-2xl border border-line bg-ink p-4 font-mono text-xs leading-6 text-muted">
                  <p>
                    <span className="text-accent">$</span> npm run build
                  </p>
                  <p className="text-paper">✓ exported to out/</p>
                  <p>
                    <span className="text-accent">$</span> npx cap sync android
                  </p>
                  <p className="text-paper">✓ native project updated</p>
                </div>
              </div>
            </div>
          </section>

          <section id="workflow" className="scroll-mt-8 border-t border-line pt-16">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Workflow
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  Four commands, one loop.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted">
                Web changes stay in the browser. Native changes go through a
                build, sync, and Android Studio.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {workflow.map((item) => (
                <article
                  key={item.step}
                  className="group rounded-2xl border border-line bg-ink-soft/60 p-6 transition hover:border-accent/40 hover:bg-ink-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
                      {item.step}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted opacity-0 transition group-hover:opacity-100">
                      ready
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                  <code className="mt-5 block rounded-lg border border-line bg-ink px-3 py-2 font-mono text-xs text-paper">
                    {item.command}
                  </code>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-20 grid gap-4 border-t border-line pt-16 lg:grid-cols-3">
            <article className="rounded-2xl border border-line bg-ink-soft/60 p-6 lg:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Static export
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">
                No server at runtime.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                The whole app is exported to <code className="text-paper">out/</code>{" "}
                and loaded from the device. API routes, server actions, and
                dynamic rendering are intentionally out of scope. Talk to the
                network from client components, or point at a separate API.
              </p>
              <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-ink p-4 font-mono text-xs leading-6 text-muted">
                <code>{`// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};`}</code>
              </pre>
            </article>

            <article className="rounded-2xl border border-line bg-ink-soft/60 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Native APIs
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">
                Load plugins on the client.
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Import Capacitor only inside client components. Dynamic imports
                keep native-only code out of the server render.
              </p>
              <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-ink p-4 font-mono text-xs leading-6 text-muted">
                <code>{`"use client";

const { Capacitor } =
  await import("@capacitor/core");

Capacitor.getPlatform();`}</code>
              </pre>
            </article>
          </section>
        </main>

        <footer className="mt-20 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Set your app identity in{" "}
            <code className="text-paper">capacitor.config.ts</code>.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">
            Next.js / Tailwind / Capacitor
          </p>
        </footer>
      </div>
    </div>
  );
}
