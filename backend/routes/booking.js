const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json({
            message: "Booking Created",
            booking
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.get("/", async (req, res) => {

    const bookings = await Booking.find();

    res.json(bookings);

});

module.exports = router;