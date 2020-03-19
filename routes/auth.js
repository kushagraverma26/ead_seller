const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/secret');
var sellers = require('../models/seller');

var router = express.Router()


router.post("/registerSeller",(req,res)=>{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var seller = new sellers({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      location:req.body.location,
    })
    seller.save((err,newSeller)=>{
      if(err) res.status(409).send(err)
      else{
        var token = jwt.sign({ id: newSeller._id}, config.secret, {expiresIn: 86400 });
        res.send([newSeller,{"token":token}])
      }
    })
  })



  router.post("/sellerLogin",(req,res)=>{
    sellers.findOne({email:req.body.email},(err,seller)=>{
      if(err) res.status(500).send("There has been an error")
      else if(seller == null) res.status(404).send("No account with given credentials exists")
      else{
        if(bcrypt.compareSync(req.body.password,seller.password)){
          var token = jwt.sign({ id: seller._id }, config.secret, { expiresIn: 86400 });
          res.send({"token":token})
        }
        else res.status(403).send("Auth Error")
      }
    })
  })
  

  // function sellerValidate(req,res,next){
  //   tokenToId(req.get("token")).then((id)=>{
  //     authorities.findById(id).then((authority)=>{
  //       if(err) res.status(403).send("Token Error")
  //     })
  // })}



  module.exports = router