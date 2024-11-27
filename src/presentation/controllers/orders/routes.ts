import { Router } from "express";
import { OrderController } from "./controller";

export class OrderRoutes{
  static get routes(): Router{
    const router = Router()
    const controller = new OrderController();
    
    router.get("/", controller.getOrders); //Obtiene todos los pedidos

    return router;
  }
}