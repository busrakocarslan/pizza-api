"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");

const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password), // password helper dosyasında yukarıda require edildi
      //set:passwordEncrypt-->js de func isimleri aynı zamanda referans olduğundan (obj) bu şekilde de çağırılabilir.
      // validate: [//? controller da create işleminde tanımladım çünkü burada set validate den önce çalıştığından şifrelemede hata alınıyor.
      //   (password) =>
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
      //   "Password type is not correct.",
      // ],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Please fill a valid email address",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);