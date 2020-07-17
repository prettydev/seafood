import React, { useState } from "react";
import * as _ from "lodash";
import { postApi } from "../../apiHandler";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

interface Props {}

function ContactPageContent() {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [callPending, setCallPending] = useState(false);

  const onType = (e) => {
    let value = e.target.value;
    setContactDetails({ ...contactDetails, [e.target.id]: value });
  };

  const fieldsAreValid = () => {};

  const attemptSubmit = async () => {
    setCallPending(true);
    postApi("/contact-submissions", {
      ...contactDetails,
      submittedOn: new Date(),
      emailed: false,
    }).then(() => {
      setCallPending(false);
      MySwal.fire({
        title: "Submitted!",
        icon: "success",
      });
    });
  };

  return (
    <section className="create_profile_sec">
      <div className="container-md container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <h5>Contact Us</h5>
              </div>
              <div className="col-12">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    className="input_box"
                    placeholder="Name"
                    onChange={onType}
                    id="name"
                  />
                  <input
                    type="text"
                    className="input_box"
                    placeholder="Email"
                    onChange={onType}
                    id="email"
                  />
                  <input
                    type="text"
                    className="input_box"
                    placeholder="Subject"
                    onChange={onType}
                    id="subject"
                  />
                  <textarea
                    className="input_box"
                    placeholder="Message"
                    onChange={onType}
                    id="message"
                  />

                  <button
                    onClick={attemptSubmit}
                    disabled={callPending}
                    className="create_button"
                  >
                    {callPending ? <ClipLoader color={"#fff"} /> : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPageContent;
