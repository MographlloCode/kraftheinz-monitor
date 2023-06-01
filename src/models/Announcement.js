import { Schema, model } from "mongoose";

const AnnoucementSchema = new Schema({
  announcement: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Announcement = model(
  "_announcement",
  AnnoucementSchema,
  "_announcement"
);
