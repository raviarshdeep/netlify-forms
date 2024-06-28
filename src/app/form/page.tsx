"use client";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";

interface FormValues {
  name: string;
  email: string;
  number: string;
  message: string;
}

const Form = () => {
  const recaptcha = useRef<ReCAPTCHA>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string>("");
  const sitekey: string = process.env.RECAPTCHA_SITE_KEY || " ";
  console.log(sitekey);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
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
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "contact",
            ...values,
            "g-recaptcha-response": recaptchaValue,
          }),
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
      recaptcha?.current?.reset();
    },
  });
  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };
  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setRecaptchaValue(token);
    }
  };
  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={formik.handleSubmit} name="contact">
        <input type="hidden" name="form-name" value="contact" />
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
          <p>
            <label>
              Your Number:{" "}
              <input
                type="text"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
            </label>
          </p>
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
        <div className="relative">
          <ReCAPTCHA
            size="normal"
            sitekey={sitekey}
            onChange={onCaptchaChange}
            ref={recaptcha}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form;
