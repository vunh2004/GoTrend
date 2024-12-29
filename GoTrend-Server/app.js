import express from "express";
import { connectDB } from "./config/db";
import routerProduct from "./routers/product";
import routerCategory from "./routers/category";

const app = express();
app.use(express.json());

connectDB();

//products
app.use("/api", routerProduct);

//category
app.use("/api", routerCategory);

export const viteNodeApp = app;
