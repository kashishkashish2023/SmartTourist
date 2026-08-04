import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BackToHome from "../Components/BackToHome";


function Attractions() {


  const navigate = useNavigate();

  const [searchParams] = useSearchParams();


  const selectedCity = searchParams.get("city") || "";


  const [city, setCity] = useState(selectedCity);

  const [places, setPlaces] = useState([]);

  const [loading, setLoading] = useState(false);



  useEffect(()=>{

    window.scrollTo(0,0);

  },[]);



  useEffect(()=>{

    if(selectedCity){

      setCity(selectedCity);

      fetchAttractions(selectedCity);

    }

  },[selectedCity]);




  const fetchAttractions = async(cityName)=>{


    try{


      setLoading(true);


      const response = await fetch(
        `http://localhost:5000/attractions?city=${encodeURIComponent(cityName)}`
      );


      const data = await response.json();

      console.log("FIRST PLACE:", data[0]);

      setPlaces(
        Array.isArray(data) ? data : []
      );


    }
    catch(error){


      console.log(error);

      alert("Failed to load attractions");


    }
    finally{


      setLoading(false);


    }


  };



  const handleSearch=(e)=>{


    e.preventDefault();


    if(city.trim()){


      fetchAttractions(city.trim());


    }


  };

    return (

    <>

      <Navbar />


      <BackToHome />



      <section className="attractions-page">


        <h1>
          📍 Nearby Attractions
        </h1>


        <p>
          Search any destination and explore famous tourist attractions.
        </p>



        <form
          className="attraction-search"
          onSubmit={handleSearch}
        >


          <input

            type="text"

            placeholder="Enter Destination"

            value={city}

            onChange={(e)=>setCity(e.target.value)}

          />


          <button type="submit">

            Search

          </button>


        </form>




        {

          loading &&

          <h2>
            Loading attractions...
          </h2>

        }




        <div className="attractions-grid">


          {

            places.map((item)=>(


              <div
                className="attraction-card"
                key={item.id}
              >



               <img
  src={item.photo || "https://placehold.co/600x400?text=No+Image"}
  alt={item.name}
  className="attraction-image"
  onError={(e) => {
    e.target.src = "https://placehold.co/600x400?text=No+Image";
  }}
/>




                <div className="attraction-content">



                  <h3>

                    {item.name}

                  </h3>




                  <p>

                    📍 {item.address || "Location available"}

                  </p>




                  <p>

                    ⭐ {item.rating || "Not Rated"}

                  </p>





                  {

                    item.description &&

                    <p>

                      {item.description}

                    </p>

                  }






                  <div className="attraction-buttons">





                    <button

                      type="button"

                     onClick={() =>
  navigate(
    `/place/${item.id}?city=${encodeURIComponent(city)}`
  )
}

                    >

                      View Details

                    </button>





                    {

                      item.googleMapsUri &&


                      <a

                        href={item.googleMapsUri}

                        target="_blank"

                        rel="noreferrer"

                      >


                        <button type="button">

                          Google Maps

                        </button>


                      </a>


                    }




                  </div>




                </div>



              </div>


            ))


          }



        </div>



      </section>




      <Footer />



    </>


  );


}



export default Attractions;