document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".product-grid");
  const checkoutContainer = document.querySelector(".checkout-container");
  const totalPriceEl = document.querySelector(".priceTotal");
  const checkoutBtn = document.getElementById("rzp-button");

  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../auth/login.html";
  }

  let cartItems = loadCart();
  renderCart();

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem("carts")) || [];
    } catch (error) {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem("carts", JSON.stringify(cartItems));
  }

  function calculateTotal() {
    return Math.round(
      cartItems.reduce((sum, item) => sum + item.price, 0)
    );
  }

  function renderEmptyState() {
    cartContainer.innerHTML = `<p class="empty-msg">Your cart is empty</p>`;
    checkoutContainer.innerHTML = "";
    totalPriceEl.innerHTML = `
    <p class="total-price">
      <span>Total</span>
      <span>$0.00</span>
    </p>
    `;
    checkoutBtn.disabled = true;
  }

  function renderCart() {
    if (cartItems.length === 0) {
      renderEmptyState();
      return;
    }

    checkoutBtn.disabled = false;

    cartContainer.innerHTML = cartItems
      .map(
        (item) => `
        <div class="product-card" id="product-${item.id}">
        <img src="${item.image}" alt="${item.title}" />
        <div class="desc">
          <p class="title"><span>Title</span>: ${item.title}</p>
          <p class="price"><span>Price</span>: $${item.price}</p>
          <button class="cart-btn remove-btn" data-id="${item.id}">
            Remove From Cart
          </button>
        </div>
      </div>
      `
      ).join("");

    checkoutContainer.innerHTML = cartItems
      .map(
        (item) => `
        <div class="products-details">
        <p class="items">
          <span>${item.title}</span>
          <span>$${item.price}</span>
        </p>
      </div>
        `
      ).join("");

    totalPriceEl.innerHTML = `
    <p class="total-price">
      <span>Total</span>
      <span>$${calculateTotal()}</span>
    </p>
  `;
  }

  function removeItem(id) {
    cartItems = cartItems.filter((item) => item.id !== id);
    saveCart();
    renderCart();
  }

  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = Number(e.target.dataset.id);
      removeItem(id);
    }
  });

  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (typeof Razorpay === "undefined") {
      alert("Payment service unavailable. Please try again later.");
      return;
    }

    const totalAmount = calculateTotal() * 100;

    const options = {
      key: "rzp_test_RevjdQpij2bKHm",
      amount: totalAmount,
      currency: "INR",
      name: "My Shop",
      description: "Thank you for shopping!",
      handler: function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);

        cartItems = [];
        saveCart();
        renderCart();
      },
      theme: { color: "#111" }
    };

    new Razorpay(options).open();
  });

});