import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

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

function writeProductsToFile(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error("Error writing products file:", err);
  }
}

let prds = readProductsFromFile();

router.get('/', (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  let responseProducts = limit ? prds.slice(0, limit) : prds;
  res.send(JSON.stringify(responseProducts));
});

router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = prds.find(e => e.id === productId);

  if (!product) {
    return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
  }

  res.send(JSON.stringify(product));
});

router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = prds.find(e => e.id === productId);

  if (!product) {
    return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
  }

  const index = prds.findIndex(product => product.id === productId);
  prds.splice(index, 1);
  writeProductsToFile(prds);
  res.send(JSON.stringify(index));
});

router.put('/:id', (req, res) => {
  const change = req.body;
  const product = prds.find(product => product.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
  }

  for (let key in change) {
    if (product.hasOwnProperty(key)) {
      product[key] = change[key];
    }
  }

  writeProductsToFile(prds);
  res.send({ status: 'success', product: product });
});

router.post('/', (req, res) => {
  const prd = req.body;

  const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
  const missingFields = requiredFields.filter(field => !prd[field]);

  if (missingFields.length > 0) {
    return res.status(400).send({ status: 'error', message: 'Faltan campos requeridos', missingFields });
  } else {
    prd.id = Math.round(Math.random() * 10000);
    prds.push(prd);
    writeProductsToFile(prds);
    res.send({ status: "success" });
  }

  if (typeof prd.status === 'undefined') {
    prd.status = true;
  }
});

export default router;