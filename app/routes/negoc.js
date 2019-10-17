var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next){
    console.log("render: negociacoes - layout: starter - dir: /negociacoes");
    res.render('pages/page-negociacoes', {
        layout: 'starter'
    });
});

module.exports = router;