"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,// foreinkey--24 haneden oluşan stringtir objectId
      ref: "User",// yıkarıdaki Id yi alacağı referans 
      required: true,
      unique: true,
      index: true,// hızlı erişim için ekleniyor. 
    },

    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,// hızlı ulaşım için ekelniyor
    },
  },
  { collection: "tokens", timestamps: true },
);


module.exports = mongoose.model("Token", TokenSchema);

