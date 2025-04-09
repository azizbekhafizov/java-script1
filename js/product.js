document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  fetch('https://dummyjson.com/products?limit=12')
    .then(res => res.json())
    .then(data => {
      const wrapper = document.querySelector('.products-wrapper');

      data.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <h4>${product.description.slice(0, 50)}</h4>
          <p>$${product.price}</p>
          <button>Add to Cart</button>
        `;

        card.querySelector('button').onclick = () => {
          addToCart(product);
          updateCartCount();
        };

        wrapper.appendChild(card);
      });
    });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find(i => i.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;
}
