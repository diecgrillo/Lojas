var nodemailer = require('nodemailer');
var express = require('express');
var emailRouter = express.Router();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'applicristy@gmail.com',
    pass: 'licristy12345'
  }
});

var mailOptions = {
  from: 'applicristy@gmail.com',
  to: 'grillodie@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!\nMy test with line break'
};

emailRouter.route('/')
.post(function (req, res, next){
    var text = "";
    if(req.body.name){
        text += "Nome: " + req.body.name + '\n';
    } else {
        text += "Nome: desconhecido\n";
    }
    if(req.body.tel && req.body.tel.number){
        if(req.body.tel.areaCode) {
            text += "Telefone: (" + req.body.tel.areaCode + ") " + req.body.tel.number + '\n';
        } else {
            text += "Telefone: " + req.body.tel.number + '\n';
        }
    } else {
        text += "Telefone: não informado pelo usuário\n";
    }
    if(req.body.email) {
        text += "Email: " + req.body.email + '\n';
    } else {
        text += "Email: não informado pelo usuário\n";
    }
    if(req.body.text){
        text += "Mensagem:\n" + req.body.text + '\n';
    } else {
        text += "Mensagem:\n{vazio}";
    }

    mailOptions.text = text;
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            err.status = 400;
            return next(err);
        } else {
            console.log('Email sent: ' + info.response);
            res.json(info.response);
        }
    });
});

module.exports = emailRouter;
