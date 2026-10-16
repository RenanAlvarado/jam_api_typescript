import { Router } from "express";
import instrumentRoutes from "./modules/instruments/instruments.routes";
import addressRoutes from "./modules/addresses/address.routes";

const routes = Router();

routes.use("/instruments", instrumentRoutes);
routes.use("/addresses", addressRoutes);

export default routes;
