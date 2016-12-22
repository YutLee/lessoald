var express = require('express');
var router = express.Router();
var async = require('async');
var reqConfig = require('../reqConfig');

/* GET home page. */
router.get('/', function(req, res, next) {
	async.mapLimit([reqConfig.host + '/v1/auth/login/code', reqConfig.host + '/v1/auth/login/mobile/precheck'], 2, function(key, callback) {
		if(key.match(/code/)) {
			start = Date.now();
		}
		reqConfig.request.post({
			url: key,
			form: {mobile:'13641489962'}
		}, function(err, response, body) {
			// console.log('-----------', body);
			callback(null, body);
		});
	}, function(err, results) {
		if(err) {
			next();
		}
		// console.log('========', results);
		// var data = Object.assign(JSON.parse(results[0]), JSON.parse(results[1]));
		res.render('test/index', {title: 'LESSO-CLOUD', data1: JSON.parse(results[0]), data2: JSON.parse(results[1])});
	});

	// var start = Date.now();

	// async.map([1, 2], function(key, callback) {
	// 	if(key == 1) {
	// 		setTimeout(function() {
	// 			callback(null, key);
	// 		}, 1000);
	// 	}else {
	// 		setTimeout(function() {
	// 			callback(null, key);
	// 		}, 2000);
	// 	}
	// }, function(err, results) {
	// 	if(err) {
	// 		next();
	// 	}
	// 	console.log(Date.now() - start);// >= 2000
	// });

	// async.mapLimit([1, 2], 2, function(key, callback) {
	// 	if(key == 1) {
	// 		setTimeout(function() {
	// 			callback(null, key);
	// 		}, 1000);
	// 	}else {
	// 		setTimeout(function() {
	// 			callback(null, key);
	// 		}, 2000);
	// 	}
	// }, function(err, results) {
	// 	if(err) {
	// 		next();
	// 	}
	// 	console.log(Date.now() - start);// >= 2000
	// });

	// async.mapSeries([1, 2], function(key, callback) {
	// 	if(key == 1) {
	// 		setTimeout(function() {
	// 			callback(null, key);
	// 		}, 1000);
	// 	}else {
	// 		setTimeout(function() {
	// 			callback(null, key);
	// 		}, 2000);
	// 	}
	// }, function(err, results) {
	// 	if(err) {
	// 		next();
	// 	}
	// 	console.log(Date.now() - start);// >= 3000
	// });

	// res.render('test/index', {title: 'LESSO-CLOUD'});
});

module.exports = router;
