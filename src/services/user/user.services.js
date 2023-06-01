import { User } from "../../models/User.js";

// GET
export const getUserService = (id) => User.findById(id);
export const getAllUsersService = (offset, limit) =>
  User.find().sort({ _id: -1 }).skip(offset).limit(limit);
export const countUsers = () => User.countDocuments();
export const getTopUserService = () => User.findOne().sort({ _id: -1 });

// POST
export const createUserService = (body) => User.create(body);

// PATCH
export const updateUserService = (id, name) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name,
    }
  );
