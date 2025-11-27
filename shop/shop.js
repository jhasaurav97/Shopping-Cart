document.addEventListener("DOMContentLoaded", () => {

  const URL = "https://fakestoreapi.com/products";

  const productsEl = document.querySelector(".product-grid");
  const searchInput = document.getElementById("search-products");
  const categoryBtns = document.querySelectorAll(".filter-btn");
  const ratingRange = document.querySelector("#ratingRange");
  const priceCheckboxes = document.querySelectorAll(".price-filter input[type='checkbox']");
  const colorCheckboxes = document.querySelectorAll(".color-filter input[type='checkbox']");
  const sizeCheckboxes = document.querySelectorAll(".size-filter input[type='checkbox']");
  const applyBtn = document.querySelector(".apply-btn");

  let allProducts = [];
  let filteredProducts = [];

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../auth/login.html";
    return;
  }

  // 1. Fetch data + add random color & size attributes
  async function getData() {
    const res = await fetch(URL);
    const data = await res.json();

    const colors = ["red", "blue", "black", "white", "green"];
    const sizes = ["S", "M", "L", "XL"];

    allProducts = data.map(p => ({
      ...p,
      colors: getRandom(colors, 2),
      sizes: getRandom(sizes, 2)
    }));

    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
  }

  function getRandom(arr, count) {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
  }
  
  // 2. Render Products
  function renderProducts(products) {
    if (products.length === 0) {
      productsEl.innerHTML = `<p class="empty-msg">No products found</p>`;
      return;
    }

    productsEl.innerHTML = products
      .map(
        (p) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.title}" />

          <div class="desc">
            <div class="tags">
              <p class="price">$${p.price}</p>
              <p>${p.sizes.join(", ")}</p>
            </div>

            <p>Colors: ${p.colors
            .map(c => `<span class="dot ${c}"></span>`)
            .join("")}
            </p>

            <p>Rating: ${getStars(p.rating.rate)}</p>

            <button class="cart-btn" data-id="${p.id}">
              Add To Cart
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      "★".repeat(full) +
      (half ? "☆" : "") +
      "✩".repeat(empty)
    );
  }

  // 3. Add To Cart
  productsEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cart-btn")) return;

    const id = Number(e.target.dataset.id);
    const product = allProducts.find((p) => p.id === id);

    let carts = JSON.parse(localStorage.getItem("carts")) || [];

    if (carts.some((item) => item.id === id)) {
      alert("Product already in cart");
      return;
    }

    carts.push(product);
    localStorage.setItem("carts", JSON.stringify(carts));

    alert(`${product.title} added to cart!`);
  });

  // 4. Search Filter
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    filteredProducts = allProducts.filter(p =>
      p.title.toLowerCase().includes(value) ||
      p.category.toLowerCase().includes(value)
    );

    renderProducts(filteredProducts);
  });

  // 5. Category Filter
  const categoryMap = {
    Mens: "men's clothing",
    Womens: "women's clothing",
    Jewellery: "jewelery",
    Electronics: "electronics"
  };

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      const cat = e.target.textContent.trim();

      if (cat === "All") {
        filteredProducts = [...allProducts];
      } else {
        filteredProducts = allProducts.filter(
          (p) => p.category === categoryMap[cat]
        );
      }

      renderProducts(filteredProducts);
    });
  });

  // 6. Apply Filters (Rating, Price, Color, Size)
  applyBtn.addEventListener("click", () => {
    let temp = [...allProducts];

    // Rating filter
    const minRating = Number(ratingRange.value);
    temp = temp.filter((p) => p.rating.rate >= minRating);

    // Price filter
    const selectedPriceRanges = [...priceCheckboxes]
      .filter((i) => i.checked)
      .map((i) => i.value);

    if (selectedPriceRanges.length > 0) {
      temp = temp.filter((p) => {
        return selectedPriceRanges.some((range) => {
          if (range === "0-25") return p.price >= 0 && p.price <= 25;
          if (range === "25-50") return p.price >= 25 && p.price <= 50;
          if (range === "50-75") return p.price >= 50 && p.price <= 75;
          if (range === "75-100") return p.price >= 75 && p.price <= 100;
          if (range === "100+") return p.price > 100;
        });
      });
    }

    // Color filter (Bonus)
    const selectedColors = [...colorCheckboxes]
      .filter((i) => i.checked)
      .map((i) => i.value);

    if (selectedColors.length > 0) {
      temp = temp.filter(p =>
        p.colors.some(c => selectedColors.includes(c))
      );
    }

    // Size filter (Bonus)
    const selectedSizes = [...sizeCheckboxes]
      .filter((i) => i.checked)
      .map((i) => i.value);

    if (selectedSizes.length > 0) {
      temp = temp.filter(p =>
        p.sizes.some(s => selectedSizes.includes(s))
      );
    }

    filteredProducts = temp;
    renderProducts(filteredProducts);
  });

  // Init
  getData();

});
