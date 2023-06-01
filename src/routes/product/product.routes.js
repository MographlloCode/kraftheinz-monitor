import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  topProduct,
  updateProduct,
} from "../../controllers/product/product.controllers.js";
import { validId, validProduct } from "../../middlewares/global.middlewares.js";

export const route = express.Router();

route.post("/", createProduct);
route.get("/top", topProduct);
route.get("/", getAllProducts);
route.get("/:id", validId, validProduct, getProduct);
route.patch("/:id", validId, validProduct, updateProduct);
