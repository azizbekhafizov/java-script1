document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");
    const clearCartBtn = document.getElementById("clear-cart");
    const emptyMsg = document.querySelector(".empty-msg");
    const TAX_RATE = 0.1;
  
    let cart = getCart();
  
    function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }
  
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function renderCart() {
      cartItemsContainer.innerHTML = "";
      emptyMsg.style.display = cart.length === 0 ? "block" : "none";
  
      cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <img src="${item.thumbnail}" alt="${item.title}">
          <div class="item-details">
            <h3>${item.title}</h3>
            <p><span class="price">$${item.price.toFixed(2)}</span> each</p>
            <div class="quantity-controls">
              <button class="decrease">-</button>
              <span>${item.quantity}</span>
              <button class="increase">+</button>
              <button class="remove">Remove</button>
            </div>
            <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        `;
  
        itemDiv.querySelector(".increase").onclick = () => {
          item.quantity++;
          updateCart();
        };
  
        itemDiv.querySelector(".decrease").onclick = () => {
          if (item.quantity > 1) item.quantity--;
          updateCart();
        };
  
        itemDiv.querySelector(".remove").onclick = () => {
          cart = cart.filter(i => i.id !== item.id);
          updateCart();
        };
  
        cartItemsContainer.appendChild(itemDiv);
      });
  
      updateTotals();
    }
  
    function updateTotals() {
      const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const total = subtotal + tax;
  
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      taxEl.textContent = `$${tax.toFixed(2)}`;
      totalEl.textContent = `$${total.toFixed(2)}`;
    }
  
    function updateCart() {
      saveCart();
      renderCart();
    }
  
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      localStorage.removeItem("cart");
      renderCart();
    });
  
    renderCart();
  });
  