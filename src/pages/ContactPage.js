import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { boxShadow } from "../styles/mixins"; 

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px; 
  margin: 40px auto; 
  padding: 20px;
  ${boxShadow} 
  transition: transform 0.2s ease-in-out;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  textarea {
    height: 120px;
  }

  button {
    background: rgb(110, 182, 197);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #0056b3;
    }
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  color: green;
  padding: 20px;
  font-size: 18px;
`;

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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    
    setSubmitted(true);
    setFormData({ fullName: "", subject: "", email: "", body: "" });
  };

  return (
    <ContactContainer>
      <h1>Contact Us</h1>

      {submitted ? (
        <SuccessMessage>
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for reaching out. We will get back to you soon.</p>
          <Link to="/">
            <button>Back to Home</button>
          </Link>
        </SuccessMessage>
      ) : (
        <FormWrapper onSubmit={handleSubmit}>
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
        </FormWrapper>
      )}
    </ContactContainer>
  );
};

export default ContactPage;