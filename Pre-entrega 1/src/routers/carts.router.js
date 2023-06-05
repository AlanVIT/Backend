import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { cartManager } from "../managers/carts.js";

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

router.get('/', (req, res) => {
  cartM.getCarts(res, carts)
});

router.get('/:id', (req, res) => {
  cartM.getCartsId(res,req,carts)
});

router.post('/', (req, res) => {
  cartM.newCart(res,req,carts)
});

router.post('/:cid/product/:pid', (req, res) => {
  cartM.cartPrd(res,req,carts)
});

export default router;