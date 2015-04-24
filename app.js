var express = require('express');
var favicon = require('serve-favicon');
var app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
var transport = nodemailer.createTransport(smtpTransport({

  host: 'smtp.mandrillapp.com',
  port: 587,
  auth: {
    user: process.env.MANDRILL_USRNAME,
    pass: process.env.MANDRILL_API_KEY
  }
}));

//middleware below
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieParser())


app.get('/', function(req, res){
if (req.cookies.verified === "true"){
  res.render("index");
}
else{
res.redirect('/verify')
}
})

app.get('/verify', function(req, res){
res.render("verify")
});

app.post('/signup', function(req, res){
  console.log("req.body",req.body);
if(req.body.email){




  var mailOptionsForRecipient = {
    from: 'DomPen <info@dompen.co>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Thank you for your interest in DomPen', // Subject line
    text: "We'll get back to you", // plaintext body

  };

  var mailOptionsForDompen = {
    from: 'Your Friendly DomPen Bot <info@dompen.co>', // sender address
    to: "info@dompen.co", // list of receivers
    subject: 'yo boy yo amensia', // Subject line
    text: req.body.email + " " + req.body.first_name + " " + req.body.last_name + " " + req.body.company + " " + req.body.city + " " + req.body.phone + " " + req.body.address + " " + req.body.state + " " + req.body.zip + " " + req.body.comment , // plaintext body
  };

  transport.sendMail(mailOptionsForRecipient, function(error, info){
    console.log("sendMail is being called")
    if(error){
      console.log(error);
      console.log("error, didn't send")
    }else{
      console.log('Message sent: ' + info.response);
      console.log("did send")
    }
  });
  transport.sendMail(mailOptionsForDompen, function(error, info){
    console.log("sendMail is being called")
    if(error){
      console.log(error);
      console.log("error, didn't send")
    }else{
      console.log('Message sent: ' + info.response);
      console.log("did send")
    }
  });
}
})
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
