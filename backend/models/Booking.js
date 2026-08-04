const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    hotelName: {
        type: String,
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    checkIn: {
        type: String,
        required: true
    },

    checkOut: {
        type: String,
        required: true
    },

    guests: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        default: "Pending"
    },

    bookingDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Booking", bookingSchema);