import express from "express";
import { connectDB } from "./config/db";
import routerProduct from "./routers/product";

const app = express();
app.use(express.json());

connectDB();

app.use("/api", routerProduct);

export const viteNodeApp = app;
