const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.json({
        "sucess": true
    })
 });
router.post('/', function(req, res){
    res.json({
        "sucess": true
    })
 });

//Routes will go here
module.exports = router;