import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const sendMessage = async (e) => {
  e.preventDefault();

  console.log("Button Clicked");
  alert("Button Clicked");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/contact",
      formData
    );

    alert(res.data.message);
  } catch (err) {
    console.log(err);
    alert("Failed");
  }
};
  return (
    <section className="contact">
      <h2>Contact Us</h2>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          rows="5"
          name="message"
          placeholder="Write Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;