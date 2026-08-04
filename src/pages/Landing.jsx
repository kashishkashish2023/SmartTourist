import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="landing-info">

        <h2>Welcome to Smart Tourism Planner</h2>

        <p>
          Plan your dream vacation with Artificial Intelligence.
          Explore destinations, calculate your budget and create
          your perfect itinerary in just a few clicks.
        </p>

        <Link to="/home">
          <button className="primary-btn">
            Get Started
          </button>
        </Link>

      </section>
    </>
  );
}

export default Landing;