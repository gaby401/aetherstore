const products = [
  {
    id: 1,
    name: 'Telegram Bot Setup',
    price: 5,
    image: 'https://via.placeholder.com/150',
    description: 'Get your bot configured and ready to serve your users.'
  },
  {
    id: 2,
    name: 'Custom Prompt Pack',
    price: 3,
    image: 'https://via.placeholder.com/150',
    description: 'A curated set of prompts to inspire creativity.'
  },
  {
    id: 3,
    name: 'Mini App Template',
    price: 7,
    image: 'https://via.placeholder.com/150',
    description: 'Kickstart your mini app development with this template.'
  }
];

const cart = {};

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
      <h3>${product.name}</h3>
      ${product.description ? `<p>${product.description}</p>` : ''}
      <div class="price">$${product.price} USD</div>
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

async function checkout() {
  try {
    const user = Telegram?.WebApp?.initDataUnsafe?.user;
    const res = await fetch('/api/create-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, user })
    });
    const { invoiceLink } = await res.json();
    if (invoiceLink) {
      window.location.href = invoiceLink;
    } else {
      alert('Could not create invoice.');
    }
  } catch (err) {
    alert('Could not create invoice.');
  }
}

renderProducts();
renderCart();
