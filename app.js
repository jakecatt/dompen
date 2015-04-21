var express = require('express');
var favicon = require('serve-favicon');
var app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var methodOverride = require("method-override");
var bodyParser = require("body-parser");

var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: 'nickstares0@gmail.com',
        pass: 'keW15gAjhD3qu_RZ5OU3Pw'
    }
}));
//middleware below
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// setup e-mail data with unicode symbols

// send mail with defined transport object
app.get('/', function(req, res){

res.render("index");
})

app.post('/signup', function(req, res){



console.log ("transport", transport.transporter);
console.log("req.body.email",req.body.email);
transport.sendMail(mailOptions, function(error, info){

var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'info@dompen.co', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};


console.log("sendMail is being called")
    if(error){
        console.log(error);
      console.log("error, didn't send")
    }else{
        console.log('Message sent: ' + info.response);
console.log("did send")
    }
});

})

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
