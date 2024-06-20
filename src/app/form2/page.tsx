"use client";
import React from "react";
import { Formik } from "formik";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  "form-name": string;
}

const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        "form-name": "applications",
      }}
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(values).toString(),
        })
          .then(() => {
            alert("Success");
          })
          .catch(() => {
            alert("Error");
          });
        actions.resetForm();
      }}
      validate={(values) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const errors: Partial<FormValues> = {};
        if (!values.name) {
          errors.name = "Name Required";
        }
        if (!values.email || !emailRegex.test(values.email)) {
          errors.email = "Valid Email Required";
        }
        if (!values.phone) {
          errors.phone = "phone Required";
        }
        return errors;
      }}
    >
      {({ handleChange }) => (
        <form
          name="applications"
          // data-netlify="true"
          //   data-netlify-honeypot="bot-field"
          method="POST"
          //   noValidate
          action={`/success`}
        >
          <input type="hidden" name="form-name" value="applications" />
          {/* <input type="hidden" name="bot-field" onChange={handleChange} /> */}

          <div>
            <label htmlFor="nameA">Name: </label>
            <input type="text" name="nameA" id="nameA" />
          </div>
          <div>
            <label htmlFor="emailA">Email: </label>
            <input type="email" name="emailA" id="emailA" />
          </div>
          <div>
            <label htmlFor="numberA">Phone: </label>
            <input type="number" name="numberA" />
          </div>
          <button type="submit">Send</button>
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;
