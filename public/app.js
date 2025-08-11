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

const cart = [];

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
