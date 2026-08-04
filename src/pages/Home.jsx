import ChatBot from "../Components/ChatBot";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
//import SearchBox from "../Components/SearchBox";
import Features from "../Components/Features";


import Testimonials from "../Components/Testimonials";
import FAQ from "../Components/FAQ";

import Footer from "../Components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />



      <Features />



      <Testimonials />

      <FAQ />


      <ChatBot />
      <Footer />
    </>
  );
}

export default Home;