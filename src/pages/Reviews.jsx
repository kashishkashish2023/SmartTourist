import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Reviews() {

  const [reviews, setReviews] = useState([
    {
      name: "Rahul",
      review: "Amazing Trip",
    },
    {
      name: "Priya",
      review: "Loved the experience.",
    },
  ]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const addReview = () => {

    if (!name || !text) return;

    setReviews([
      ...reviews,
      {
        name,
        review: text,
      },
    ]);

    setName("");
    setText("");
  };

  return (
    <>
      <Navbar />

      <section className="reviews">

        <h1>User Reviews</h1>

        <div className="review-form">

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <textarea
            placeholder="Write Review"
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />

          <button onClick={addReview}>
            Add Review
          </button>

        </div>

        <div className="review-list">

          {reviews.map((item,index)=>(
            <div
              className="review-card"
              key={index}
            >
              <h3>{item.name}</h3>

              <p>{item.review}</p>

              ⭐⭐⭐⭐⭐
            </div>
          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Reviews;