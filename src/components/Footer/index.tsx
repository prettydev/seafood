import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as _ from "lodash";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import { postApi } from "../../apiHandler";

const MySwal = withReactContent(Swal);

export default function Footer() {
  const { data, pages } = useSelector((state: any) => state.settings);
  const [email, setEmail] = useState("");

  const EmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is mandatory")
      .email("Please enter a valid email"),
  });

  const socialLinks = _.mapValues(_.keyBy(pages?.menus, "title"), "children");

  const subscribeUser = async (req) => {
    if (!_.isNil(data.mailChimpURL)) {
      EmailSchema.isValid({ email }).then((resp) => {
        if (resp) {
          let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
          };

          let subFormData = {
            "email_address":email
          }

          postApi("/subscribe", subFormData, {
            headers,
          })
            .then((d) => {
              window.scrollTo(0, 0);
              Swal.fire({
                title: "Success!",
                icon: "success",
                text: "You've successfully subscribed.",
              });
            })
            .catch((e) => {
              window.scrollTo(0, 0);
              Swal.fire({
                title: "Error",
                icon: "info",
                text: "Woops! Looks like you've already subscribed with that email!",
              });
            });
          setEmail("");
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "You must enter a valid email address.",
          });
        }
      });
      return req.preventDefault();
    }
  };
  return (
    <div>
      <footer className="footer-sec">
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-inner">
                <h3>SUPPORT</h3>
                <div className="footer-links">
                  {socialLinks["Footer 1"] && (
                    <ul>
                      {socialLinks["Footer 1"].map((item, i) => (
                        <li key={`left_${i}`}>
                          <a href={item.link}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="footer-socail">
                  <ul>
                    {data?.socialLinks?.length > 0 &&
                      data.socialLinks.map((item, index) => (
                        <li key={`social_${index}`}>
                          <a href={item.link}>
                            <img src={item.icon.url} alt="" />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-inner">
                <h3>OUR MISSION</h3>
                <div className="footer-links">
                  {socialLinks["Footer 2"] && (
                    <ul>
                      {socialLinks["Footer 2"].map((item, i) => (
                        <li key={`middle_${i}`}>
                          <a href={item.link}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-inner">
                <h3>ADVERTISING</h3>
                <div className="footer-links">
                  {socialLinks["Footer 3"] && (
                    <ul>
                      {socialLinks["Footer 3"].map((item, i) => (
                        <li key={`right_${i}`}>
                          <a href={item.link}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-inner">
                <h3 className="text-black">JOIN OUR NEWSLETTER</h3>
                <form onSubmit={subscribeUser} action={data.mailChimpURL}>
                  <input
                    type="text"
                    name="EMAIL"
                    className="form-control"
                    placeholder="Enter e-mail here"
                    onChange={(t) => setEmail(t.target.value)}
                  />
                  <button type="submit" className="submit">
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section className="copyright-sec">
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-12">
              <p>
                ©Seafood at Home. All Rights Reserved. Website designed and
                maintained by Designsteins.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
