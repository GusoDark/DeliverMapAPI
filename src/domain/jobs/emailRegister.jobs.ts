import cron from 'node-cron';
import { EmailService } from "../services/email.service";
import { generateOrderEmailTemplate } from "../templates/emailRegistered.template";
import { OrderModel } from "../../data/models/deliverOrder.model";

export const emailOrderRegisteredJob = () => {
  const emailService = new EmailService();

  cron.schedule("*/10 * * * * *", async () => {
    try{
      const orders = await OrderModel.find({ isSentMailOrder: false});

      if (!orders.length){
        console.log("No hay pedidos por confirmar su registro");
        return;
      }

      console.log(`Procesando ${orders.length} Pedidos`)
      await Promise.all(
        orders.map(async (pedido)=>{
            try {
                const htmlBody = generateOrderEmailTemplate(pedido.lat, pedido.lng)
                await emailService.sendEmail({
                    to: pedido.customerMail,
                    subject: `Nuevo pedido registrado a nombre de ${pedido.customerName}`,
                    htmlBody: htmlBody
                });
                console.log(`Email enviado para el pedido con ID: ${pedido._id}`)

                let updateCase = {
                    lat: pedido.lat,
                    lng: pedido.lng,
                    isSentMailOrder: true,
                    isSentDeliveryMail: pedido.isSentDeliveryMail,
                    deliveryStatus: pedido.deliveryStatus,
                    customerMail: pedido.customerMail,
                    customerName: pedido.customerName,
                    customerAddress: pedido.customerAddress
                };
                await OrderModel.findByIdAndUpdate(pedido._id, updateCase);
                console.log(`Pedido registrado para el ID: ${pedido._id}`)

            } catch (error) {
                console.error("Error al procesar el pedido")
            }
        })
      );
    } catch (error) {
      console.error("Error durante el envio de correo")
    }
    
  });
}