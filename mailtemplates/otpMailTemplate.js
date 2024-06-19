const otpMailTemplate = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            background-color: #f1f1f1;
            color: #777;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>DSA App</h1>
        </div>
        <div class="content">
            <p>Hi ${data.name},</p>
            <p>Thank you for using our DSA app. To complete your verification, please use the following One-Time Password (OTP):</p>
            <div class="otp">${data.otp}</div>
            <p>This OTP is valid for 5 minutes. Please do not share this code with anyone.</p>
            <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
            <p>Best regards,<br>The DSA App Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 DSA App. All rights reserved.</p>
            <p><a href="https://dsa-app.com">Visit our website</a> | <a href="mailto:support@dsa-app.com">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
`

module.exports = otpMailTemplate