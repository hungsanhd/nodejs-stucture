import nodemailer from "nodemailer";

const sendMail = (mail_received: string, content: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: mail_received,
    subject: "Reset password",
    html: `<h1>password recovery</h1><p>${content}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info);
    }
  });
};

export default sendMail;
