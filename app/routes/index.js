var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
    console.log("Hello home");
    res.render('index', {layout: 'login'});
});


module.exports = router;