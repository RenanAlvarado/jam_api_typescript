import { Router } from "express";
import instrumentRoutes from "./modules/instruments/instruments.routes";
import addressRoutes from "./modules/addresses/address.routes";
import authRoutes from "./modules/auth/auth.routes";

const routes = Router();

routes.use("/instruments", instrumentRoutes);
routes.use("/addresses", addressRoutes);
routes.use("/auth", authRoutes);

export default routes;
