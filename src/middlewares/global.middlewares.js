import mongoose from "mongoose";
import {
  getAlertService,
  getEnergyGoalService,
  getEnergyUsageService,
  getFactoryService,
  getProductService,
  getUserService,
  getWaterGoalService,
  getWaterUsageService,
} from "../services/index.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ erro: "Id Inválido" });
    }

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validAlert = async (req, res, next) => {
  try {
    const id = req.params.id;

    const alert = await getAlertService(id);

    if (!alert) {
      return res.status(400).send({ erro: "Alert not found." });
    }

    req.id = id;
    req.alert = alert;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validAnnouncement = async (req, res, next) => {
  try {
    const id = req.params.id;

    const announcement = await getAnnouncementService(id);

    if (!announcement) {
      return res.status(400).send({ erro: "Announcement not found." });
    }

    req.id = id;
    req.announcement = announcement;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validEnergyGoal = async (req, res, next) => {
  try {
    const id = req.params.id;

    const ernergyGoal = await getEnergyGoalService(id);

    if (!ernergyGoal) {
      return res.status(400).send({ erro: "Energy Goal not found." });
    }

    req.id = id;
    req.ernergyGoal = ernergyGoal;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validEnergyUsage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const energyUsage = await getEnergyUsageService(id);

    if (!energyUsage) {
      return res.status(400).send({ erro: "Energy Usage not found." });
    }

    req.id = id;
    req.energyUsage = energyUsage;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validWaterGoal = async (req, res, next) => {
  try {
    const id = req.params.id;

    const waterGoal = await getWaterGoalService(id);

    if (!waterGoal) {
      return res.status(400).send({ erro: "Water Goal not found." });
    }

    req.id = id;
    req.waterGoal = waterGoal;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validWaterUsage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const waterUsage = await getWaterUsageService(id);

    if (!waterUsage) {
      return res.status(400).send({ erro: "Water Usage not found." });
    }

    req.id = id;
    req.waterUsage = waterUsage;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validFactory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const factory = await getFactoryService(id);

    if (!factory) {
      return res.status(400).send({ erro: "Factory not found." });
    }

    req.id = id;
    req.factory = factory;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await getProductService(id);

    if (!product) {
      return res.status(400).send({ erro: "Product not found." });
    }

    req.id = id;
    req.product = product;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await getUserService(id);

    if (!user) {
      return res.status(400).send({ erro: "User not found." });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};
