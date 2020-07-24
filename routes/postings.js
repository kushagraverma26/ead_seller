const express = require('express');
const tokenToId = require("../helpers/tokenToId")
var postings = require('../models/posting');
var sellers = require('../models/seller');
var router = express.Router()


//All postings API
//For Flutter Application
router.get("/allPostings", (req, res) => {
  postings.find(req.query).then((postings) => {
    res.send(postings)
  }).catch((err) => {
    res.status(400).send("Bad Request")
  })
})


//Get postings for the current user API
//For React App
router.get("/myPostings", sellerValidate, (req, res) => {
  tokenToId(req.get("token")).then((id) => {
    req.query['createdBy'] = id
    postings.find(req.query).then((postings) => {
      res.send(postings)
    }).catch((err) => {
      res.status(400).send("Bad Request")
    })
  }).catch((err) => {
    res.status(400).send("Bad Request")
  })
})



//API to create new Posting
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


//API to delete posting
router.delete("/:id", sellerValidate, (req, res) => {
  var id = req.params.id;
  postings.findByIdAndDelete(id).then((posting) => {
    res.send("Deleted " + posting.name)
  }).catch((err) => {
    res.status(500).send("DB error")
  })
})

//API to mark posting as non cancellable
router.post("/noncancellable", sellerValidate, (req, res) => {
  postings.findByIdAndUpdate(req.query.id, { $set: { cancellable: false } }, { new: true }, function (err, posting) {
    if (err) {
      res.status(500).send("DB error")
    }
    else {
      res.send(posting)
    }
  })
})

//For flutter applicaation
//marks as picked and updates amount received
router.post("/picked", (req, res) => {
  postings.findByIdAndUpdate(req.body.id, { $set: { isPicked: true, amountReceived: req.body.amount } }, { new: true }, function (err, posting) {
    if (err) {
      res.status(500).send("DB error in updating")
    }
    else {
      console.log(posting);
      res.send(posting)
    }
  })
})


//Token Validator
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