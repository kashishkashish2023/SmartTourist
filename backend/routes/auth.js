const express = require("express");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();


// Password Hash Function
function hashPassword(password) {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
}



// ===================== SIGNUP =====================

router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const cleanEmail = email.toLowerCase();

        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = new User({
            name,
            email: cleanEmail,
            password: hashPassword(password)
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {

        console.log("SIGNUP ERROR:", error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});



// ===================== LOGIN =====================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required"
            });
        }

        const cleanEmail = email.toLowerCase();

        const user = await User.findOne({
            email: cleanEmail
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const hashedPassword = hashPassword(password);

        if (hashedPassword !== user.password) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});



// ===================== GOOGLE LOGIN =====================

router.post("/google", async (req, res) => {

    console.log("🔥 LOGIN API HIT");
    console.log(req.body);

    try {

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and Email are required"
            });
        }

        const cleanEmail = email.toLowerCase();

        let user = await User.findOne({
            email: cleanEmail
        });

        if (!user) {

            user = new User({
                name,
                email: cleanEmail,

                // Dummy password for Google users
                password: hashPassword("google_login")
            });

            await user.save();

        }

        res.json({

            message: "Google Login Successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        console.log("GOOGLE LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});



module.exports = router;