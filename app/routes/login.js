var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
    res.render('login/signin', {layout: 'forms', tittle: 'Login Page'});
});


module.exports = router;