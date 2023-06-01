import { EnergyGoal } from "../../models/EnergyGoal.js";

// GET
export const getEnergyGoalService = (id) =>
  EnergyGoal.findById(id).populate(["product", "factory"]);
export const getAllEnergyGoalsService = (offset, limit) =>
  EnergyGoal.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate(["product", "factory"]);
export const countEnergyGoals = () => EnergyGoal.countDocuments();
export const getTopEnergyGoalService = () =>
  EnergyGoal.findOne().sort({ _id: -1 }).populate(["product", "factory"]);

// POST
export const createEnergyGoalService = (body) => EnergyGoal.create(body);

// PATCH
export const updateEnergyGoalService = (
  id,
  product,
  factory,
  goal,
  registryDateHour
) =>
  EnergyGoal.findOneAndUpdate(
    { _id: id },
    {
      product,
      factory,
      goal,
      registryDateHour,
    }
  );
