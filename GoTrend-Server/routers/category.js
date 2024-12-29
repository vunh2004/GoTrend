import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category";

const routerCategory = express();

routerCategory.get("/category", getAllCategories);
routerCategory.post("/category", addCategory);
routerCategory.put("/category/:id", updateCategory);
routerCategory.delete("/category/:id", deleteCategory);

export default routerCategory;
