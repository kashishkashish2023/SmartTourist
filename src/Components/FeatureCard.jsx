/*function FeatureCard({ item }) {
  return (
    <div className="feature-card">
      <h1>{item.icon}</h1>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  );
}

export default FeatureCard;*/

import { Link } from "react-router-dom";

function FeatureCard({ item }) {
  return (
    <Link to={item.link} className="feature-link">

      <div className="feature-card">

        <h1>{item.icon}</h1>

        <h3>{item.title}</h3>

        <p>{item.desc}</p>

      </div>

    </Link>
  );
}

export default FeatureCard;