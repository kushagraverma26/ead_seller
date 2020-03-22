const express = require('express');
const tokenToId = require("../helpers/tokenToId")
var postings = require('../models/posting');
var sellers = require('../models/seller');
var router = express.Router()


router.get("/",sellerValidate,(req,res)=>{
  postings.find(req.query).then((postings)=>{
    res.send(postings)
  }).catch((err)=>{
    res.status(400).send("Bad Request")
  })
})

router.post("/", sellerValidate, (req, res) => {
  var posting = new postings({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    createdBy: req.body.userId
  })
  posting.save((err, newPosting) => {
    if (err) res.status(409).send(err)
    else {
      res.send(newPosting)
    }
  })
})


router.delete("/", sellerValidate, (req, res) => {
  console.log(req.body._id);
  postings.findByIdAndDelete(req.body.id).then((posting) => {
    res.send("Deleted " + posting.name)
  }).catch((err) => {
    res.status(500).send("DB error")
  })
})




function sellerValidate(req, res, next) {
  tokenToId(req.get("token")).then((id) => {
    req.body.userId = id;
    sellers.findById(id).then((seller) => {
      if (seller) {
        next();
      }
    }).catch((err) => {
      res.status(500).send("DB Error")
    })
  }).catch((err) => { res.status(403).send("Token Error") })

}


module.exports = router;