import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BackToHome from "../Components/BackToHome";

function PlaceDetails() {

  const { id } = useParams();

  const [searchParams] = useSearchParams();

const city = searchParams.get("city") || "";

  const navigate = useNavigate();

  const [place, setPlace] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    window.scrollTo(0,0);

    fetchPlace();

  }, []);

  const fetchPlace = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/place/${id}`
      );

      const data = await response.json();

      setPlace(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <h2 style={{textAlign:"center"}}>Loading...</h2>;

  }

  if (!place) {

    return <h2 style={{textAlign:"center"}}>Place not found.</h2>;

  }

  return (

    <>

      <Navbar />

      <BackToHome />

      <section className="place-details">

        <h1>

          {place.displayName?.text}

        </h1>

        {place.photos?.length > 0 && (

          <img

            className="place-main-image"

            src={`https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=700&key=${import.meta.env.VITE_GOOGLE_PLACES_KEY}`}

            alt={place.displayName?.text}

          />

        )}

        <div className="place-info">

          <h3>

            ⭐ {place.rating || "N/A"}

          </h3>

          <p>

            📍 {place.formattedAddress}

          </p>

                    {place.nationalPhoneNumber && (

            <p>

              📞 {place.nationalPhoneNumber}

            </p>

          )}

          {place.websiteUri && (

            <p>

              🌐

              <a
                href={place.websiteUri}
                target="_blank"
                rel="noreferrer"
              >
                Visit Website
              </a>

            </p>

          )}

          {place.regularOpeningHours?.weekdayDescriptions && (

            <>

              <h3>

                Opening Hours

              </h3>

              <ul>

                {place.regularOpeningHours.weekdayDescriptions.map(
                  (day, index) => (

                    <li key={index}>

                      {day}

                    </li>

                  )
                )}

              </ul>

            </>

          )}

          <div className="place-buttons">

            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noreferrer"
            >
              <button>

                Open in Google Maps

              </button>
            </a>

           <button
  onClick={() =>
    navigate(`/hotels?city=${encodeURIComponent(city)}`)
  }
>
  Book Nearby Hotel
</button>
          </div>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default PlaceDetails;