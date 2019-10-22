var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var router = express.Router();

router.post('/', urlencodedParser, function(req, res) {

    fs.readFile('email.json', (err, data) => {
  
        if (err) throw err;
        var emails = [];
        if (data.toString() !== "") {
            emails = JSON.parse(data);
        }        
        
        var id = 0

        if (emails.length !== 0) {
            id = emails[emails.length - 1].id + 1;
        } 

        email = {
          "id": id,
          "email": req.body.mail
        };
    
        emails.push(email);
    
        var saveMail = JSON.stringify(emails, null, 2);
    
        fs.writeFile('email.json', saveMail, (err, data) => {
          if (err) throw err;
        });

        res.render('addMail', { mail: req.body.mail });
    });
});

module.exports = router;
