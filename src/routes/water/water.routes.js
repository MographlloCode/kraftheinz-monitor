import express from "express";
import {
  createWaterGoal,
  getAllWaterGoals,
  getWaterGoal,
  topWaterGoal,
  updateWaterGoal,
} from "../../controllers/water/goal.controllers.js";

import {
  createWaterUsage,
  getAllWaterUsages,
  getWaterUsages,
  topWaterUsage,
  updateWaterUsage,
} from "../../controllers/water/usage.controllers.js";

import {
  validId,
  validWaterGoal,
  validWaterUsage,
} from "../../middlewares/global.middlewares.js";

export const route = express.Router();

// GOAL
route.post("/goal/", createWaterGoal);
route.get("/goal/top", topWaterGoal);
route.get("/goal/", getAllWaterGoals);
route.get("/goal/:id", validId, validWaterGoal, getWaterGoal);
route.patch("/goal/:id", validId, validWaterGoal, updateWaterGoal);

// USAGE
route.post("/usage/", createWaterUsage);
route.get("/usage/top", topWaterUsage);
route.get("/usage/", getAllWaterUsages);
route.get("/usage/:id", validId, validWaterGoal, getWaterUsages);
route.patch("/usage/:id", validId, validWaterUsage, updateWaterUsage);
