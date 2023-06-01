import { Schema, model, mongoose } from "mongoose";

const WaterUsageSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  factory: {
    type: String,
    required: true,
  },
  usage: {
    type: Number,
    required: true,
  },
  registryDateHour: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const WaterUsage = model(
  "_water__usage",
  WaterUsageSchema,
  "_water__usage"
);
