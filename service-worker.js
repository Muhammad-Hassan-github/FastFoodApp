self.addEventListener("install", e => {
  console.log("Service Worker Installed");
});

self.addEventListener("fetch", function (event) {
  // No caching yet
});
