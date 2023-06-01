import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { getUserService } from "../services/index.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (!authorization) {
      res.status(401).send({
        erro: "You are not allowed to execute this routine",
      });
    }

    if (schema !== "Bearer") {
      res.status(401).send({
        erro: "You are not allowed to execute this routine",
      });
    }

    if (parts.length !== 2) {
      res.status(401).send({
        erro: "You are not allowed to execute this routine",
      });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({
          erro: "Invalid Token",
        });
      }

      const user = await getUserService(decoded.id);
      if (!user || !user.id) {
        return res.status(401).send({
          erro: "You are not allowed to execute this routine",
        });
      }

      req.loggedUser = user._id;
      return next();
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};
