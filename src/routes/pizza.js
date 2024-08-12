"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/pizza:

const pizza = require("../controllers/pizza");

// dosya-image eklemek için
const upload = require('../middlewares/upload')

// URL: /pizzas

router.route("/")
.get(pizza.list)
.post(upload.array("image"),pizza.create);

//? FE kısmında formu nasıl düzenlemekla alakalı yorum
/*
    <form action="/pizzas" method="POST" enctype="mutipart/form-data">
        <input type="file" name="image">
    </form>
*/ 

router
  .route("/:id")
  .get(pizza.read)
  .put(upload.single('image'), pizza.update)
  .patch(upload.single('image'), pizza.update)
  .delete(pizza.delete);

/* ------------------------------------------------------- */
module.exports = router;

