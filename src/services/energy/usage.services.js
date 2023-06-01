import { EnergyUsage } from "../../models/EnergyUsage.js";

// GET
export const getEnergyUsageService = (id) =>
  EnergyUsage.findById(id).populate(["product", "factory"]);
export const getAllEnergyUsagesService = (offset, limit) =>
  EnergyUsage.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate(["product", "factory"]);
export const countEnergyUsage = () => EnergyUsage.countDocuments();
export const getTopEnergyUsageService = () =>
  EnergyUsage.findOne().sort({ _id: -1 }).populate(["product", "factory"]);

// POST
export const createEnergyUsageService = (body) => EnergyUsage.create(body);

// PATCH
export const updateEnergyUsageService = (
  id,
  product,
  factory,
  usage,
  registryDateHour
) =>
  EnergyUsage.findOneAndUpdate(
    { _id: id },
    {
      product,
      factory,
      usage,
      registryDateHour,
    }
  );
