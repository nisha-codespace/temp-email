const Mailbox = require("./Mailbox");
const Email = require("./Email");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

app.post("/api/emails", async (req, res) => {
    try {
        const { to, from, subject, message } = req.body;

        const email = new Email({
            to,
            from,
            subject,
            message
        });

        await email.save();

        res.status(201).json({
            message: "Email saved successfully",
            email
        });

    } catch (error) {
        console.log("Error saving email:", error);

        res.status(500).json({
            message: "Failed to save email"
        });
    }
});

app.get("/api/emails/:email", async (req, res) => {
    try {
        const emails = await Email.find({
            to: req.params.email
        }).sort({
            receivedAt: -1
        });

    res.json(emails);

} catch (error) {
    console.log("Error fetching emails:", error);

    res.status(500).json({
        message: "Failed to fetch emails"
    });
}
});

app.post("/api/mailboxes", async (req, res) => {
    try {
        const randomnumbers = Math.floor(Math.random() * 1000000);

        const email = `user${randomnumbers}@tempemail.com`;

        const mailbox = new Mailbox({
            email: email
        });

        await mailbox.save();

        res.status(201).json({
            email: email
        });

    } catch (error) {
        console.log("Error creating mailbox:", error);

        res.status(500).json({
            message: "Failed to create mailbox"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});