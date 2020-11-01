var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');



const sendEmail = async (options)=>{

  const transporter =await nodemailer.createTransport( sendgridTransport({
    auth:{
      api_key:process.env.SENDGRID_KEY
    }
  }));
   
  const mailOptions ={
    to:options.email,
    from: 'absark178@gmail.com',
    subject:'Forgot Password',
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div style="text-align: center;
        background: rgb(36, 110, 206);
        color: white; padding: 15px 0px;"> 
            <h2 style="margin: 0px;">Vow Golds</h2>
            
        </div>
        <div>
            <p>To reset your password , please copy the below verification token.</p>
            <p>Your password reset token (valid for 10 min).</p>
            <p><span style="margin-right:10px">Copy:</span> 
            <span style=" -webkit-user-select: all; 
            -moz-user-select: all;    
            -ms-user-select: all;      
            user-select: all; 
            color:rgb(36, 110, 206)" >${options.token}
            </span> 
            </p>
        </div>
    </body>
    </html>`
  }

  return await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;