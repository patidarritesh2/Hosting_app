require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));




const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const axios = require("axios");

app.get("/send-mail", async (req, res) => {
    try {
        const link = `${process.env.APP_BASE_URL}/valentine.html`;

        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: process.env.EMAIL_FROM_NAME,
                    email: process.env.EMAIL_USER,
                },
                to: [{ email: process.env.EMAIL_TO }],
                subject: "A small question for you",
                htmlContent: `
          <h2>Hey 👀</h2>
          <p>I have a small question for you...</p>
          <a href="${link}" style="font-size:18px;color:red;">
            💘 Click Here 💘
          </a>
        `,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        res.send("Mail sent successfully!");
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("Mail sending failed");
    }
});

// app.get("/send-mail", async (req, res) => {


//     try {
//         const link = `${process.env.APP_BASE_URL}/valentine.html`;
//         console.log("🔗 Valentine link created:", link);

//         const mailOptions = {
//             from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
//             to: process.env.EMAIL_TO,
//             subject: "A small question for you",
//             text: `Hey! I have a small question 😊\n${link}`,
//             html: `
//                 <h2>Hey 👀</h2>
//                 <p>I have a small question for you...</p>
//                 <a href="${link}" style="font-size:18px;color:red;">
//                     💘 Click Here 💘
//                 </a>
//             `
//         };

//         console.log("Sending mail...");
//         const info = await transporter.sendMail(mailOptions);

//         console.log("Mail sent:", info.messageId);
//         res.send(" Mail sent successfully!");

//     } catch (error) {
//         console.error("MAIL SENDING FAILED");
//         console.error("Message:", error.message);
//         console.error(error);

//         res.status(500).send("Mail sending failed. Check console.");
//     }
// });

app.listen(process.env.PORT || 3000, () => {
    console.log(` Server running on http://localhost:${process.env.PORT || 3000}`);
});
