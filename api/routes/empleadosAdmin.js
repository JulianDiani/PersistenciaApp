var express = require("express");
var router = express.Router();
const jwt=require('jsonwebtoken');
const keys= require('../settings/keys')
var app = express();
app.set('key',keys.key)
router.post('/',(req,res)=>{
    if (req.body.usuario=='admin'&& req.body.password=='admin'){
      const payload={
          check:true
      };
      const token =jwt.sign(payload,app.get('key'),{
          expiresIn :'7d'
      })
      res.json({
          message:"autenticado",
          token: token
      })
  }else{
      res.json({
          message:"Usuario/password incorrectos."
      })
  }
  });
  module.exports=router;