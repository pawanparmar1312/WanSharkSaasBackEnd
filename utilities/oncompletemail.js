var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');



const sendEmailOnComplete = async (options)=>{

  const transporter = await nodemailer.createTransport( sendgridTransport({
    auth:{
      api_key:process.env.SENDGRID_KEY
    }
  }));
   
  const mailOptions ={
    to:options.email,
    from: 'vowjewellerycollections@gmail.com',
    subject:'Vow golds - Scheme Completedt',
    html:`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Vow Golds Invoice</title>
        <style>
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }
        
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }
        
        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }
        
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }
        
        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }
        
        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }
        
        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }
        
        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.item td{
            border-bottom: 1px solid #eee;
        }
        
        .invoice-box table tr.item.last td {
            border-bottom: none;
        }
        
        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }
        
        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }
            
            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
        
        /** RTL **/
        .rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
        
        .rtl table {
            text-align: right;
        }
        
        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <h5>Vow Golds Investment</h5>
                                </td>
                                
                                <td>
                                    Invoice #: ${options.invoiceno}<br>
                                    Created: ${options.date}<br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    ${options.address}
                                </td>
                                
                                <td>
                                    ${options.name}<br>
                                    ${options.number}<br>
                                    ${options.email}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <tr class="heading">
                    <td>
                        Scheme Amount
                    </td>
                    
                    <td>
                        Duration
                    </td>
                </tr>
                
                <tr class="details">
                    <td>
                        ${options.schemeamount}
                    </td>
                    
                    <td>
                        ${options.schemeduration}
                    </td>
                </tr>
                
                <tr class="heading">
                    <td>
                        Name
                    </td>
                    
                    <td>
                        Amount
                    </td>
                </tr>
                
                <tr class="item">
                    <td>
                        Total scheme amount
                    </td>
                    
                    <td>
                        ${options.totalschemeamount}
                    </td>
                </tr>
                
                <tr class="item">
                    <td>
                        Bonus Amount
                    </td>
                    
                    <td>
                        ${options.bonusamount}
                    </td>
                </tr> 
                <tr class="total">
                    <td></td>
                    
                    <td>
                       Bonus Amount To Callect : ${options.bonusamount}
                    </td>
                </tr>
            </table><br><br><br><br>
            <h3>Stamp&Sign</h3>
        </div>
    </body>
    </html>`
  }

  return await transporter.sendMail(mailOptions);

}

module.exports = sendEmailOnComplete;