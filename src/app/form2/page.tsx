"use client";
import React from "react";
import { useFormik } from "formik";

interface FormValues {
  name1: string;
  email1: string;
  message1: string;
}

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name1: "",
      email1: "",
      message1: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "feedback", ...values }),
        });
        if (response.ok) {
          alert("Form successfully submitted");
          resetForm();
        } else {
          throw new Error("Form submission failed!");
        }
      } catch (error: any) {
        alert(error.message);
      }
      resetForm();
    },
  });
  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };
  return (
    <div>
      <h2>Contact Form 2</h2>
      <form
        onSubmit={formik.handleSubmit}
        name="contact"
      >
        <input type="hidden" name="form-name" value="feedback" />
        {/* <label hidden htmlFor="bot-field">
          Don&apos;t fill this out if you&apos;re human:
          <input name="bot-field" />
        </label> */}
        <p>
          <label>
            Your Name:{" "}
            <input
              type="text"
              name="name1"
              value={formik.values.name1}
              onChange={formik.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your Email:{" "}
            <input
              type="email"
              name="email1"
              value={formik.values.email1}
              onChange={formik.handleChange}
            />
          </label>
          
        </p>
        <p>
          <label>
            Message:{" "}
            <textarea
              name="message1"
              value={formik.values.message1}
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
