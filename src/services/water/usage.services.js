import { WaterUsage } from "../../models/WaterUsage.js";

// GET
export const getWaterUsageService = (id) =>
  WaterUsage.findById(id).populate(["product", "factory"]);
export const getAllWaterUsagesService = (offset, limit) =>
  WaterUsage.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate(["product", "factory"]);
export const countWaterUsage = () => WaterUsage.countDocuments();
export const getTopWaterUsageService = () =>
  WaterUsage.findOne().sort({ _id: -1 }).populate(["product", "factory"]);

// POST
export const createWaterUsageService = (body) => WaterUsage.create(body);

// PATCH
export const updateWaterUsageService = (
  id,
  product,
  factory,
  usage,
  registryDateHour
) =>
  WaterUsage.findOneAndUpdate(
    { _id: id },
    {
      product,
      factory,
      usage,
      registryDateHour,
    }
  );
