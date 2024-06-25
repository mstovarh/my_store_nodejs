const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport

  const emailBody = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenida</title>
  <style>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #F11E3E;
    color: #333;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #F02658;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      }
          .header {
            background-color: #F11E3E;
            color: #ffffff;
              text-align: center;
              padding: 20px;
          }
          .content {
            padding: 20px;
            text-align: center;
            }
            .footer {
              background-color: #FFA5AA;
              color: #000000;
              text-align: center;
              padding: 10px;
              font-size: 12px;
              }
              </style>
  </head>
  <body>
  <div class="container">
  <div class="header">
              <h1>Bienvenida</h1>
              </div>
              <div class="content">
              <p>Hola, bienvenida</p>
              </div>
              <div class="footer">
              <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
              </div>
              </div>
              </body>
              </html>
              `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: 'emisor@gmail.com', //email with Password App
      pass: '', //Password App
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'emisor@gmail.com', // sender address
    to: 'name1@gmail.com, name2@gmail.com', // list of receivers REEMPLAZAR
    subject: 'Este es un nuevo correo', // Subject line
    text: 'Hola, este es un nuevo correo', // plain text body
    html: emailBody, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail();
