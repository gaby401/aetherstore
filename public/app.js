const products = [
  {
    id: 1,
    name: 'Telegram Bot Setup',
    price: 5,
    image: 'https://via.placeholder.com/240x160?text=Bot'
  },
  {
    id: 2,
    name: 'Custom Prompt Pack',
    price: 3,
    image: 'https://via.placeholder.com/240x160?text=Prompts'
  },
  {
    id: 3,
    name: 'Mini App Template',
    price: 7,
    image: 'https://via.placeholder.com/240x160?text=Template'
  }
];

const cart = [];

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">\$${product.price} USD</div>
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
