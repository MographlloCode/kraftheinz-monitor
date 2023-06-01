import { Schema, model } from "mongoose";

const FactorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Factory = model("_factory", FactorySchema, "_factory");
