import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ChatBot from "../Components/ChatBot.jsx";
import BackToHome from "../Components/BackToHome";
import { useEffect } from "react";
function Planner() {

  useEffect(() => {
  window.scrollTo(0,0);
}, []);
  const [trip, setTrip] = useState({
    destination: "",
    days: "",
    budget: "",
    travelers: "",
    travelMode: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const days = Number(trip.days);
    const travelers = Number(trip.travelers);
    const userBudget = Number(trip.budget);

    // Destination-wise pricing
    const destinationPrices = {
      goa: { hotel: 3500, food: 900 },
      manali: { hotel: 2500, food: 700 },
      jaipur: { hotel: 1800, food: 600 },
      delhi: { hotel: 2200, food: 650 },
      kashmir: { hotel: 4000, food: 1000 },
    };

    const city =
      destinationPrices[trip.destination.trim().toLowerCase()] || {
        hotel: 2000,
        food: 700,
      };

    const hotel = city.hotel * days;
    const food = city.food * days * travelers;

    let transport = 0;

    switch (trip.travelMode) {
      case "Bus":
        transport = 600 * travelers;
        break;
      case "Train":
        transport = 1500 * travelers;
        break;
      case "Flight":
        transport = 5000 * travelers;
        break;
      default:
        transport = 0;
    }

    const sightseeing = 1000 * days * travelers;

    const total = hotel + food + transport + sightseeing;

    let budgetStatus = "";

    if (userBudget > 0) {
      if (userBudget >= total) {
        budgetStatus = `
✅ Within Your Budget

Remaining Amount : ₹${userBudget - total}`;
      } else {
        budgetStatus = `
❌ Budget Exceeded

Extra Required : ₹${total - userBudget}`;
      }
    }

    setResult(`
🌍 Destination : ${trip.destination}

📅 Days : ${days}

👥 Travelers : ${travelers}

🚆 Travel Mode : ${trip.travelMode}

━━━━━━━━━━━━━━━━━━━━

🏨 Hotel Cost : ₹${hotel}

🍔 Food Cost : ₹${food}

🚕 Transport Cost : ₹${transport}

🎟️ Sightseeing : ₹${sightseeing}

━━━━━━━━━━━━━━━━━━━━

💰 Estimated Budget : ₹${total}

${budgetStatus}

━━━━━━━━━━━━━━━━━━━━

🗓 Suggested Itinerary

Day 1
• Hotel Check-in
• Explore Local Market

Day 2
• Visit Tourist Attractions

Day 3
• Shopping & Return

✨ Happy Journey!
`);
  };



  return (
    <>
      <Navbar />

      <BackToHome />


      <section className="planner">

        <h1>🤖 AI Trip Planner</h1>

        <p>Plan your perfect journey with Smart Tourism</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={trip.destination}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="days"
            placeholder="Number of Days"
            value={trip.days}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Your Budget (Optional)"
            value={trip.budget}
            onChange={handleChange}
          />

          <input
            type="number"
            name="travelers"
            placeholder="Number of Travelers"
            value={trip.travelers}
            onChange={handleChange}
            required
          />

          <select
            name="travelMode"
            value={trip.travelMode}
            onChange={handleChange}
            required
          >
            <option value="">Select Travel Mode</option>
            <option value="Bus">🚌 Bus</option>
            <option value="Train">🚆 Train</option>
            <option value="Flight">✈️ Flight</option>
          </select>

          <button type="submit">
            ✨ Generate Budget Plan
          </button>

        </form>

        {result && (
          <div className="trip-result">
            <h2>Estimated Trip Budget</h2>
            <pre>{result}</pre>
          </div>
        )}

      </section>
      <ChatBot />
      
      <Footer />
    </>
  );
}

export default Planner;