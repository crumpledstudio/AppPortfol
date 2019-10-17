var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
	console.log("Hello render: pages/pageone - layout: starter");
    res.render('pagetwo', {layout: 'starter'});
});


/*
router.get('/two', function (req, res, next) {
	console.log("Hello render: pages/two - layout: starter");
    res.render('pages/pagetwo', {layout: 'starter'});
});
*/

module.exports = router;