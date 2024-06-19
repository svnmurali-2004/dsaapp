const contactusMailTemplate = (data) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Acknowledgement</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
          }
          p, ul {
            line-height: 1.6;
            font-size: 16px;
            color: #666666;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin-top: 20px;
          }
          ul li {
            margin-bottom: 10px;
          }
          strong {
            font-weight: bold;
          }
          .thank-you {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            border-radius: 4px;
            margin-top: 20px;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #999999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${data.name},</p>
          
          <p>We have received your message and will get back to you as soon as possible.</p>
          
          <p>Here are the details you provided:</p>
          
          <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Message:</strong> ${data.message}</li>
          </ul>
          
          <p class="thank-you">Thank you again for contacting us. We appreciate your interest.</p>
          
          <p class="footer">Best regards,<br>My Dsa App</p>
        </div>
      </body>
      </html>
    `;
  }
  
  module.exports = contactusMailTemplate;
  