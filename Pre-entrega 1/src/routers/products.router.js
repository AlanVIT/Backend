import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ProductManager  from "../dao/managers/products.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_FILE = path.join(__dirname, "../products.json");


function readProductsFromFile() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE);
    let dataJSON = JSON.parse(data)
    return dataJSON;
  } catch (err) {
    console.error("Error reading products file:", err);
    return [];
  }
}

let prds = readProductsFromFile();

const productM = new ProductManager();

router.get('/', async (req, res) => {
  const products = await productM.getPrds()
  res.send(products)
});

router.get('/:id', (req, res) => {

  productM.getPrdsId(req.params.id)

});

router.delete('/:id', (req, res) => {
  productM.deletePrds(req.params.id)
});

router.put('/:id', (req, res) => {
  productM.upgradePrd(req)

});

router.post('/', (req, res) => {
  productM.newPrd(req.body)
});

export default router;