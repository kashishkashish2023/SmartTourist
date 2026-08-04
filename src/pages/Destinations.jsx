import Navbar from "../Components/Navbar";
import Destinations from "../Components/Destinations";
import Footer from "../Components/Footer";

function DestinationsPage() {
  return (
    <>
      <Navbar />

      <section className="page-banner">
        <h1>Popular Destinations</h1>
        <p>
          Explore India's most beautiful tourist destinations.
        </p>
      </section>

      <Destinations />

      <Footer />
    </>
  );
}

export default DestinationsPage;