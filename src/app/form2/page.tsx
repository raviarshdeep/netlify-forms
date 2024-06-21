
"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const MyForm: React.FC = () => {
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };
  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };
  const handleSubmit = async (values: FormValues) => {
    // Handle form submission here, e.g., submit to server
    console.log(values);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // body: new URLSearchParams(values).toString(),
        body: encode({ "form-name": "contact2", ...values }),
      });
      if (response.ok) {
        alert("Form successfully submitted");
      } else {
        throw new Error("Form submission failed!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      <Form name="contact2" method="post">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <Field type="text" id="firstName" name="firstName" />
          <ErrorMessage name="firstName" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <Field type="text" id="firstName" name="lastName" />
          <ErrorMessage name="lastName" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default MyForm;
