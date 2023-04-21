
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: <your@email.com>,
    pass: <password>
  }
});
const mailer =(rec,sub,txt)=>{
var mailOptions = {
  from: <your@email.com>,
  to: rec,
  subject: sub,
  text: txt
};

 transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});}

module.exports=mailer
