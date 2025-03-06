import { useState } from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (formData.fullName.trim().length < 3) {
      validationErrors.fullName = "Full name must be at least 3 characters";
    }
    if (formData.subject.trim().length < 3) {
      validationErrors.subject = "Subject must be at least 3 characters";
    }
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Enter a valid email address";
    }
    if (formData.body.trim().length < 3) {
      validationErrors.body = "Message must be at least 3 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Submitted Data:", formData);
    
    setSubmitted(true);
    setFormData({ fullName: "", subject: "", email: "", body: "" });
  };

  return (
    <div>
      <h1>Contact Us</h1>

      {submitted ? (
        <div className="success-message">
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for reaching out. We will get back to you soon.</p>
          <Link to="/">
            <button>Back to Home</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
      
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </label>

         
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <p className="error">{errors.subject}</p>}
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>

          <label>
            Message:
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
            />
            {errors.body && <p className="error">{errors.body}</p>}
          </label>
          
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;