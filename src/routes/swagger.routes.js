import express from "express";
export const route = express.Router();
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

route.use("/", swaggerUi.serve);
route.get("/", swaggerUi.setup(swaggerDocument));
