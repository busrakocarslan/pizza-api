"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Pizza Controller:

const Pizza = require("../models/pizza");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "List Pizzas"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Pizza, {}, "toppingIds");//! ()içini böyle yapınca toppingIds için populete yapmış olduk! yani sadece id olarak gelmeyecek için dolu bilgilerle gelecek 

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Pizza),
      data,
    });
  },

  // CRUD:

  create: async (req, res) => {
    /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Create Pizza"
        */
    //! modelde foreinkey olan toppinIds e herhangi varlidate yapmadık;ancak bir bir malmzemeden birden fazla kes eklenmesi diye aşağıda req. boyden deestruc ile adlığımız toppingIds'e set methodunu uyguluyoruz ki tekrarlaerını almasın!!!
    let { toppingIds } = req.body;
    req.body.toppingIds = [...new Set(toppingIds)]; // [1,1,2,2,3,3,5]=>[1,2,3,5]

    const data = await Pizza.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Get Single Pizza"
        */

    const data = await Pizza.findOne({ _id: req.params.id }).populate(
      "toppingIds",
    );

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Update Pizza"
        */
       //? multer dosyayı kaydettikten sonra req.file'in içinde file-files oluşturuyor. single gönderirisen file, array-any gönderirsen files.

        /* FILE */
        // console.log('file', req.file) // upload.single()
        // console.log('files', req.files) // upload.array() || upload.any()
        if (req.file) {
          req.body.image = req.file.filename
      }
      /* FILE */


    const data = await Pizza.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Pizza.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Delete Pizza"
        */

    const data = await Pizza.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};

