/**
 * Legacy CRA service worker decommissioner (2023).
 *
 * Retained indefinitely at its original URL so returning
 * users with pre-Vite service worker registrations can
 * unregister them and load the current application.
 *
 * The active PWA service worker is generated at /sw.js.
 * Do not delete, rename, or precache this file.
 */

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    await self.registration.unregister();

    const clients = await self.clients.matchAll({
      type: "window",
    });

    await Promise.all(
      clients.map(client => client.navigate(client.url))
    );
  })());
});
