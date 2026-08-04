/*import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function DestinationCard({ place }) {

  const navigate = useNavigate();

  return (
    <div className="destination-card">

      <img 
        src={place.image} 
        alt={place.name} 
      />

      <div className="destination-info">

        <h3>{place.name}</h3>

        <p>📍 {place.location}</p>

        <div className="destination-bottom">

          <span>{place.price}</span>

          <span>⭐ {place.rating}</span>

        </div>


        <Link to={`/attractions?city=${place.name}`}>
  <button>Explore</button>
</Link>


      </div>

    </div>
  );
}

export default DestinationCard;*/

import { Link } from "react-router-dom";

function DestinationCard({ place }) {
  return (
    <div className="destination-card">

      <img
        src={place.image}
        alt={place.name}
      />

      <div className="destination-info">

        <h3>{place.name}</h3>

        <p>📍 {place.location}</p>

        <div className="destination-bottom">
          <span>{place.price}</span>
          <span>⭐ {place.rating}</span>
        </div>

        <Link to={`/attractions?city=${place.name}`}>
          <button>Explore</button>
        </Link>

      </div>

    </div>
  );
}

export default DestinationCard;