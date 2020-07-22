const express = require('express');
const tokenToId = require("../helpers/tokenToId")
var postings = require('../models/posting');
var sellers = require('../models/seller');
var router = express.Router()

//For Flutter Application
router.get("/allPostings", (req,res)=>{
  postings.find(req.query).then((postings)=>{
    res.send(postings)
  }).catch((err)=>{
    res.status(400).send("Bad Request")
  })
})

//For React App
router.get("/myPostings",sellerValidate,(req,res)=>{
  tokenToId(req.get("token")).then((id) => {
    req.query['createdBy'] = id
    postings.find(req.query).then((postings)=>{
      res.send(postings)
    }).catch((err)=>{
      res.status(400).send("Bad Request")
    })
  }).catch((err) =>{
    res.status(400).send("Bad Request")
  })
})




router.post("/", sellerValidate, (req, res) => {
  var posting = new postings({
    item: req.body.item,
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


router.delete("/:id", sellerValidate, (req, res) => {
  var id = req.params.id;
  postings.findByIdAndDelete(id).then((posting) => {
    res.send("Deleted " + posting.name)
  }).catch((err) => {
    res.status(500).send("DB error")
  })
})

router.post("/noncancellable", sellerValidate, (req,res) => {
  postings.findByIdAndUpdate(req.query.id, {$set: {cancellable : false}}, {new:true}, function(err,posting){
    if(err){
      res.status(500).send("DB error")
    }
    else{
      res.send(posting)
    }
  })
})


router.post("/picked", sellerValidate, (req,res) => {
  postings.findByIdAndUpdate(req.query.id, {$set: {isPicked : true}}, {new:true}, function(err,posting){
    if(err){
      res.status(500).send("DB error")
    }
    else{
      res.send(posting)
    }
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