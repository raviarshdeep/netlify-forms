"use client";
import React from "react";
import { useFormik } from "formik";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};

      if (!values.name.trim()) {
        errors.name = "Name is required";
      } else if (!/^[a-zA-Z]+$/.test(values.name.trim())) {
        errors.name = "Name must contain only alphabets";
      }

      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.message.trim()) {
        errors.message = "Message is required";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(values).toString(),
      })
        .then(() => alert("Form successfully submitted"))
        .catch((error) => alert(error));
      resetForm();
    },
  });
  console.log(formik.errors);
  console.log(formik.values);
  return (
    <div>
      <h2>Contact Form</h2>
      <form
        onSubmit={formik.handleSubmit}
        name="contactForm"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contactForm" />
        <p>
          <label>
            Your Name:{" "}
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your Email:{" "}
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Message:{" "}
            <textarea
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
            ></textarea>
          </label>
        </p>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form;
