const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //creating a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //Defining the email options
  const mailOptions = {
    from: "Your Email msulemanpro@gmail.com",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
