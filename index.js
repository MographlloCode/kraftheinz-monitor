import express from "express";
import { databaseConnection } from "./src/database/db.js";
import dotenv from "dotenv";

import {
  AlertRoutes,
  AnnouncementRoutes,
  EnergyRoutes,
  FactoryRoutes,
  ProductRoutes,
  UserRoutes,
  WaterRoutes,
} from "./src/routes/index.js";

import SwaggerRoutes from "./src/routes/swagger.routes.cjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

databaseConnection();

app.use(express.json());
app.use("/alert", AlertRoutes);
app.use("/announcement", AnnouncementRoutes);
app.use("/energy", EnergyRoutes);
app.use("/factory", FactoryRoutes);
app.use("/product", ProductRoutes);
app.use("/user", UserRoutes);
app.use("/water", WaterRoutes);
app.use("/doc", SwaggerRoutes);

app.listen(port, () => {
  console.log(`Monitor listening on port ${port}`);
});
