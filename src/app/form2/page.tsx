import React from "react";

const ContactForm = () => {
  return (
    <form name="contact" method="POST" data-netlify="true">
      <p>
        <label>
          Your Name: <input type="text" name="nameA" value="ravi"/>
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="emailA" value="ravi@gmail.com"/>
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="messageA" value="how are you"></textarea>
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  );
};

export default ContactForm;
