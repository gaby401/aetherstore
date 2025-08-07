const tg = window.Telegram.WebApp;

const products = [
  { id: 1, name: "Wireless Headphones", price: 199, image: "https://i.imgur.com/m48skT7.jpeg", description: "High-quality wireless headphones with noise cancellation." },
  { id: 2, name: "Smartwatch", price: 129, image: "https://i.imgur.com/E322nqy.jpeg", description: "Track fitness and receive notifications on the go." },
  { id: 3, name: "Portable Speaker", price: 89, image: "https://i.imgur.com/d3b66n4.jpeg", description: "Compact, powerful sound for any adventure." },
  { id: 4, name: "VR Headset", price: 349, image: "https://i.imgur.com/9C3I0r9.jpeg", description: "Immerse yourself in virtual worlds with stunning clarity." }
];

let cart = [];

function createProductGrid() {
  document.body.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  document.body.style.backgroundColor = tg.themeParams.bg_color || "#121212";
  document.body.style.color = tg.themeParams.text_color || "white";

  const container = document.createElement('div');
  container.id = "products";
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
  container.style.gap = "1em";
  container.style.padding = "1em";

  products.forEach(p => {
    const card = document.createElement("div");
    card.style.background = tg.themeParams.secondary_bg_color || "#1f1f1f";
    card.style.borderRadius = "12px";
    card.style.overflow = "hidden";
    card.style.display = "flex";
    card.style.flexDirection = "column";

    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'relative';
    imgContainer.style.paddingTop = '60%';
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = 'cover';
    imgContainer.appendChild(img);

    const content = document.createElement('div');
    content.style.padding = '1em';
    content.style.flexGrow = '1';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';

    const title = document.createElement("h2");
    title.textContent = p.name;
    title.style.margin = "0 0 0.5em";

    const desc = document.createElement("p");
    desc.textContent = p.description;
    desc.style.color = tg.themeParams.hint_color || "#aaa";
    desc.style.flexGrow = '1';
    desc.style.margin = '0 0 1em';

    const footer = document.createElement("div");
    footer.style.display = "flex";
    footer.style.justifyContent = "space-between";
    footer.style.alignItems = "center";
    footer.style.marginTop = 'auto';

    const price = document.createElement("span");
    price.textContent = `₪${p.price}`;
    price.style.fontWeight = "bold";
    price.style.fontSize = '1.2em';

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.style.padding = "10px 15px";
    btn.style.border = 'none';
    btn.style.borderRadius = "8px";
    btn.style.cursor = 'pointer';
    btn.style.background = tg.themeParams.button_color || "#0088cc";
    btn.style.color = tg.themeParams.button_text_color || "white";
    btn.onclick = () => addToCart(p.id);

    footer.appendChild(price);
    footer.appendChild(btn);
    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(footer);
    card.appendChild(imgContainer);
    card.appendChild(content);
    container.appendChild(card);
  });

  document.body.appendChild(container);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateMainButton();
    tg.HapticFeedback.notificationOccurred('success');
  }
}

function updateMainButton() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cart.length > 0) {
    tg.MainButton.setText(`View Cart (${cart.length}) - Total ₪${total}`);
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
}

tg.onEvent('mainButtonClicked', () => {
  const checkoutData = { cart: cart, user: tg.initDataUnsafe.user };
  tg.MainButton.showProgress();

  fetch('/api/create-invoice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkoutData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.invoiceLink) {
      tg.openInvoice(data.invoiceLink, (status) => {
        if (status === 'paid') {
          tg.showPopup({ title: "Success!", message: "Thank you for your purchase!" });
          cart = [];
          updateMainButton();
          tg.close();
        } else if (status === 'failed') {
          tg.showPopup({ title: "Payment Failed", message: "Something went wrong. Please try again." });
        }
      });
    } else {
      tg.showPopup({ title: "Error", message: data.error || "Could not create invoice." });
    }
  })
  .catch(error => {
      console.error('Fetch Error:', error);
      tg.showPopup({ title: "Network Error", message: "Unable to connect to the server." });
  })
  .finally(() => tg.MainButton.hideProgress());
});

function initialize() {
  tg.expand();
  tg.MainButton.textColor = "#FFFFFF";
  tg.MainButton.color = "#0088cc";
  createProductGrid();
}

initialize();