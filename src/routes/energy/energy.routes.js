import express from "express";
import {
  createEnergyGoal,
  getAllEnergyGoals,
  getEnergyGoal,
  topEnergyGoal,
  updateEnergyGoal,
} from "../../controllers/energy/goal.controllers.js";

import {
  createEnergyUsage,
  getAllEnergyUsages,
  getEnergyUsage,
  topEnergyUsage,
  updateEnergyUsage,
} from "../../controllers/energy/usage.controllers.js";

import {
  validId,
  validWaterGoal,
  validWaterUsage,
} from "../../middlewares/global.middlewares.js";

export const route = express.Router();

// GOAL
route.post("/goal/", createEnergyGoal);
route.get("/goal/top", topEnergyGoal);
route.get("/goal/", getAllEnergyGoals);
route.get("/goal/:id", validId, validWaterGoal, getEnergyGoal);
route.patch("/goal/:id", validId, validWaterGoal, updateEnergyGoal);

// USAGE
route.post("/usage/", createEnergyUsage);
route.get("/usage/top", topEnergyUsage);
route.get("/usage/", getAllEnergyUsages);
route.get("/usage/:id", validId, validWaterGoal, getEnergyUsage);
route.patch("/usage/:id", validId, validWaterUsage, updateEnergyUsage);
