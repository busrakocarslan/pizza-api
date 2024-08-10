"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const PizzaSizeEnum = {
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large",
  XLARGE: "XLarge",
};
//Object.keys(PizzaSizeEnum)
//Object.entries(PizzaSizeEnum)
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
// bu normalde array da olabilir projemde bir piza modelinden 
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    size: {
      //Small, Medium,Large, Xlarge
      type: String,
      trim: true,
      required: true,
      enum: ["Small", "Medium", "Large", "XLarge"],
      //enum:Object.values(PizzaSizeEnum) js de yok ts de var mongoose da da enum veritipi var! estra örnek olarak yukarıda obje olarak yapıldı nokta notasyoluyla alma gösterildi. 
    },

    quantity: {
      type: Number,
      default: 1,// en az 1 tane almak zorunda oldu 1 deyince default
    },

    price: {
      type: Number,
      required: true,
    },
    totalPrice: {// erd de amount
      type: Number,
      default: function () {
        return this.quantity * this.price;// kaç adet çarpı fiyat
      }, // Create
      transform: function () {
        return this.quantity * this.price;
      }, //Update
    },
  },
  { collection: "orders", timestamps: true },
);

// Model:

module.exports = mongoose.model("Order", OrderSchema);
