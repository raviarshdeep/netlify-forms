"use client";
import React from "react";
import { Formik } from "formik";

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
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
        if (!values.phone) {
          errors.phone = "phone Required";
        }
        return errors;
      }}
    >
      {({ handleChange }) => (
        <form
          name="application"
          // data-netlify="true"
          // enctype="multipart/form-data"
          //   data-netlify-honeypot="bot-field"
          method="POST"
          //   noValidate
          action={`/success`}
        >
          <input type="hidden" name="form-name" value="application" />
          {/* <input type="hidden" name="bot-field" onChange={handleChange} /> */}

          <div>
            <label htmlFor="name1">Name: </label>
            <input type="text" name="name1" id="Name1" />
          </div>
          <div>
            <label htmlFor="email1">Email: </label>
            <input type="email" name="email1" id="email1" />
          </div>
          <div>
            <label htmlFor="number1">Phone: </label>
            <input type="number" name="number1" />
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
