import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product";

const routerProduct = express();

routerProduct.get("/products", getAllProducts);
routerProduct.get("/products/:id", getProductById);
routerProduct.post("/products", addProduct);
routerProduct.put("/products/:id", updateProduct);
routerProduct.delete("/products/:id", deleteProduct);

export default routerProduct;
