import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function HotelBooking() {
  useEffect(() => {
  window.scrollTo(0, 0);

  if (cityFromUrl) {
    setSearch(cityFromUrl);
  }
}, []);

  const defaultHotels = [
  {
    displayName: { text: "Taj Palace, New Delhi" },
    formattedAddress: "Chanakyapuri, New Delhi",
    rating: 4.7,
    priceLevel: "PRICE_LEVEL_MODERATE",
  },
  {
    displayName: { text: "The Lalit New Delhi" },
    formattedAddress: "Fire Brigade Lane, Barakhamba, New Delhi",
    rating: 4.4,
    priceLevel: "PRICE_LEVEL_MODERATE",
  },
  {
    displayName: { text: "The Oberoi, New Delhi" },
    formattedAddress: "Dr Zakir Hussain Marg, New Delhi",
    rating: 4.8,
    priceLevel: "PRICE_LEVEL_EXPENSIVE",
  },
  {
    displayName: { text: "The Imperial, New Delhi" },
    formattedAddress: "Janpath, Connaught Place, New Delhi",
    rating: 4.6,
    priceLevel: "PRICE_LEVEL_EXPENSIVE",
  },
];
const [searchParams] = useSearchParams();

const cityFromUrl = searchParams.get("city") || "";
  const [search, setSearch] = useState("");
  const [hotels, setHotels] = useState(defaultHotels);
  //const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedHotel, setSelectedHotel] = useState(null);

  const [bill, setBill] = useState(null);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");


  /* const hotels = [
     {
       id:1,
       name:"Taj Palace",
       location:"Delhi",
       price:5000
     },
     {
       id:2,
       name:"The Oberoi",
       location:"Mumbai",
       price:7000
     },
     {
       id:3,
       name:"ITC Grand",
       location:"Kolkata",
       price:4500
     },
     {
       id:4,
       name:"Hyatt Regency",
       location:"Bangalore",
       price:6000
     }
   ];*/

  async function searchHotels() {

    if (!search) {
      alert("Enter city name");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/hotels?city=${search}`
      );

      const data = await response.json();

      console.log("HOTELS LENGTH:", data.length);
      console.log("FIRST HOTEL:", data[0]);

      console.log("REAL HOTELS:", data);

      setHotels(data);

      setLoading(false);

    }
    catch (error) {

      console.log(error);
      alert("Hotel search failed");
      setLoading(false);

    }

  }
  useEffect(() => {
  if (cityFromUrl) {
    setSearch(cityFromUrl);

    setTimeout(() => {
      fetch(`http://localhost:5000/hotels?city=${encodeURIComponent(cityFromUrl)}`)
        .then((res) => res.json())
        .then((data) => {
          setHotels(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 100);
  }
}, [cityFromUrl]);

  /* const filteredHotels = hotels.filter((hotel)=>{
 
     return (
       hotel.name.toLowerCase()
       .includes(search.toLowerCase())
 
       ||
 
       hotel.location.toLowerCase()
       .includes(search.toLowerCase())
     )
 
   });*/



  async function confirmBooking() {

    console.log("CONFIRM BOOKING CLICKED");
    
    if (!fullName || !mobile || !dob) {

      alert("Please fill all booking details first!");

      return;

    }

    if (fullName.trim().length < 3) {
      alert("Please enter a valid full name.");
      return;
    }

    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }


    const newBill = {

      hotel: selectedHotel.displayName?.text,

      location: selectedHotel.formattedAddress,

      amount:
        selectedHotel.priceLevel === "PRICE_LEVEL_INEXPENSIVE"
          ? 2500
          : selectedHotel.priceLevel === "PRICE_LEVEL_MODERATE"
            ? 5000
            : selectedHotel.priceLevel === "PRICE_LEVEL_EXPENSIVE"
              ? 8000
              : selectedHotel.priceLevel === "PRICE_LEVEL_VERY_EXPENSIVE"
                ? 12000
                : 5000,

      bookingId: "BK" + Math.floor(Math.random() * 100000)

    };

   const bookingData = {

    ...newBill,

    fullName,
    mobile,
    dob

};


try{

    const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(bookingData)
        }
    );


    const result = await response.json();

    console.log("DATABASE RESPONSE:", result);


    setBill(newBill);

    setSelectedHotel(null);


}
catch(error){

    console.log(error);

    alert("Booking not saved");

}
  }



  async function payNow() {

    try {

      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: bill.amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Order creation failed");
      }

      const order = await response.json();

      console.log(order);

      const options = {

        key: "rzp_test_TErJKD1Q5E7dKH", // 👈 Apni Razorpay Test Key ID yahan paste karo

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Smart Tourist",

        description: "Hotel Booking",

        handler: async function (response) {

    console.log("PAYMENT SUCCESS:", response);


    await fetch("http://localhost:5000/api/bookings/payment",{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            bookingId: bill.bookingId

        })

    });


    alert("Payment Successful!");

},

        prefill: {

          name: "Guest",

          email: "guest@gmail.com",

          contact: "9999999999"

        },

        theme: {

          color: "#3399cc"

        }

      };

      const razor = new window.Razorpay(options);


      razor.on("payment.failed", function (error) {

        console.log("PAYMENT FAILED FULL:", error);

        console.log("ERROR DETAILS:", error.error);

        alert(error.error.description);

      });


      razor.open();

    } catch (error) {

      console.error(error);

      alert("Payment Failed");

    }

  }




  return (
    <>
      <Navbar />

      <div className="hotel-container">


        <h1>Find Your Hotel</h1>



        <input
          className="search-box"
          placeholder="Search hotel or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHotels();
            }
          }}
        />





        <div className="hotel-list">


          {
            hotels.map((hotel) => (


              <div className="hotel-card" key={hotel.displayName?.text}>


                <h2>
                  {hotel.displayName?.text}
                </h2>

                <p>
                  📍 {hotel.formattedAddress}
                </p>

                <p>
                  ⭐ {hotel.rating || "No rating"}
                </p>



                <button
                  onClick={() => setSelectedHotel(hotel)}
                >
                  Book Now
                </button>



              </div>


            ))
          }



        </div>





        {
          selectedHotel &&


          <div className="booking-box">


            <h2>Booking Details</h2>


            <h3>
              {selectedHotel.displayName?.text}
            </h3>



            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setFullName(value);
              }}
            />


            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setMobile(value);
              }}
            />


            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />


            <button
              onClick={confirmBooking}
            >
              Confirm Booking
            </button>



            <button
              className="cancel"
              onClick={() => setSelectedHotel(null)}
            >
              Cancel
            </button>



          </div>

        }






        {
          bill &&


          <div className="booking-box">


            <h2>Hotel Invoice</h2>


            <p>
              Booking ID : {bill.bookingId}
            </p>


            <p>
              Hotel : {bill.hotel}
            </p>


            <p>
              Location : {bill.location}
            </p>



            <h2>
              Total ₹{bill.amount}
            </h2>



            <button
              onClick={payNow}
            >
              Pay Now
            </button>

            <button
  className="cancel"
  onClick={() => {
    setBill(null);
  }}
>
  Cancel
</button>



          </div>


        }



      </div>
      <Footer />

    </>
  );

}


export default HotelBooking;