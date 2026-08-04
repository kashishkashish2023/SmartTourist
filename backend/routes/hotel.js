const express = require("express");
const router = express.Router();

const Hotel = require("../models/Hotel");


// Search hotels

router.get("/", async(req,res)=>{

    try{

        const search = req.query.search || "";


        const hotels = await Hotel.find({

            $or:[

                {
                    name:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    location:{
                        $regex:search,
                        $options:"i"
                    }
                }

            ]

        });


        res.json(hotels);


    }catch(error){

        res.status(500).json({
            message:"Server Error"
        });

    }

});


module.exports = router;