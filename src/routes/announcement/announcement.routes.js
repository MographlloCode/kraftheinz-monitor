import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncement,
  topAnnouncement,
  updateAnnouncement,
} from "../../controllers/announcement/announcement.controllers.js";
import {
  validId,
  validAnnouncement,
} from "../../middlewares/global.middlewares.js";

export const route = express.Router();

route.post("/", createAnnouncement);
route.get("/top", topAnnouncement);
route.get("/", getAllAnnouncements);
route.get("/:id", validId, validAnnouncement, getAnnouncement);
route.patch("/:id", validId, validAnnouncement, updateAnnouncement);
