const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "alexkingsley2@gmail.com",
    pass: config.elasticEmailApiKey,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "alexkingsley2@gmail.com",
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
