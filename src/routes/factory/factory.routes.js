import express from "express";
import {
  createFactory,
  getAllFactories,
  getFactory,
  topFactory,
  updateFactory,
} from "../../controllers/factory/factory.controllers.js";
import { validId, validFactory } from "../../middlewares/global.middlewares.js";

export const route = express.Router();

route.post("/", createFactory);
route.get("/top", topFactory);
route.get("/", getAllFactories);
route.get("/:id", validId, validFactory, getFactory);
route.patch("/:id", validId, validFactory, updateFactory);
