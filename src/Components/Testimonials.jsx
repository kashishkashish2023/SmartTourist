const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    text: "Amazing AI planner! It saved me a lot of time while planning my Goa trip.",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    id: 2,
    name: "Priya Verma",
    text: "Very easy to use and beautiful interface. Highly recommended.",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    id: 3,
    name: "Aman Gupta",
    text: "Budget estimation and destination suggestions are really helpful.",
    rating: "⭐⭐⭐⭐⭐",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>

      <div className="testimonial-container">
        {reviews.map((review) => (
          <div className="testimonial-card" key={review.id}>
            <h3>{review.name}</h3>
            <p>{review.text}</p>
            <span>{review.rating}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;