var express = require('express');
var router = express.Router();

/*
router.get('/landing', function (req, res) {
    res.render('home', {layout: 'intro'});
});
*/

router.get('/', function(req, res, next){
    res.render('landing', {
        layout: 'layout',
        message: "Hello World",
        subheading: "Hello from express JS"
    });
});

module.exports = router;