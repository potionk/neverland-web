var express = require('express');
var accountModel = require('../models').account;
var router = express.Router();

router.get('/', async(req, res, next) =>{
  try{
    const accounts = await accountModel.findAll();
    res.send({accounts});
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', async(req, res, next) => {
    const account = req.body.account
    const password = req.body.password
    if(!account) {
        return res.status(404).send({error: true, code:1})
    }
    if(!password) {
        return res.status(404).send({error: true, code:2})
    }

    try{
      const accounts = await accountModel.findOne({account});
      if(!accounts){ // DB에 해당 계정이 없음
        return res.status(404).send({error: true, code:3})
      } else {
        if(accounts.password !== password) {
          return res.send({error: true, code:4})
        } else {
          return res.send({
            account: accounts.name,
            loggedInState:true
          });
        }
      }
      
    } catch(error) {
      console.error(error);
      res.send({error: true, code:5})
    }
})

module.exports = router;