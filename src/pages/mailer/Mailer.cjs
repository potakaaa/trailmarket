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
      text: `Your password reset code is: ${resetCode}`,
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