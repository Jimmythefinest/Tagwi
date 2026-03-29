const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let USERS = [{ username: "user", password: "1234" }];
const ADMIN = { username: "admin", password: "1234" };

let products = [
  { id: 1, name: "MacBook Pro", price: 150000 },
  { id: 2, name: "iPhone", price: 80000 },
  { id: 3, name: "AirPods", price: 20000 }
];

let orders = [];

/* REGISTER */
app.post("/api/user/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ success: false }); // FIX: also check password
  USERS.push({ username, password });
  res.json({ success: true });
});

/* LOGIN */
app.post("/api/user/login", (req, res) => {
  const user = USERS.find(
    u => u.username === req.body.username &&
      u.password === req.body.password
  );
  res.json({ success: !!user }); // FIX: return boolean, not the user object
});

/* ADMIN */
app.post("/api/admin/login", (req, res) => {
  // FIX: check both username AND password
  res.json({
    success: req.body.username === ADMIN.username &&
      req.body.password === ADMIN.password
  });
});

/* PRODUCTS */
app.get("/api/products", (req, res) => res.json(products));

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.json({ success: false }); // FIX: validate fields
  products.push({ id: Date.now(), name, price });
  res.json({ success: true });
});

app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});

/* ORDERS */
app.post("/api/orders", (req, res) => {
  const { items, name, card } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) { // FIX: validate items
    return res.json({ success: false });
  }
  orders.push({ items, name, card });
  res.json({ success: true });
});

app.get("/api/orders", (req, res) => res.json(orders));

app.listen(5000, () => console.log("Server running on 5000"));