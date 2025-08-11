const products = [
  { id: 1, name: 'Telegram Bot Setup', price: 5 },
  { id: 2, name: 'Custom Prompt Pack', price: 3 },
  { id: 3, name: 'Mini App Template', price: 7 }
];

const cart = [];

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <div class="price">\$${product.price} USD</div>
      <button type="button" aria-label="Add ${product.name} to cart" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  renderCart();
}

function renderCart() {
  const ul = document.getElementById('cart');
  ul.innerHTML = '';
  cart.forEach(i => {
    const li = document.createElement('li');
    li.textContent = `${i.name} — \$${i.price}`;
    ul.appendChild(li);
  });
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
