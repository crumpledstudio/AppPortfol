var express = require('express');
var router = express.Router();


/*
router.get('/', function(req, res, next){
    console.log("render: tempdash - layout: templay");
    res.render('skeleton/tempdash', {
        layout: 'templay'
    });
});
*/


/*router.get('/', function(req, res, next){
    console.log("render: dashiboard - layout: templay");
    res.render('skeleton/dashiboard', {
        layout: 'templay'
    });
});*/

router.get('/', function(req, res, next){
    console.log("render: dashiboard - layout: starter");
    res.render('skeleton/dashiboard', {
        layout: 'starter'
    });
});


module.exports = router;