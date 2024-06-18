import React from "react";

const Form = () => {
  return (
    <div>
      <h2>Contact Form</h2>
      <form method="post" name="Contact Form" data-netlify="true">
        <p>
          <label>Name:</label>
          <input type="text" name="name" id="name" />
        </p>
        <p>
          <label>Email:</label>
          <input type="email" name="email" id="email" />
        </p>
        <p>
          <label>Comments:</label>
          <br />
          <textarea name="comments" id="comments"></textarea>
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </div>
  );
};

export default Form;
