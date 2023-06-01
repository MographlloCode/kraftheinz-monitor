import {
  getAllEnergyGoalsService,
  createEnergyGoalService,
  updateEnergyGoalService,
  countEnergyGoals,
  getTopEnergyGoalService,
} from "../../services/energy/goal.services.js";

export const createEnergyGoal = async (req, res) => {
  try {
    const { product, factory, goal, registryDateHour } = req.body;

    if (!product || !factory || !goal || !registryDateHour) {
      res.status(400).send({
        erro: "Fill the Energy Goal information",
      });
    }

    const energyGoal = await createEnergyGoalService(req.body);

    if (!energyGoal) {
      return res.status(400).send({
        error: "Error creating the Energy Goal!",
      });
    }

    res.status(201).send([
      {
        message: "Energy goal created!",
      },
      {
        id: energyGoal._id,
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

export const getAllEnergyGoals = async (req, res) => {
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

    const energyGoals = await getAllEnergyGoalsService(offset, limit);
    const totalEnergyGoals = await countEnergyGoals();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalEnergyGoals
        ? `${currentUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (energyGoals.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no energyGoals registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalEnergyGoals,
      results: energyGoals.map((energyGoal) => ({
        id: energyGoal._id,
        product: energyGoal.product,
        factory: energyGoal.factory,
        goal: energyGoal.goal,
        registryDateHour: energyGoal.registryDateHour,
        createdAt: energyGoal.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getEnergyGoal = async (req, res) => {
  try {
    const energyGoal = req.energyGoal;
    res.status(200).send(energyGoal);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateEnergyGoal = async (req, res) => {
  try {
    const { product, factory, goal, registryDateHour } = req.body;

    if (!product && !factory && !goal && !registryDateHour) {
      res.status(400).send({
        erro: "Modify a field to update the Energy Goal",
      });
      return;
    }

    const { id } = req;

    await updateEnergyGoalService(id, product, factory, goal, registryDateHour);

    res.status(200).send([
      {
        message: "energyGoal updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topEnergyGoal = async (req, res) => {
  try {
    const energyGoal = await getTopEnergyGoalService();

    if (!energyGoal) {
      return res
        .status(400)
        .send({ message: "There are no energyGoals registered." });
    }

    res.send({
      energyGoal: {
        id: energyGoal._id,
        product: energyGoal.product,
        factory: energyGoal.factory,
        goal: energyGoal.goal,
        registryDateHour: energyGoal.registryDateHour,
        createdAt: energyGoal.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
