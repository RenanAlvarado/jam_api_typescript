import { Router } from "express";
import instrumentRoutes from "./modules/instruments/instruments.routes";

const routes = Router();

routes.use("/instruments", instrumentRoutes);

export default routes;
