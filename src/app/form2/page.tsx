"use client";
import React from "react";
import { Formik } from "formik";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        message: "",
      }}
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(values).toString(),
        })
          .then(() => {
            alert("Success");
            actions.resetForm();
          })
          .catch(() => {
            alert("Error");
          });
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
        if (!values.message) {
          errors.message = "Message Required";
        }
        return errors;
      }}
    >
      {({ handleChange }) => (
        <form
          name="application"
          data-netlify="true"
          // enctype="multipart/form-data"
        //   data-netlify-honeypot="bot-field"
          method="POST"
        //   noValidate
        //   action={`/`}
        >
          <input type="hidden" name="application" value="application" />
          {/* <input type="hidden" name="bot-field" onChange={handleChange} /> */}

          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="Name" />
            {/*<ErrorMessage name="name"/>*/}
          </div>

          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" />
            {/*<ErrorMessage name="email"/>*/}
          </div>

          <div>
            <label htmlFor="message">Message: </label>
            <input type="textarea" name="message" id="message" />
          </div>

          <button className={"btn btn-primary"} type="submit">
            Send
          </button>
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;
