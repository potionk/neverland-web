var express = require('express');
var charactersModel = require('../models').characters;
var router = express.Router();

router.get('/get_ranking', async (req, res, next) => {
    const characters = await charactersModel.findAll({
     attributes: ['name', 'level', 'exp', 'job', 'gm', 'createdate'],
     where:{gm:0},
     order: [
             ['level','DESC'],
             ['exp','DESC'],
             ['name', 'ASC'],
            ]
    });
    try {
        res.send({ characters });
    } catch (error) {
        console.log(error);
        res.send({
            error:true,
            errorCode:1
        });
    }
});

module.exports = router;