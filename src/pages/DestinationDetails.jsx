import { useParams, useNavigate } from "react-router-dom";
import destinations from "../data/destination";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


function DestinationDetails(){

const {id} = useParams();

const navigate = useNavigate();


const place = destinations.find(
(item)=> item.id === Number(id)
);


return(
<>
<Navbar />


<section className="planner-container">

<div className="planner-card">


<img 
src={place.image}
alt={place.name}
width="100%"
/>


<h1>{place.name}</h1>


<p>
📍 {place.location}
</p>


<p>
⭐ Rating : {place.rating}
</p>


<p>
💰 Approx Budget : {place.price}
</p>


<h2>
Top Attractions
</h2>


<p>
🏔 Famous sightseeing places
<br/>
🍛 Local Food Experience
<br/>
📸 Photography Spots
</p>



<button

onClick={()=>navigate(`/hotels/${place.id}`)}

>

View Hotels

</button>



</div>

</section>


<Footer />

</>
)

}


export default DestinationDetails;