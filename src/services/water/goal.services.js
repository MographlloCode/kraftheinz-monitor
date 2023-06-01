import { WaterGoal } from "../../models/WaterGoal.js";

// GET
export const getWaterGoalService = (id) =>
  WaterGoal.findById(id).populate(["product", "factory"]);
export const getAllWaterGoalsService = (offset, limit) =>
  WaterGoal.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate(["product", "factory"]);
export const countWaterGoals = () => WaterGoal.countDocuments();
export const getTopWaterGoalService = () =>
  WaterGoal.findOne().sort({ _id: -1 }).populate(["product", "factory"]);

// POST
export const createWaterGoalService = (body) => WaterGoal.create(body);

// PATCH
export const updateWaterGoalService = (
  id,
  product,
  factory,
  goal,
  registryDateHour
) =>
  WaterGoal.findOneAndUpdate(
    { _id: id },
    {
      product,
      factory,
      goal,
      registryDateHour,
    }
  );
