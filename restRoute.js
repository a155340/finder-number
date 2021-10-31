const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    console.log('get-log', req.params, req.body);
    res.json({
        "sucess": true
    })
 });
router.post('/', function(req, res){
    console.log('post-log', req.params, req.body);
    res.json({
        "sucess": true
    })
 });

//Routes will go here
module.exports = router;