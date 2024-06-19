"use client";
import React from "react";
import { Formik } from "formik";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();

    const myForm = event.target;

    const formData = new FormData(myForm);
    console.log("formData", formData);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => alert("Form successfully submitted"))
      .catch((error) => alert("error"));
  };

  return (
    <div>
      <form
        name="contactT"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contactT" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
