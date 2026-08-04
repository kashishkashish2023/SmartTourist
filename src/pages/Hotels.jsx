import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HotelCard from "../Components/HotelCard";
import hotels from "../data/hotels";
import BackToHome from "../Components/BackToHome";
import { useEffect } from "react";

function Hotels(){
    
    useEffect(() => {
  window.scrollTo(0,0);
}, []);

return(

<>

<Navbar/>

 <BackToHome />

<div className="hotel-container">

<h1>

Available Hotels

</h1>

<div className="hotel-grid">

{

hotels.map((hotel)=>

<HotelCard

key={hotel.id}

hotel={hotel}

/>

)

}

</div>

</div>

<Footer/>

</>

)

}

export default Hotels;