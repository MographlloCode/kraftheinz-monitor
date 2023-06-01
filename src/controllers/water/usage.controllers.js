import {
  getAllWaterUsagesService,
  createWaterUsageService,
  updateWaterUsageService,
  countWaterUsage,
  getTopWaterUsageService,
} from "../../services/water/usage.services.js";

export const createWaterUsage = async (req, res) => {
  try {
    const { product, factory, usage, registryDateHour } = req.body;

    if (!product || !factory || !usage || !registryDateHour) {
      res.status(400).send({
        erro: "Fill the water usage information",
      });
    }

    const waterUsage = await createWaterUsageService(req.body);

    if (!waterUsage) {
      return res.status(400).send({
        error: "Error creating the water usage!",
      });
    }

    res.status(201).send([
      {
        message: "water usage created!",
      },
      {
        id: waterUsage._id,
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

export const getAllWaterUsages = async (req, res) => {
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

    const waterUsages = await getAllWaterUsagesService(offset, limit);
    const totalWaterUsages = await countWaterUsage();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalWaterUsages
        ? `${currentUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (waterUsages.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no water usages registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalWaterUsages,
      results: waterUsages.map((waterUsage) => ({
        id: waterUsage._id,
        product: waterUsage.product,
        factory: waterUsage.factory,
        usage: waterUsage.usage,
        registryDateHour: waterUsage.registryDateHour,
        createdAt: waterUsage.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getWaterUsages = async (req, res) => {
  try {
    const waterUsage = req.waterUsage;
    res.status(200).send(waterUsage);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateWaterUsage = async (req, res) => {
  try {
    const { product, factory, usage, registryDateHour } = req.body;

    if (!product && !factory && !usage && !registryDateHour) {
      res.status(400).send({
        erro: "Modify a field to update the water usage",
      });
      return;
    }

    const { id } = req;

    await updateWaterUsageService(
      id,
      product,
      factory,
      usage,
      registryDateHour
    );

    res.status(200).send([
      {
        message: "water usage updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topWaterUsage = async (req, res) => {
  try {
    const waterUsage = await getTopWaterUsageService();

    if (!waterUsage) {
      return res
        .status(400)
        .send({ message: "There are no water usages registered." });
    }

    res.send({
      waterUsage: {
        id: waterUsage._id,
        product: waterUsage.product,
        factory: waterUsage.factory,
        usage: waterUsage.usage,
        registryDateHour: waterUsage.registryDateHour,
        createdAt: waterUsage.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
