import { Schema, model, mongoose } from "mongoose";

const EnergyUsageSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_product",
    required: true,
  },
  factory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_factory",
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

export const EnergyUsage = model(
  "_energy__usage",
  EnergyUsageSchema,
  "_energy__usage"
);
