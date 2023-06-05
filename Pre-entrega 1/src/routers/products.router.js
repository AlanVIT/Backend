import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { ProductManager } from "../managers/products.js";

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

router.get('/', (req, res) => {
  productM.getPrds(res, req, prds)
});

router.get('/:id', (req, res) => {

  productM.getPrdsId(res, req, prds)

});

router.delete('/:id', (req, res) => {
  productM.deletePrds(res, req, prds)
});

router.put('/:id', (req, res) => {
  productM.upgradePrd(res, req, prds)

});

router.post('/', (req, res) => {
  productM.newPrd(res, req, prds)
});

export default router;