import mongoose from "mongoose"

export const productsCollection = "products"

const productschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
})

const productModel = mongoose.model(productsCollection, productschema);
export default productModel;