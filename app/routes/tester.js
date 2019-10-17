var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next){
    console.log("Hello render: dash - layout: starter");
    res.render('dash', {
        layout: 'starter'
    });
});

module.exports = router;