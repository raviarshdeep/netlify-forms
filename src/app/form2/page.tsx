import React from "react";

const ContactForm = () => {
  return (
    <form name="contact" method="POST" data-netlify="true">
      <p>
        <label>
          Your Name: <input type="text" name="nameA" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="emailA" />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="messageA"></textarea>
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  );
};

export default ContactForm;
