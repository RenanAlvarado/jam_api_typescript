import { Router } from "express";

const routes = Router();

routes.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Sistema de Jam API está funcionando.",
  });
});

export default routes;
