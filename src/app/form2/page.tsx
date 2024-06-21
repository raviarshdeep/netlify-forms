"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";


const MyForm: React.FC = () => {
  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const myForm = event.target;
      const formData = new FormData(myForm);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: encode({ "form-name": "feedback", ...formData }),
        // body: encode({
        //   "form-name": "feedback",
        //   name: "ravi",
        //   message: "Hor are you",
        // }),
      });
      if (res.status === 200) {
        alert("submit");
      } else {
        alert("error in form");
      }
    } catch (e) {
      alert("error");
    }
  };

  return (
    <form
      name="feedback"
      onSubmit={handleFormSubmit}
      className="text-black flex flex-col gap-3 align-center"
    >
      <input type="hidden" name="form-name" value="feedback" />
      <input name="name1" type="text" placeholder="Name" required />
      <input name="email1" type="text" placeholder="Email (optional)" />
      <input name="message1" type="text" placeholder="Message" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
