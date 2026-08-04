import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BackToHome from "../Components/BackToHome";
import { useEffect } from "react";
function Weather() {
useEffect(() => {
  window.scrollTo(0,0);
}, []);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    setWeather({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

       <BackToHome />


      <section className="weather-page">

        <div className="weather-card">


          <h1>🌦 Weather Updates</h1>

          <p>
            Check destination weather before planning your trip
          </p>


          <form onSubmit={handleSubmit}>


            <input
              type="text"
              placeholder="Enter City Name"
              value={city}
              onChange={(e)=>setCity(e.target.value)}
              required
            />


            <button type="submit">
              Check Weather
            </button>


          </form>



          {weather && (

            <div className="weather-result">


              <h2>
                📍 {weather.city}
              </h2>


              <p className="weather-box">
  🌡 Temperature : {weather.temperature}°C
</p>

<p className="weather-box">
  ☁️ Condition : {weather.condition}
</p>

<p className="weather-box">
  💧 Humidity : {weather.humidity}%
</p>

<p className="weather-box">
  🌬 Wind Speed : {weather.wind}
</p>


              <hr/>


              <h3>
                🧳 Travel Suggestion
              </h3>


              <p>
                ✅ Weather is good for sightseeing.
                <br/>
                ✅ Carry essentials according to weather.
              </p>


            </div>

          )}


        </div>


      </section>


      <Footer />

    </>
  );
}


export default Weather;