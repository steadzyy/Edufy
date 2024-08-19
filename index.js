
//  "qwertyrahmaaulia@gmail.com, daffazuhdii132@gmail.com"

const email = {}
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahma3aulia@gmail.com',
    pass: 'rarm qjad puuw okve'
  }
});

var mailOptions = {
  from: 'registration@happylearn.ac.id',
  to: "kosonginaja@gmail",
  subject: 'Register Success',
  text: `'Welcome (nama) as (role)'`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = {transporter, mailOptions}