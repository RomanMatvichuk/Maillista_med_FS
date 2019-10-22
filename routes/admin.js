var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var router = express.Router();

router.post('/', urlencodedParser, function(req, res) {

    
        const user = 'admin';
        const pass = 'test';

        if (user === req.body.user && pass === req.body.pass) {
            fs.readFile('email.json', (err, data) => {
            if (err) throw err;
            var emails = [];
            if (data.toString() !== "") {
                emails = JSON.parse(data);
            }
            res.render('adminList', { data: emails });
            });
        }
        else {
            res.render('adminErr');
        }
    
                
});

router.get('/', function(req, res, next) {
    res.render('admin');
});

module.exports = router;
