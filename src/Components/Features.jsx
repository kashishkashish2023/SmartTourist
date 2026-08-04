import features from "../data/features";
import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="features">

      <h2>Why Choose Us?</h2>

      <div className="feature-container">

        {features.map((item) => (
          <FeatureCard key={item.id} item={item} />
        ))}

      </div>

    </section>
  );
}

export default Features;