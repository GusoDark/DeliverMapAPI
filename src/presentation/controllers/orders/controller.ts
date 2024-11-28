import { Request, Response } from "express";
import { OrderModel } from "../../../data/models/deliverOrder.model";
import { EmailService } from "../../../domain/services/email.service";

export class OrderController{
  public getOrders = async ( req: Request, res: Response) => {
    try{
      const orders = await OrderModel.find();
      return res.json(orders);
    }catch(error){
      return res.json([]);
    }
  }

  public getOrdersPending = async (req: Request, res: Response) => {
    try{
      const orders = await OrderModel.find();
      const pendingOrders = orders.filter( (element) => { return element.deliveryStatus === false })
      return res.json(pendingOrders)
    }catch(error){
      return res.json([]);
    }
  }

  public createOrder = async (req: Request, res: Response) => {
    try{
      const { lat, lng,customerMail, customerName, customerAddress } = req.body;
      const newOrder = await OrderModel.create({
        lat,
        lng,
        customerMail,
        customerName,
        customerAddress
      });
      const emailService = new EmailService();
      return res.json(newOrder);
    }catch(error){
      return res.json({message: "Error al registrar el pedido"});
    }
  }

  public updateOrderStatus = async (req: Request, res: Response) => {
    try{
      const {id} = req.params;
      const { lat, lng,customerMail, customerName, customerAddress } = req.body;
      const updateOrder = await OrderModel.findByIdAndUpdate(id, {
        lat,
        lng,
        deliveryStatus: true,
        customerMail,
        customerName,
        customerAddress
      });
      
      //return res.json(updateOrder);

      return res.json(`El pedido con id: "${id}" ha sido actualizado correctamente`)
    }catch(error){
      return res.json({messaage:"Error al actualizar el estado de entrega del pedido"});
    }
  }

}