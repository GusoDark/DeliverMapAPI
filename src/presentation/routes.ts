import { Router } from "express";
import { OrderRoutes } from "./controllers/orders/routes";
export class AppRoutes{
  static get routes(): Router{
    const router = Router();
    router.use("/api/orders", OrderRoutes.routes);
    return router;
  }
}