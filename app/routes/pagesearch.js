var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next){
    console.log("render: page-consultors - layout: starter - dir: /search ");
    res.render('pages/page-consultors', {
        layout: 'starter'
    });
});


module.exports = router;