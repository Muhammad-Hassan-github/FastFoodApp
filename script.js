const items = [
  { name: "Burger", price: 0 },
  { name: "Pizza", price: 0 },
  { name: "Fries", price: 0 },
  { name: "Zinger", price: 0 },
];

const menuDiv = document.getElementById("menu");
const cart = {};

items.forEach(item => {
  cart[item.name] = 0;

  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <span>${item.name} - Rs.${item.price}</span>
    <div class="qty">
      <button onclick="updateQty('${item.name}', -1)">-</button>
      <span id="${item.name}-qty">0</span>
      <button onclick="updateQty('${item.name}', 1)">+</button>
    </div>
  `;

  menuDiv.appendChild(div);
});

function updateQty(name, change) {
  cart[name] = Math.max(0, cart[name] + change);
  document.getElementById(`${name}-qty`).innerText = cart[name];
}

function sendOrder() {
  let message = "Hi, I want to order:\n";
  let total = 0;
  items.forEach(item => {
    if (cart[item.name] > 0) {
      message += `- ${cart[item.name]} x ${item.name} = Rs.${cart[item.name] * item.price}\n`;
      total += cart[item.name] * item.price;
    }
  });

  if (total === 0) {
    alert("Please select at least one item.");
    return;
  }

  message += `\nTotal: Rs.${total}`;

  const phone = "923137164393"; // 🔁 Shopkeeper's number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ✅ Proper service worker registration with update + reload
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      registration.update();

      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Auto-refresh when update is ready
              window.location.reload();
            }
          }
        };
      };
    }).catch(error => {
      console.error('Service worker registration failed:', error);
    });
  });
}
