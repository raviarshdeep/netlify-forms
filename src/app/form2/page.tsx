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
      console.log("event.target",event.target)
      const formData = new FormData(myForm);
      console.log("formData",formData)
      // const formData ={}
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
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
      <input name="name1" type="text" placeholder="Name"  value="ankit"/>
      <input name="email1" type="text" placeholder="Email (optional)" value="ankit@gmail.com"/>
      <input name="message1" type="text" placeholder="Message"  value="how are you"/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
