import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CARTS_FILE = path.join(__dirname, "../carts.json");


function readCartsFromFile() {
  try {
    const data = fs.readFileSync(CARTS_FILE);
    if (data.length === 0) {
      return [];
    }
    const dataJSON = JSON.parse(data);
    return dataJSON;
  } catch (err) {
    console.error("Error reading carts file:", err);
    return [];
  }
}

function writeCartsToFile(carts) {
  try {
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
  } catch (err) {
    console.error("Error writing carts file:", err);
  }
}

let carts = readCartsFromFile();

router.get('/', (req, res) => {
  res.send(JSON.stringify(carts));
});

router.get('/:id', (req, res) => {
  const cartId = parseInt(req.params.id);
  const cart = carts.find(e => e.id === cartId);

  if (!cart) {
    return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
  }

  res.send(JSON.stringify(cart.products));
});

router.post('/', (req, res) => {
  const cart = req.body;

  const requiredFields = ['products', 'quantity'];
  const missingFields = requiredFields.filter(field => !cart[field]);

  if (missingFields.length > 0) {
    return res.status(400).send({ status: 'error', message: 'Faltan campos requeridos', missingFields });
  } else {
    cart.id = Math.round(Math.random() * 10000);
    carts.push(cart);
    writeCartsToFile(carts);
    res.send({ status: "success" });
  }

  if (typeof cart.status === 'undefined') {
    cart.status = true;
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = req.params.pid;

  const cart = carts.find(e => e.id === cartId);
  if (parseFloat(cartId) != cartId || parseFloat(productId) != productId) {
    return res.status(400).send({ status: 'error', message: 'Los IDs deben ser números' });
  }
  if (!cart) {
    return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
  }

  if (!cart.products) {
    cart.products = [];
  }

  cart.products.push(parseInt(productId));

  writeCartsToFile(carts);
  res.send({ status: 'success' });
});

export default router;