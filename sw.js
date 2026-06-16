// AI OMR Evaluator - Service Worker for PWA
const CACHE_NAME = 'omr-evaluator-v3';

// প্রথমবার install-এ এই ফাইলগুলো cache হবে
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './omr-evaluator.html',
  './script.js',
  './style.css',
  './style1.css',
  './manifest.json',
  './question/file-list.js',
  './question/number_system_set01.js',
  './question/number_system_set2.js',
  './question/percentage_math_set1.js',
  './question/KPC_full_mock_test_1.js',
  './question/KPC full mock test 2.js',
  './question/kolkata_full_mock1.js',
  './question/27_11_2025_shift_2.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Anthropic API — সবসময় network, কখনো cache না
  if (url.includes('api.anthropic.com')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({
          error: { message: 'অফলাইন: AI স্ক্যান কাজ করবে না। ম্যানুয়ালি বাবল সিলেক্ট করুন।' }
        }), { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // বাকি সব: cache-first, তারপর network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // নতুন ফাইল এলে cache-এ রাখো
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      // সম্পূর্ণ অফলাইন হলে HTML fallback
      if (event.request.destination === 'document') {
        return caches.match('./index.html');
      }
    })
  );
});
