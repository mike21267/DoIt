const CACHE = 'doit-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'DoIt.', body: 'You have a reminder!' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icon.png',
      badge: './icon.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'doit',
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow('/')
  );
});