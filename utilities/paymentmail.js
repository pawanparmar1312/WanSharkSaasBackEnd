var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');



const sendEmailPayment = async (options)=>{

  const transporter =await nodemailer.createTransport( sendgridTransport({
    auth:{
      api_key:process.env.SENDGRID_KEY
    }
  }));
   
  const mailOptions ={
    to:options.email,
    from: 'vowjewellerycollections@gmail.com',
    subject:'Vow golds - Payment Receipt',
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
            <p>Thank you for your payment of INR ${options.amount}/-. </p>
            <p>Amount: INR ${options.amount}</p>
            <p>Gold accumulated: ${options.gold} g</p>
            <p>For any queries or discrepancies feel free to contact us on vowgoldinvestments@gmail.com or call us at +91-8180003620/8850117022.</p>
        </div>
    </body>
    </html>`
  }

  return await transporter.sendMail(mailOptions);

}

module.exports = sendEmailPayment;