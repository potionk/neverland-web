var express = require('express');
var userModel = require('../models').account;
var router = express.Router();

router.get('/', async(req, res, next) =>{
  try{
    const users = await userModel.findAll();
    // res.render('account', {users});
    res.send({users});
  } catch(error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;