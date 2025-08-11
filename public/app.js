const products = [
  { id: 1, name: 'Telegram Bot Setup', price: 5 },
  { id: 2, name: 'Custom Prompt Pack', price: 3 },
  { id: 3, name: 'Mini App Template', price: 7 }
];

const cart = {};

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <div class="price">\$${product.price} USD</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  if (cart[id]) {
    cart[id] += 1;
  } else {
    cart[id] = 1;
  }
  renderCart();
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id] -= 1;
    if (cart[id] <= 0) {
      delete cart[id];
    }
    renderCart();
  }
}

function renderCart() {
  const ul = document.getElementById('cart');
  ul.innerHTML = '';
  let total = 0;

  Object.keys(cart).forEach(id => {
    const item = products.find(p => p.id === Number(id));
    const quantity = cart[id];
    const itemTotal = item.price * quantity;
    total += itemTotal;

    const li = document.createElement('li');
    li.textContent = `${item.name} x${quantity} — \$${itemTotal.toFixed(2)} `;

    const btn = document.createElement('button');
    btn.textContent = 'Remove';
    btn.onclick = () => removeFromCart(item.id);
    li.appendChild(btn);

    ul.appendChild(li);
  });

  const totalEl = document.getElementById('cart-total');
  totalEl.textContent = `Total: \$${total.toFixed(2)}`;
}

function checkout() {
  alert('Checkout will open Telegram Payments next. 👍');
}

renderProducts();
renderCart();
