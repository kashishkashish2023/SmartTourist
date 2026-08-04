/*import destinations from "../data/destination";
import DestinationCard from "./DestinationCard";

function Destinations() {
  return (
    <section className="destinations">
      <h2>Popular Destinations</h2>
      <p>Explore India's best tourist places.</p>

      <div className="destination-grid">
        {destinations.map((place) => (
          <DestinationCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}

export default Destinations;*/

/*import destinations from "../data/destination";
import DestinationCard from "./DestinationCard";

function Destinations() {
  return (
    <section className="destinations">
      <div className="destination-grid">
        {destinations.map((place) => (
          <DestinationCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}

export default Destinations;*/

/*import { useState } from "react";
import { Search } from "react-feather";
import destinations from "../data/destination";
import DestinationCard from "./DestinationCard";

function Destinations() {

  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="destinations">

      <div className="search-box">

        <Search size={20} className="search-icon" />

        <input
          type="text"
          placeholder="Search Destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="destination-grid">

        {filteredDestinations.map((place) => (
          <DestinationCard key={place.id} place={place} />
        ))}

      </div>

    </section>
  );
}

export default Destinations;*/

import { useState } from "react";
import { Search } from "react-feather";
import { useNavigate } from "react-router-dom";
import destinations from "../data/destination";
import DestinationCard from "./DestinationCard";

function Destinations() {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredDestinations = destinations.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/attractions?city=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="destinations">

      <form className="search-box" onSubmit={handleSearch}>

        <Search size={20} className="search-icon" />

        <input
          type="text"
          placeholder="Search any destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </form>

      <div className="destination-grid">

        {filteredDestinations.map((place) => (
          <DestinationCard
            key={place.id}
            place={place}
          />
        ))}

      </div>

    </section>
  );
}

export default Destinations;