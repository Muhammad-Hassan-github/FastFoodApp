// Version: v2 - force update due to phone number change
self.addEventListener("install", e => {
  console.log("Service Worker Installed - v2");
});

self.addEventListener("activate", e => {
  console.log("Service Worker Activated");
});

self.addEventListener("fetch", function (event) {
  // No caching yet
});


