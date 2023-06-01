import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  topUser,
  updateUser,
} from "../../controllers/user/user.controllers.js";
import { validId, validUser } from "../../middlewares/global.middlewares.js";

export const route = express.Router();

route.post("/", createUser);
route.get("/top", topUser);
route.get("/", getAllUsers);
route.get("/:id", validId, validUser, getUser);
route.patch("/:id", validId, validUser, updateUser);
