import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <section className="about">

        <h1>About Smart Tourism Planner</h1>

        <p>
          Smart Tourism Planner is an AI-powered travel planning platform
          that helps users discover destinations, estimate budgets,
          create personalized itineraries and plan trips efficiently.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h3>🎯 Our Mission</h3>
            <p>
              Make travel planning smarter, faster and easier.
            </p>
          </div>

          <div className="about-card">
            <h3>🤖 AI Powered</h3>
            <p>
              Personalized travel suggestions based on user preferences.
            </p>
          </div>

          <div className="about-card">
            <h3>🌍 Explore India</h3>
            <p>
              Discover famous as well as hidden tourist destinations.
            </p>
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default About;