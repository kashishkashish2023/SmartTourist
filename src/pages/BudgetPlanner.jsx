/*import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function BudgetPlanner() {
  return (
    <>
      <Navbar />

      <section>
        <h1>💰 Budget Planner</h1>
        <p>Calculate your complete trip expenses</p>
      </section>

      <Footer />
    </>
  );
}

export default BudgetPlanner;*/

import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BackToHome from "../Components/BackToHome";
import { useEffect } from "react";

function BudgetPlanner() {

  useEffect(() => {
  window.scrollTo(0,0);
}, []);

  const [budget, setBudget] = useState({
    destination: "",
    days: "",
    travelers: "",
    hotel: "",
    transport: "",
  });

  const [result, setResult] = useState(null);

 // const [result, setResult] = useState("");

  const handleChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    
  e.preventDefault();

  const days = Number(budget.days);
  const travelers = Number(budget.travelers);

  // Hotel Cost
  let hotelCost = 0;

  if (budget.hotel === "Budget") {
    hotelCost = 2000 * days;
  } else if (budget.hotel === "Standard") {
    hotelCost = 4000 * days;
  } else {
    hotelCost = 8000 * days;
  }

  // Food Cost
  const foodCost = 1200 * travelers * days;

  // Local Transport
  const localTransport = 800 * days;

  // Sightseeing
  const sightseeing = 2000 * days;

  // Travel Cost
  let travelCost = 0;

  if (budget.transport === "Bus") {
    travelCost = 1500 * travelers;
  } else if (budget.transport === "Train") {
    travelCost = 3000 * travelers;
  } else {
    travelCost = 35000 * travelers;
  }

  // Total Budget
  const total =
    hotelCost +
    foodCost +
    localTransport +
    sightseeing +
    travelCost;

  const perPerson = Math.round(total / travelers);

  // Budget Status
  let status = "";
  let message = "";

  if (total <= 50000) {
    status = "🟢 Excellent Budget";
    message =
      "You can comfortably complete this trip within your selected budget.";
  } else if (total <= 100000) {
    status = "🟡 Moderate Budget";
    message =
      "Your trip is reasonably priced. Booking early can reduce costs.";
  } else {
    status = "🔴 Expensive Trip";
    message =
      "This trip is expensive. Consider reducing hotel or transport costs.";
  }

  // Currency Conversion
  const euro = Math.round(total / 96);
  const usd = Math.round(total / 85);

  setResult({
    destination: budget.destination,
    days,
    travelers,
    hotelCost,
    foodCost,
    localTransport,
    sightseeing,
    travelCost,
    total,
    perPerson,
    status,
    message,
    euro,
    usd,
  });
};
  

  return (
    <>
      <Navbar />  

      <BackToHome />

      <section className="budget-container">

        <div className="budget-card">

          <h1>💰 Budget Planner</h1>

          <p>Calculate your travel expenses easily</p>


          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="destination"
              placeholder="Destination"
              onChange={handleChange}
              required
            />


            <input
              type="number"
              name="days"
              placeholder="Number of Days"
              onChange={handleChange}
              required
            />


            <input
              type="number"
              name="travelers"
              placeholder="Number of Travelers"
              onChange={handleChange}
              required
            />


            <select
              name="hotel"
              onChange={handleChange}
              required
            >
              <option value="">Select Hotel Type</option>
              <option>Budget</option>
              <option>Standard</option>
              <option>Luxury</option>
            </select>


            <select
              name="transport"
              onChange={handleChange}
              required
            >
              <option value="">Select Transport</option>
              <option>Bus</option>
              <option>Train</option>
              <option>Flight</option>
            </select>


            <button type="submit">
              Generate Budget
            </button>


          </form>


          {result && (
  <div className="budget-result">

    <h2>📋 Complete Travel Report</h2>

    <p><strong>📍 Destination :</strong> {result.destination}</p>

    <p><strong>👥 Travelers :</strong> {result.travelers}</p>

    <p><strong>🗓 Days :</strong> {result.days}</p>

    <hr />

    <p>🏨 Hotel : ₹{result.hotelCost.toLocaleString()}</p>

    <p>🍽 Food : ₹{result.foodCost.toLocaleString()}</p>

    <p>🚕 Local Transport : ₹{result.localTransport.toLocaleString()}</p>

    <p>🎟 Sightseeing : ₹{result.sightseeing.toLocaleString()}</p>

    <p>✈ Travel : ₹{result.travelCost.toLocaleString()}</p>

    <hr />

    <h2>
      💰 Total Budget : ₹{result.total.toLocaleString()}
    </h2>

    <h3>
      💵 Per Person : ₹{result.perPerson.toLocaleString()}
    </h3>

    <hr />

    <h3>Budget Status</h3>

    <h2>{result.status}</h2>

    <p>{result.message}</p>

    <hr />

    <h3>💡 Budget Tips</h3>

    <ul>
      <li>✔ Book flights 2 months early</li>
      <li>✔ Use public transport whenever possible</li>
      <li>✔ Visit free attractions</li>
      <li>✔ Avoid weekend hotel bookings</li>
    </ul>

    <hr />

    <h3>🌍 Currency Conversion</h3>

    <p>🇪🇺 Euro ≈ €{result.euro}</p>

    <p>🇺🇸 Dollar ≈ ${result.usd}</p>

    <hr />

    <div className="budget-buttons">

      <button
        onClick={() => window.print()}
      >
        Download PDF
      </button>

      <button
        onClick={() => {
          localStorage.setItem(
            "savedBudget",
            JSON.stringify(result)
          );
          alert("Budget Saved Successfully!");
        }}
      >
        Save Budget
      </button>

    </div>

  </div>
)}

        </div>

      </section>


      <Footer />
    </>
  );
}

export default BudgetPlanner;