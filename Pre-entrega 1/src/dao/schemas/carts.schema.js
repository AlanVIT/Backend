import mongoose from "mongoose"

export const cartsCollection = "carts"

const cartschema = new mongoose.Schema({
  products: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
})

const cartModel = mongoose.model(cartsCollection, cartschema);
export default cartModel;