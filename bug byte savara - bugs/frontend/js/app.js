const API = "http://localhost:5000";

/* LOGIN */
async function userLogin() {
  const res = await fetch(API + "/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success === true) {
    localStorage.setItem("user", "true"); // PERSISTENCE
    window.location.href = "home.html";
  } else {
    alert("Login failed");
  }
}

function checkUser() {
  if (!localStorage.getItem("user")) {
    window.location.href = "login.html";
  }
}

/* REGISTER */
async function register() {
  await fetch(API + "/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  window.location.href = "login.html";
}

/* PRODUCTS */
async function loadProducts() {
  const res = await fetch(API + "/api/products"); // FIX: was /api/product
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>  <!-- FIX: was p.price * 2 -->
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Cart</button>
      </div>
    `;
  });
}

/* CART */
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cartItems", JSON.stringify(cart)); // FIX: was "cart", must match "cartItems"
}

/* ORDER */
async function placeOrder() {
  const items = JSON.parse(localStorage.getItem("cartItems")) || []; // FIX: use cartItems, not buyNowItem

  await fetch(API + "/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      name: name.value,
      card: card.value
    })
  });

  localStorage.removeItem("cartItems");
  alert("Order placed!");
}

/* ADMIN */
function checkAdmin() {
  if (!localStorage.getItem("admin")) {
    window.location.href = "../admin/login.html";
  }
}

async function adminLogin() {
  const res = await fetch(API + "/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("admin", "true");
    window.location.href = "dashboard.html";
  }
}