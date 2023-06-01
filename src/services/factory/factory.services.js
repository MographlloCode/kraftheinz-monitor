import { Factory } from "../../models/Factory.js";

// GET
export const getFactoryService = (id) => Factory.findById(id);
export const getAllFactoryService = (offset, limit) =>
  Factory.find().sort({ _id: -1 }).skip(offset).limit(limit);
export const countFactory = () => Factory.countDocuments();
export const getTopFactoryService = () => Factory.findOne().sort({ _id: -1 });

// POST
export const createFactoryService = (body) => Factory.create(body);

// PATCH
export const updateFactoryService = (id, name, city, state) =>
  Factory.findOneAndUpdate(
    { _id: id },
    {
      name,
      city,
      state,
    }
  );
