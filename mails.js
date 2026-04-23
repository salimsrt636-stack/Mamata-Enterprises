const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "salimsrt636@gmail.com",
        pass: "YOUR_APP_PASSWORD" // not normal password
      }
    });

    await transporter.sendMail({
      from: data.email,
      to: "salimsrt636@gmail.com",
      subject: "New Contact Form Message",
      text: `
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Product: ${data.product}

Message:
${data.message}
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" })
    };
  }
};
