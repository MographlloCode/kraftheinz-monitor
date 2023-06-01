import {
  getAllWaterGoalsService,
  createWaterGoalService,
  updateWaterGoalService,
  countWaterGoals,
  getTopWaterGoalService,
} from "../../services/water/goal.services.js";

export const createWaterGoal = async (req, res) => {
  try {
    const { product, factory, goal, registryDateHour } = req.body;

    if (!product || !factory || !goal || !registryDateHour) {
      res.status(400).send({
        erro: "Fill the water Goal information",
      });
    }

    const waterGoal = await createWaterGoalService(req.body);

    if (!waterGoal) {
      return res.status(400).send({
        error: "Error creating the water Goal!",
      });
    }

    res.status(201).send([
      {
        message: "water goal created!",
      },
      {
        id: waterGoal._id,
        product,
        factory,
        goal,
        registryDateHour,
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAllWaterGoals = async (req, res) => {
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

    const waterGoals = await getAllWaterGoalsService(offset, limit);
    const totalWaterGoals = await countWaterGoals();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalWaterGoals
        ? `${currentUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (waterGoals.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no waterGoals registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalWaterGoals,
      results: waterGoals.map((waterGoal) => ({
        id: waterGoal._id,
        product: waterGoal.product,
        factory: waterGoal.factory,
        goal: waterGoal.goal,
        registryDateHour: waterGoal.registryDateHour,
        createdAt: waterGoal.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getWaterGoal = async (req, res) => {
  try {
    const waterGoal = req.waterGoal;
    res.status(200).send(waterGoal);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateWaterGoal = async (req, res) => {
  try {
    const { product, factory, goal, registryDateHour } = req.body;

    if (!product && !factory && !goal && !registryDateHour) {
      res.status(400).send({
        erro: "Modify a field to update the water Goal",
      });
      return;
    }

    const { id } = req;

    await updateWaterGoalService(id, product, factory, goal, registryDateHour);

    res.status(200).send([
      {
        message: "waterGoal updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topWaterGoal = async (req, res) => {
  try {
    const waterGoal = await getTopWaterGoalService();

    if (!waterGoal) {
      return res
        .status(400)
        .send({ message: "There are no waterGoals registered." });
    }

    res.send({
      waterGoal: {
        id: waterGoal._id,
        product: waterGoal.product,
        factory: waterGoal.factory,
        goal: waterGoal.goal,
        registryDateHour: waterGoal.registryDateHour,
        createdAt: waterGoal.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
