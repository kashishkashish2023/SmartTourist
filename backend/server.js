console.log("🔥 MY CURRENT SERVER.JS IS RUNNING");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const { GoogleGenAI } = require("@google/genai");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ================= AUTH ROUTE =================

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);


// ================= MONGODB =================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});
// ================= BOOKING MODEL =================

const bookingSchema = new mongoose.Schema({

    hotel:{
        type:String,
        required:true
    },

    location:{
        type:String
    },

    amount:{
        type:Number
    },

    bookingId:{
        type:String
    },

    fullName:{
        type:String
    },

    mobile:{
        type:String
    },

    dob:{
        type:String
    },

    paymentStatus:{
        type:String,
        default:"Pending"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});


const Booking = mongoose.model("Booking", bookingSchema);

// ================= BASIC ROUTES =================

app.get("/", (req,res)=>{
    res.send("Backend Running");
});


app.get("/hello",(req,res)=>{
    res.send("Hello Route Working");
});


// ================= RAZORPAY =================

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET

});


app.post("/create-order", async(req,res)=>{

    try{

        const options = {

            amount: req.body.amount * 100,

            currency:"INR",

            receipt:"hotel_booking"

        };


        const order = await razorpay.orders.create(options);


        res.json(order);


    }
    catch(error){

        console.log("RAZORPAY ERROR:",error);

        res.status(500).json({

            message:"Payment failed"

        });

    }

});


// ================= SAVE BOOKING =================

app.post("/api/bookings", async(req,res)=>{

    try{

        const booking = new Booking(req.body);

        await booking.save();


        console.log("BOOKING SAVED:", booking);


        res.json({

            message:"Booking saved successfully",

            booking

        });


    }
    catch(error){

        console.log("BOOKING SAVE ERROR:",error);


        res.status(500).json({

            message:"Booking failed"

        });

    }

});

// UPDATE PAYMENT STATUS

app.put("/api/bookings/payment", async(req,res)=>{

    try{

        const { bookingId } = req.body;


        const booking = await Booking.findOneAndUpdate(

            { bookingId: bookingId },

            {
                paymentStatus:"Paid"
            },

            { new:true }

        );


        res.json({

            message:"Payment status updated",

            booking

        });


    }
    catch(error){

        console.log("PAYMENT UPDATE ERROR:", error);


        res.status(500).json({

            message:"Payment update failed"

        });

    }

});
// ================= GOOGLE PLACES - HOTELS =================


app.get("/hotels", async (req,res)=>{

    try{

        const city = req.query.city;


        if(!city){

            return res.status(400).json({

                message:"City is required"

            });

        }


        const response = await axios.post(

            "https://places.googleapis.com/v1/places:searchText",

            {

                textQuery:`${city} hotels`

            },

            {

                headers:{

                    "Content-Type":"application/json",

                    "X-Goog-Api-Key":
                    process.env.GOOGLE_PLACES_KEY,


                    "X-Goog-FieldMask":
                    "places.id,places.displayName,places.formattedAddress,places.rating,places.photos,places.googleMapsUri"

                }

            }

        );


        res.json(response.data.places || []);


    }
    catch(error){

        console.log(
            "HOTEL ERROR:",
            error.response?.data || error.message
        );


        res.status(500).json({

            message:"Google Places Error"

        });

    }

});



// ================= GOOGLE PLACES - ATTRACTIONS =================

