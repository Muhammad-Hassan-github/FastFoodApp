const items = [
  { name: "Burger", price: 300, image: "itemimages/burger.jpg" },
  { name: "Shawarma", price: 250, image: "itemimages/shawarma.jpg" },
  { name: "Zinger", price: 350, image: "itemimages/zinger.jpg" },
  { name: "Fries", price: 150, image: "itemimages/fries.jpg" },
  { name: "Burger", price: 300, image: "itemimages/burger.jpg" },
  { name: "Shawarma", price: 250, image: "itemimages/shawarma.jpg" },
  { name: "Zinger", price: 350, image: "itemimages/zinger.jpg" },
  { name: "Fries", price: 150, image: "itemimages/fries.jpg" },
];

const phone = "923137164393"; // WhatsApp number (no + or 0 at start)

const itemsDiv = document.getElementById("items");
const totalPriceSpan = document.getElementById("totalPrice");

// Track quantities in an array
const quantities = Array(items.length).fill(0);

function renderItems() {
  itemsDiv.innerHTML = "";
  items.forEach((item, index) => {
    const html = `
      <div class="item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>Rs ${item.price}</p>
          <div class="qty-controls">
            <button class="btn-remove" data-index="${index}">-</button>
            <span id="qty-${index}">0</span>
            <button class="btn-add" data-index="${index}">+</button>
          </div>
        </div>
      </div>
    `;
    itemsDiv.innerHTML += html;
  });
}

function updateTotal() {
  let total = 0;
  quantities.forEach((qty, i) => {
    total += qty * items[i].price;
  });
  totalPriceSpan.innerText = "Rs " + total;
}

function updateQtyDisplay(index) {
  document.getElementById(`qty-${index}`).innerText = quantities[index];
}

itemsDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    const index = parseInt(e.target.dataset.index);
    quantities[index]++;
    updateQtyDisplay(index);
    updateTotal();
  }
  if (e.target.classList.contains("btn-remove")) {
    const index = parseInt(e.target.dataset.index);
    if (quantities[index] > 0) {
      quantities[index]--;
      updateQtyDisplay(index);
      updateTotal();
    }
  }
});

function generateOrderMessage() {
  let message = "📦 *New Fast Food Order:*\n\n";
  let hasItem = false;
  quantities.forEach((qty, index) => {
    if (qty > 0) {
      hasItem = true;
      message += `🍽 ${items[index].name} x ${qty} = Rs ${qty * items[index].price}\n`;
    }
  });

  let totalText = totalPriceSpan.innerText;
  message += `\n💰 *Total:* ${totalText}`;

  return hasItem ? message : null;
}

document.getElementById("orderBtn").addEventListener("click", () => {
  const msg = generateOrderMessage();
  if (msg) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  } else {
    alert("Please select at least one item to order.");
  }
});

renderItems();
updateTotal();
