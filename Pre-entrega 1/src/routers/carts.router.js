import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { cartManager } from "../dao/managers/carts.js";

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

let carts = readCartsFromFile();
const cartM = new cartManager();

router.get('/', async(req, res) => {
  const carts = await cartM.getCarts()
  res.send(carts)
});

router.get('/:id', async(req, res) => {
  const cart = await cartM.getCartsId(req.params.id)
  res.send(cart)
});

router.post('/', async(req, res) => {
  const carts = await cartM.getCarts()
  cartM.newCart(req.body)
  res.send(carts)
});

router.post('/:cid/product/:pid', async(req, res) => {
  const carts = await cartM.getCarts()
  cartM.cartPrd(res,req,carts)
  res.send(carts)
});

export default router;