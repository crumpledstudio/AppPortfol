var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
    res.render('login/register', {layout: 'forms', tittle: 'Register Page'});
});


module.exports = router;