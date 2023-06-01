import { Product } from "../../models/Product.js";

// GET
export const getProductService = (id) => Product.findById(id);
export const getAllProductsService = (offset, limit) =>
  Product.find().sort({ _id: -1 }).skip(offset).limit(limit);
export const countProducts = () => Product.countDocuments();
export const getTopProductService = () => Product.findOne().sort({ _id: -1 });

// POST
export const createProductService = (body) => Product.create(body);

// PATCH
export const updateProductService = (id, name) =>
  Product.findOneAndUpdate(
    { _id: id },
    {
      name,
    }
  );
