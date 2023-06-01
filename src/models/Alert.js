import { Schema, model, mongoose } from "mongoose";

const AlertSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  factory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_factory",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_product",
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Alert = model("_alert", AlertSchema, "_alert");
