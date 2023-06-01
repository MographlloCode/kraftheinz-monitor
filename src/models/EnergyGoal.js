import { Schema, model, mongoose } from "mongoose";

const EnergyGoalSchema = new Schema({
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

export const EnergyGoal = model(
  "_energy__goal",
  EnergyGoalSchema,
  "_energy__goal"
);
