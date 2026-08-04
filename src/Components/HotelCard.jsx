function HotelCard({hotel}){

return(

<div className="hotel-card">


<img
src={hotel.image}
alt={hotel.name}
/>


<h2>
{hotel.name}
</h2>


<p>
📍 {hotel.location}
</p>


<p>
⭐ {hotel.rating}
</p>


<h3>
₹{hotel.price}/night
</h3>


{
hotel.amenities.map((item,index)=>(

<p key={index}>
✅ {item}
</p>

))
}


<button>
Book Now
</button>


</div>

)

}


export default HotelCard;