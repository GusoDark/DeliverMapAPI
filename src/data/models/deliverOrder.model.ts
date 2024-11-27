import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  isSentMailOrder: {
    type: Boolean,
    //required: false
    default: false
  },
  isSentDeliveryMail: {
    type: Boolean,
    //required: false
    default: false
  },
  deliveryStatus: {
    type: Boolean,
    default: false
  },
  customerMail: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

export const OrderModel = mongoose.model("Order", orderSchema);