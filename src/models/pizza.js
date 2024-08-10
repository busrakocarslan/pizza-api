"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    // image: {
    //     type: String,
    //     trim: true,
    // },
    image: String,

    price: {
      type: Number,// matematiksel işlem yapılacağından number vermek bizim yararımıza
      required: true,
    },

    toppingIds: [// içeriklerin çoklu malzmeden oluşmasını istediğimiz için obj olarak değil array olarak düzenledik. Foreinkey
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topping",
      },
    ],
  },
  {
    collection: "pizzas",
    timestamps: true,
  },
);

// Model:
module.exports = mongoose.model("Pizza", PizzaSchema);
