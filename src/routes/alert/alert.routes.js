import express from "express";
import {
  createAlert,
  getAllAlerts,
  getAlert,
  topAlert,
  updateAlert,
} from "../../controllers/alert/alert.controllers.js";
import { validId, validAlert } from "../../middlewares/global.middlewares.js";

export const route = express.Router();

route.post("/", createAlert);
route.get("/top", topAlert);
route.get("/", getAllAlerts);
route.get("/:id", validId, validAlert, getAlert);
route.patch("/:id", validId, validAlert, updateAlert);
