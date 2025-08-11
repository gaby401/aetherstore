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

function checkout() {
  alert('Checkout will open Telegram Payments next. 👍');
}

renderProducts();
renderCart();
