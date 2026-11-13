const CACHE_NAME = 'daily-motivation-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// نصب و ذخیره فایل‌ها در حافظه کش
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// فعال سازی
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// دریافت فایل‌ها از کش وقتی اینترنت قطع است
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
