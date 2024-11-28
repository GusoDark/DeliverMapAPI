import { Router } from "express";
import { OrderController } from "./controller";

export class OrderRoutes{
  static get routes(): Router{
    const router = Router()
    const controller = new OrderController();
    
    router.get("/", controller.getOrders); //Obtiene todos los pedidos
    router.get("/pending", controller.getOrdersPending); //Obtiene los pedidos pendientes
    router.post("/createorder", controller.createOrder); //Crea un nuevo registro de pedido
    router.put("/delivered/:id", controller.updateOrderStatus); //Actualiza un pedido a "Ya entregado".

    return router;
  }
}