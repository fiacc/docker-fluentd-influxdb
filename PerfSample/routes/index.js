var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/* receive timing data from the client and post it to fluentd  */
router.post('/perf', function (req, res) {
	var data = JSON.stringify(req.body);
	
    
	var hostname = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host

	var fluentdURL = 'http://localhost:8888/perf.' + hostname + '.timing';
	console.log('Posting to:' + fluentdURL);
	console.log('With: ' + data);

	request.post(fluentdURL, { form: { json: data } },function (error, response, body) {
    	console.log('fluentd response ' + response.statusCode + ' ' + body);
    	res.status(response.statusCode);
      	res.send();
		}
	);

});

module.exports = router;