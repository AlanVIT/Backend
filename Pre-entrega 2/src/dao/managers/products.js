import productModel from "../schemas/products.schema.js";

export default class ProductManager {

  constructor(){
    this.productModel = productModel;

  }
    
    getPrds = async () => {    
        const products = await this.productModel.find();
        return products;
    }

    getPrdsId = async (id) =>{
      try {
        const ProductData = await this.productModel.findOne({ _id: id });  
        return ProductData;
      } catch (error) {
        console.log(error);
      }
    }
    
    deletePrds = async (id) => {  
      try {
        const productDeleted = this.productModel.deleteOne({ _id: id });
  
        return productDeleted;
      } catch (error) {
        console.log(error)
      }
    }
    upgradePrd = async (req) => {
      try {
        const id = req.params.id
        const body = req.body
        const updatedProduct = await this.productModel.updateOne({ _id: id}, body)
  
        return updatedProduct
      } catch (error) {
        console.log(error)
      }
    }
    newPrd = async (body) => {
      try {
        const newProduct = await this.productModel.create(body);
        return newProduct;
      } catch (error) {
        console.log(error);
      }
    }
    
}