const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const emailUser = process.env.VITE_EMAIL_USER;
const emailPass = process.env.VITE_EMAIL_PASS;

const app = express();
app.use(bodyParser.json());
app.use(cors());


const resetCodes = {};


const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

app.post("/api/send-reset-code", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send({ message: "Email is required" });

  const resetCode = crypto.randomInt(100000, 999999).toString();

  resetCodes[email] = resetCode;

  try {
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset Code",
      html: `
<!DOCTYPE html>
<html>
<head>
    <title>TrailMarket Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #6B66FB, #282667);
            color: #fff;
            padding: 20px;
        }

        .content {
            padding: 20px;
        }

        .reset-code {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .footer {
            text-align: center;
            padding: 10px;
            border-top: 1px solid #ccc;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TrailMarket Password Reset</h1>
        </div>
        <div class="content">
            <p>Hello Trailblazer,</p>
            <p>We received a request to reset your password for your TrailMarket account. Below is your reset code:</p>
            <div class="reset-code">${resetCode}</div>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Thank you,</p>
            <p><b>The TrailMarket Support Team</b></p>
        </div>
        <div class="footer">
            <p>This is an automated email from TrailMarket. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
    `
    });

    res.status(200).send({ message: "Reset code sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Error sending reset code" });
  }
});

app.post("/api/verify-reset-code", (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).send({ message: "Email and code are required" });
  }

  if (resetCodes[email] === code) {

    delete resetCodes[email];
    return res.status(200).send({ message: "Code verified" });
  } else {
    return res.status(400).send({ message: "Invalid or expired code" });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});