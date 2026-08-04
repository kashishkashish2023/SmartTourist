import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          ✈️ AI Powered Smart Tourism Planner
        </span>

        <h1>
          Plan Your Perfect Journey
          <br />
          With Artificial Intelligence
        </h1>

        <p>
          Discover destinations, estimate budgets, generate itineraries,
          explore hidden places and travel smarter with AI.
        </p>


        <div className="hero-buttons">

          <Link to="/destinations">
            <button className="primary-btn">
              Explore Now
            </button>
          </Link>

        </div>


      </div>


      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900"
          alt="Hero"
          className="hero-image"
        />

      </div>


    </section>
  );
}

export default Hero;