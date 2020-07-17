import React, { lazy } from "react";
import { Helmet } from "react-helmet";
const ContactPageContent = lazy(() =>
  import("../../components/ContactPageContent/index")
);

//Create an account from email
export default function ContactPage() {
  return (
    <div>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <ContactPageContent />
    </div>
  );
}
