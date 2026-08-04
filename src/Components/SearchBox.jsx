import { useState } from "react";

function SearchBox() {
  const [trip, setTrip] = useState({
    destination: "",
    budget: "",
    days: "",
    travelers: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Destination: ${trip.destination}
Budget: ₹${trip.budget}
Days: ${trip.days}
Travelers: ${trip.travelers}`
    );
  };

  return (
    <section className="search-section">

      <h2>Plan Your Trip</h2>

      <form onSubmit={handleSubmit} className="search-box">

        <input
          type="text"
          placeholder="Destination"
          name="destination"
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Budget"
          name="budget"
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Days"
          name="days"
          onChange={handleChange}
        />

        <select
          name="travelers"
          onChange={handleChange}
        >
          <option>Select Travelers</option>
          <option>Solo</option>
          <option>Couple</option>
          <option>Family</option>
          <option>Friends</option>
        </select>

        <button type="submit">
          Generate Plan
        </button>

      </form>

    </section>
  );
}

export default SearchBox;