var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next){
    res.render('teste', {
        layout: 'starter'
    });
});

module.exports = router;