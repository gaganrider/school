
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dangersgagan@gmail.com',
    pass: 'zzknseodngnyduqv'
  }
});
const mailer =(rec,sub,txt)=>{
var mailOptions = {
  from: 'dangersgagan@gmail.com',
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