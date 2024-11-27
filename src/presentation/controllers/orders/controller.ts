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
  
}