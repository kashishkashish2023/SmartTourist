import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Planner from "./pages/Planner";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PlaceDetails from "./pages/PlaceDetails";
import Signup from "./pages/Signup";
import BudgetPlanner from "./pages/BudgetPlanner";
import Weather from "./pages/Weather";
import DestinationDetails from "./pages/DestinationDetails";
import Attractions from "./pages/Attractions";
import Hotels from "./pages/Hotels";
import Booking from "./pages/Booking";
import PaymentSuccess from "./pages/PaymentSuccess";
import HotelBooking from "./Components/HotelBooking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/attractions"
        element={<Attractions />}
      />
      <Route
        path="/destination/:id"
        element={<DestinationDetails />}
      />
      <Route path="/home" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/place/:id" element={<PlaceDetails />} />
      <Route path="/payment-success"element={<PaymentSuccess/>}/>
      <Route path="/booking/:id"element={<Booking/>}/>
      <Route path="/hotels/:id"element={<Hotels/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hotels" element={<HotelBooking />} />
      <Route path="/budget-planner" element={<BudgetPlanner />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>

  );
}

export default App;