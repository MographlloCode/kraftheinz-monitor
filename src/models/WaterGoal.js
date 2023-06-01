import { Schema, model, mongoose } from "mongoose";

const WaterGoalSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  factory: {
    type: String,
    required: true,
  },
  goal: {
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

export const WaterGoal = model("_water__goal", WaterGoalSchema, "_water__goal");
