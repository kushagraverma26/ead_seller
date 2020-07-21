const express = require('express');
const tokenToId = require("../helpers/tokenToId")
var items = require('../models/item');
var router = express.Router()

router.get("/", (req,res) => {
    items.find(req.query).then((items) => {
        res.send(items)
    }).catch((err) => {
        res.status(400).send("Bad Request")
    })
})

router.post("/add", (req, res) => {
    var item = new items({
      name: req.body.name,
      category: req.body.category,
      unit: req.body.unit,
      defaultPrice: req.body.defaultPrice,
    })
    item.save((err, newItem) => {
      if (err) res.status(409).send(err)
      else {
        res.send(newItem)
      }
    })
})


router.delete("/:id", (req, res) => {
    var id = req.params.id;
    items.findByIdAndDelete(id).then((item) => {
      res.send("Deleted " + item.name)
    }).catch((err) => {
      res.status(500).send("DB error")
    })
})

router.post("/updateDefaultPrice", (req,res) => {
    items.findByIdAndUpdate(req.query.id, {$set: {defaultPrice : req.body.newPrice}}, {new:true}, function(err,Item){
      if(err){
        res.status(500).send("DB error")
      }
      else{
        res.send(Item)
      }
    })
})

module.exports = router;