import { Alert } from "../../models/Alert.js";

// GET
export const getAlertService = (id) =>
  Alert.findById(id).populate(["factory", "product"]);
export const getAllAlertsService = (offset, limit) =>
  Alert.find().sort({ _id: -1 }).skip(offset).limit(limit);
export const countAlerts = () => Alert.countDocuments();
export const getTopAlertService = () => Alert.findOne().sort({ _id: -1 });

// POST
export const createAlertService = (body) => Alert.create(body);

// PATCH
export const updateAlertService = (id, name, factory, product, batch, goal) =>
  Alert.findOneAndUpdate(
    { _id: id },
    {
      name,
      factory,
      product,
      batch,
      goal,
    }
  );
