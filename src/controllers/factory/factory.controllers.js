import {
  getAllFactoryService,
  createFactoryService,
  updateFactoryService,
  countFactory,
  getTopFactoryService,
} from "../../services/factory/factory.services.js";

export const createFactory = async (req, res) => {
  try {
    const { name, city, state } = req.body;

    if (!name || !city || !state) {
      res.status(400).send({
        erro: "Fill the factory information",
      });
    }

    const factory = await createFactoryService(req.body);

    if (!factory) {
      return res.status(400).send({
        error: "Error creating the factory!",
      });
    }

    res.status(201).send([
      {
        message: "factory created!",
      },
      {
        id: factory._id,
        name,
        factory,
        product,
        batch,
        goal,
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAllFactories = async (req, res) => {
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

    const factories = await getAllFactoryService(offset, limit);
    const totalFactories = await countFactory();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalFactories
        ? `${currentUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (factories.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no factorys registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalFactories,
      results: factories.map((factory) => ({
        id: factory._id,
        name: factory.name,
        city: factory.city,
        state: factory.state,
        createdAt: factory.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getFactory = async (req, res) => {
  try {
    const factory = req.factory;
    res.status(200).send(factory);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateFactory = async (req, res) => {
  try {
    const { name, city, state } = req.body;

    if (!name && !city && !state) {
      res.status(400).send({
        erro: "Modify a field to update the factory",
      });
      return;
    }

    const { id } = req;

    await updateFactoryService(id, name, city, state);

    res.status(200).send([
      {
        message: "factory updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topFactory = async (req, res) => {
  try {
    const factory = await getTopFactoryService();

    if (!factory) {
      return res
        .status(400)
        .send({ message: "There are no factories registered." });
    }

    res.send({
      factory: {
        id: factory._id,
        name: factory.name,
        city: factory.city,
        state: factory.state,
        createdAt: factory.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
