var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');



const sendEmailWelcome = async (options)=>{

  const transporter =await nodemailer.createTransport( sendgridTransport({
    auth:{
      api_key:process.env.SENDGRID_KEY
    }
  }));
   
  const mailOptions ={
    to:options.email,
    from: 'vowjewellerycollections@gmail.com',
    subject:'Welcome to Vow golds Investment',
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
            <p>Thank you for choosing Vow Gold Investment,</p>
            <p>Your account has been created with us and your username/email is “${options.email}”. </p>
            <p>Kindly login to the app with your username and password.</p>
            <p>Login to check your profile, monthly passbook, to make payments and to check daily gold, silver and diamond rates</p>
            <p>Happy Investing! :)</p>
        </div>
    </body>
    </html>`
  }

  return await transporter.sendMail(mailOptions);

}

module.exports = sendEmailWelcome;