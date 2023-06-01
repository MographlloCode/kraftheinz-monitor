import {
  getAllAlertsService,
  createAlertService,
  updateAlertService,
  countAlerts,
  getTopAlertService,
} from "../../services/alert/alert.services.js";

export const createAlert = async (req, res) => {
  try {
    const { name, factory, product, batch, goal } = req.body;

    if (!name || !factory || !product || !batch || !goal) {
      res.status(400).send({
        erro: "Fill the alert information",
      });
    }

    const alert = await createAlertService(req.body);

    if (!alert) {
      return res.status(400).send({
        error: "Error creating the Alert!",
      });
    }

    res.status(201).send([
      {
        message: "Alert created!",
      },
      {
        id: alert._id,
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

export const getAllAlerts = async (req, res) => {
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

    const alerts = await getAllAlertsService(offset, limit);
    const totalAlerts = await countAlerts();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalAlerts ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (alerts.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no alerts registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalAlerts,
      results: alerts.map((alert) => ({
        id: alert._id,
        name: alert.name,
        factory: alert.factory,
        product: alert.product,
        batch: alert.batch,
        goal: alert.goal,
        createdAt: alert.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAlert = async (req, res) => {
  try {
    const alert = req.alert;
    res.status(200).send(alert);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateAlert = async (req, res) => {
  try {
    const { name, factory, product, batch, goal } = req.body;

    if (!name && !factory && !product && !batch && !goal) {
      res.status(400).send({
        erro: "Modify a field to update the Alert",
      });
      return;
    }

    const { id } = req;

    await updateAlertService(id, name, factory, product, batch, goal);

    res.status(200).send([
      {
        message: "Alert updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topAlert = async (req, res) => {
  try {
    const alert = await getTopAlertService();

    if (!alert) {
      return res
        .status(400)
        .send({ message: "There are no Alerts registered." });
    }

    res.send({
      alert: {
        id: alert._id,
        name: alert.name,
        factory: alert.factory,
        product: alert.product,
        batch: alert.batch,
        goal: alert.goal,
        createdAt: alert.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