app.get("/attractions", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    // Search attractions
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: `famous tourist attractions in ${city}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.rating,places.googleMapsUri",
        },
      }
    );

    const places = response.data.places || [];

    const result = await Promise.all(
  places.map(async (place) => {

    let photo = null;

    try {

      const imageRes = await axios.get(
        "https://api.pexels.com/v1/search",
        {
          headers: {
            Authorization: process.env.PEXELS_API_KEY,
          },
          params: {
            query: place.displayName?.text,
            per_page: 1,
          },
        }
      );

      if (imageRes.data.photos.length > 0) {
        photo = imageRes.data.photos[0].src.large;
      }

    } catch (err) {
      console.log("Pexels image not found");
    }

    return {
      id: place.id,
      name: place.displayName?.text || "Unknown Place",
      address: place.formattedAddress || "Address not available",
      rating: place.rating || "N/A",
      photo,
      googleMapsUri: place.googleMapsUri || "",
    };

  })
);
    res.json(result);
  } catch (error) {
    console.log(
      "ATTRACTIONS ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to fetch attractions",
    });
  }
});

// ================= NEARBY HOTELS =================

app.get("/nearby-hotels", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: `${city} hotels`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.rating",
        },
      }
    );

    const hotels = (response.data.places || []).slice(0, 5);

    res.json(
      hotels.map((hotel) => ({
        id: hotel.id,
        name: hotel.displayName?.text,
        address: hotel.formattedAddress,
        rating: hotel.rating,
      }))
    );
  } catch (err) {
    console.log(
      "NEARBY HOTEL ERROR:",
      err.response?.data || err.message
    );

    res.status(500).json({
      message: "Failed to fetch nearby hotels",
    });
  }
});

// ================= PLACE DETAILS =================


app.get("/place/:id", async(req,res)=>{


    try{


        const placeId = req.params.id;



        const response = await axios.get(


            `https://places.googleapis.com/v1/places/${placeId}`,



            {

                headers:{


                    "X-Goog-Api-Key":
                    process.env.GOOGLE_PLACES_KEY,



                    "X-Goog-FieldMask":

                    "id,displayName,formattedAddress,rating,websiteUri,nationalPhoneNumber,googleMapsUri,regularOpeningHours,photos"


                }

            }


        );



        res.json(response.data);



    }

    catch(error){


        console.log(

            "PLACE DETAILS ERROR:",

            error.response?.data || error.message

        );



        res.status(500).json({

            message:"Failed to fetch place details"

        });


    }


});

// ================= EMAIL CONTACT =================


const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});



app.post("/api/contact", async(req,res)=>{


    try{


        const {name,email,subject,message}=req.body;



        await transporter.sendMail({


            from:`"Smart Tourism Planner" <${process.env.EMAIL_USER}>`,


            replyTo:email,


            to:[

                "prachikumar7303@gmail.com",

                "kashishkashish2305@gmail.com"

            ],


            subject:`Contact Form: ${subject}`,


            html:`

            <h2>New Contact Query</h2>

            <p><b>Name:</b> ${name}</p>

            <p><b>Email:</b> ${email}</p>

            <p><b>Subject:</b> ${subject}</p>

            <p><b>Message:</b></p>

            <p>${message}</p>

            `


        });



        res.json({

            message:"Message sent successfully"

        });



    }

    catch(error){


        console.log("MAIL ERROR:",error);


        res.status(500).json({

            message:"Failed to send message"

        });


    }


});





// ================= GEMINI CHATBOT =================


const ai = new GoogleGenAI({

    apiKey:process.env.GEMINI_API_KEY

});



app.post("/api/chat", async(req,res)=>{


    console.log("🔥 /api/chat HIT");


    try{


        const {message}=req.body;



        const prompt = `

You are Smart Travel Assistant for Smart Tourism Planner.

Rules:

- Answer only travel related questions.
- Help with destinations, hotels, itinerary, budget, transport and travel tips.
- Keep answers short and friendly.
- If user asks unrelated questions, politely say you only help with travel.

User:
${message}

`;



        const response = await ai.models.generateContent({


            model:"gemini-3.1-flash-lite",


            contents:prompt


        });



        res.json({

            reply:response.text

        });



    }


    catch(error){


        console.log("GEMINI ERROR:");

        console.log(error.message || error);



        res.status(500).json({

            reply:"Sorry! AI is currently unavailable."

        });


    }


});





// ================= SERVER START =================


app.listen(5000,()=>{


    console.log(
        "Backend running on https://smarttourist-mf35.onrender.com"
    );


});