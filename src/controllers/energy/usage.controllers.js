import {
  getAllEnergyUsagesService,
  createEnergyUsageService,
  updateEnergyUsageService,
  countEnergyUsage,
  getTopEnergyUsageService,
} from "../../services/energy/usage.services.js";

export const createEnergyUsage = async (req, res) => {
  try {
    const { product, factory, usage, registryDateHour } = req.body;

    if (!product || !factory || !usage || !registryDateHour) {
      res.status(400).send({
        erro: "Fill the Energy usage information",
      });
    }

    const energyUsage = await createEnergyUsageService(req.body);

    if (!energyUsage) {
      return res.status(400).send({
        error: "Error creating the Energy usage!",
      });
    }

    res.status(201).send([
      {
        message: "Energy usage created!",
      },
      {
        id: energyUsage._id,
        product,
        factory,
        usage,
        registryDateHour,
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAllEnergyUsages = async (req, res) => {
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

    const energyUsages = await getAllEnergyUsagesService(offset, limit);
    const totalEnergyUsage = await countEnergyUsage();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalEnergyUsage
        ? `${currentUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (energyUsages.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no energy usages registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalEnergyUsage,
      results: energyUsages.map((energyUsage) => ({
        id: energyUsage._id,
        product: energyUsage.product,
        factory: energyUsage.factory,
        usage: energyUsage.usage,
        registryDateHour: energyUsage.registryDateHour,
        createdAt: energyUsage.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getEnergyUsage = async (req, res) => {
  try {
    const energyUsage = req.energyUsage;
    res.status(200).send(energyUsage);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateEnergyUsage = async (req, res) => {
  try {
    const { product, factory, usage, registryDateHour } = req.body;

    if (!product && !factory && !usage && !registryDateHour) {
      res.status(400).send({
        erro: "Modify a field to update the Energy usage",
      });
      return;
    }

    const { id } = req;

    await updateEnergyUsageService(
      id,
      product,
      factory,
      usage,
      registryDateHour
    );

    res.status(200).send([
      {
        message: "Energy usage updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topEnergyUsage = async (req, res) => {
  try {
    const energyUsage = await getTopEnergyUsageService();

    if (!energyUsage) {
      return res
        .status(400)
        .send({ message: "There are no energy usages registered." });
    }

    res.send({
      energyUsage: {
        id: energyUsage._id,
        product: energyUsage.product,
        factory: energyUsage.factory,
        usage: energyUsage.usage,
        registryDateHour: energyUsage.registryDateHour,
        createdAt: energyUsage.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
