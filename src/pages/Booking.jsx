import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Booking() {

    const location = useLocation();
    const navigate = useNavigate();

    const hotel = location.state;

    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    const amount = hotel?.price || 3000;

    const handleBooking = async () => {

        try {

            // Save booking
            await axios.post("https://smarttourist-mf35.onrender.com/api/booking", {

                hotelName: hotel.name,
                customerName,
                email,
                checkIn,
                checkOut,
                guests,
                amount

            });

            // Create Razorpay Order
            const order = await axios.post(
                "https://smarttourist-mf35.onrender.com/api/payment/create-order",
                {
                    amount
                }
            );

            const options = {

                key: "YOUR_RAZORPAY_KEY_ID",

                amount: order.data.amount,

                currency: order.data.currency,

                order_id: order.data.id,

                name: "SmartTourist",

                description: "Hotel Booking",

                handler: function () {

                    alert("Payment Successful");

                    navigate("/payment-success");

                }

            };

            const razor = new window.Razorpay(options);

            razor.open();

        }

        catch (err) {

            console.log(err);

            alert("Booking Failed");

        }

    };

    return (

        <div style={{padding:"40px"}}>

            <h1>{hotel.name}</h1>

            <h3>₹ {amount}</h3>

            <input
            placeholder="Name"
            onChange={(e)=>setCustomerName(e.target.value)}
            />

            <br/><br/>

            <input
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            />

            <br/><br/>

            <input
            type="date"
            onChange={(e)=>setCheckIn(e.target.value)}
            />

            <br/><br/>

            <input
            type="date"
            onChange={(e)=>setCheckOut(e.target.value)}
            />

            <br/><br/>

            <input
            type="number"
            value={guests}
            onChange={(e)=>setGuests(e.target.value)}
            />

            <br/><br/>

            <button onClick={handleBooking}>

                Pay & Book

            </button>

        </div>

    );

}

export default Booking;