"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MyForm: React.FC = () => {
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const myForm = event.target;
      const formData = new FormData(myForm);
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "form-name=feedback&email1=test@example.com&name1=pw",
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
    <form name="feedback" onSubmit={handleFormSubmit}>
      <input type="hidden" name="form-name" value="feedback" />
      <input name="name1" type="text" placeholder="Name" />
      <input name="email1" type="text" placeholder="Email (optional)" />
      <input name="message1" type="text" placeholder="Message" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
