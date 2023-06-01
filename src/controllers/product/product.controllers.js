import {
  getAllProductsService,
  createProductService,
  updateProductService,
  countProducts,
  getTopProductService,
} from "../../services/product/product.services.js";

export const createProduct = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({
        erro: "Fill the product information",
      });
    }

    const product = await createProductService(req.body);

    if (!product) {
      return res.status(400).send({
        error: "Error creating the product!",
      });
    }

    res.status(201).send([
      {
        message: "product created!",
      },
      {
        id: product._id,
        name,
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const products = await getAllProductsService(offset, limit);
    const totalProducts = await countProducts();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalProducts
        ? `${currentUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (products.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no products registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalProducts,
      results: products.map((product) => ({
        id: product._id,
        name: product.name,
        createdAt: product.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = req.product;
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({
        erro: "Modify a field to update the product",
      });
      return;
    }

    const { id } = req;

    await updateProductService(id, name);

    res.status(200).send([
      {
        message: "product updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topProduct = async (req, res) => {
  try {
    const product = await getTopProductService();

    if (!product) {
      return res
        .status(400)
        .send({ message: "There are no factories registered." });
    }

    res.send({
      product: {
        id: product._id,
        name: product.name,
        createdAt: product.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
