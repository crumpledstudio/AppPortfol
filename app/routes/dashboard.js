var express = require('express');
var router = express.Router();


/*
router.get('/', function (req, res, next) {
	console.log("Hello render: dash - layout: schema");
    res.render('dash', {layout: 'schema'});
});
*/
router.get('/', function (req, res, next) {
	console.log("Hello render: dashboard/intro - layout: starter");
    res.render('dashboard/intro', {layout: 'starter'});
});

module.exports = router;