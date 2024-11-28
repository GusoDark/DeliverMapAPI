import cron from 'node-cron';
import { EmailService } from '../services/email.service';
import { deliverOrderEmailTemplate } from '../templates/emailDelivered.template';
import { OrderModel } from '../../data/models/deliverOrder.model';

export const emailDeliveredJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async ()=>{
        try {
            const pedidos = await OrderModel.find({ deliveryStatus: true, isSentDeliveryMail: false });
            
            if (!pedidos.length){
                console.log("No hay pedidos por entregar");
                return;
            }

            console.log(`Procesando ${pedidos.length} Casos`)
            await Promise.all(
                pedidos.map(async (pedido)=>{
                    try {
                        const htmlBody = deliverOrderEmailTemplate(pedido.lat, pedido.lng)
                        await emailService.sendEmail({
                            to: pedido.customerMail,
                            subject: `Su pedido ha sido entregado en la dirección: ${pedido.customerAddress}`,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el case con ID: ${pedido._id}`)
    
                        let updateCase = {
                          lat: pedido.lat,
                          lng: pedido.lng,
                          isSentMailOrder: pedido.isSentMailOrder,
                          isSentDeliveryMail: true,
                          deliveryStatus: pedido.deliveryStatus,
                          customerMail: pedido.customerMail,
                          customerName: pedido.customerName,
                          customerAddress: pedido.customerAddress
                        };
    
                        await OrderModel.findByIdAndUpdate(pedido._id, updateCase);
                        console.log(`Case actualizado para el ID: ${pedido._id}`)
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