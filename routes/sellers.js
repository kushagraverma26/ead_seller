const express = require('express');
const tokenToId = require("../helpers/tokenToId");
var sellers = require('../models/seller');
var router = express.Router()



//For Flutter Application
// API to get the seller details
router.get("/sellerDetails", (req, res) => {
  sellers.find(req.query).then((seller) => {
    res.send(seller)
  }).catch((err) => {
    res.status(400).send("Bad Request")
  })
})


// Get profile API for the React Application
router.get("/myProfile", sellerValidate, (req, res) => {
  tokenToId(req.get("token")).then((id) => {
    req.query['_id'] = id
    sellers.find(req.query).then((seller) => {
      res.send(seller)
    }).catch((err) => {
      res.status(400).send("Bad Request")
    })
  }).catch((err) => {
    res.status(400).send("Bad Request")
  })
})


//Token validator
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



module.exports = router
