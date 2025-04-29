const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Resend } = require("resend");

const app = express();
const resend = new Resend("re_eDuwdfNt_HirRJ7Vmron5E73yceqBKNxG"); // Replace with your Resend API Key

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (index.html)
app.use(express.static(path.join(__dirname, "public")));

// POST route to send emails
app.post("/send", async (req, res) => {
  const { name, email, message, tel, sns, sns_id } = req.body;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified email
      to: "ibrahimaitkazin@gmail.com", // Replace with your recipient email
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telephone:</strong> ${tel}</p>
        <p><strong>SNS:</strong> ${sns}</p>
        <p><strong>SNS:</strong> ${sns_id}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Default route (to show server is running)
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
