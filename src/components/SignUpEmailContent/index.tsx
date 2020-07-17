import React, { useState } from "react";
import * as _ from "lodash";
import { postApi, putApi } from "../../apiHandler";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

interface Props {}

function SignUpEmailContent() {
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    agreeToTerms: false,
    emailPromotion: false,
  });
  const [registerPending, setRegisterPending] = useState(false);

  const onType = (e) => {
    let value = e.target.value;
    if (value === "on") {
      value = true;
    }
    setRegisterDetails({ ...registerDetails, [e.target.id]: value });
  };

  const fieldsAreValid = () => {
    const {
      email,
      password,
      firstName,
      lastName,
      agreeToTerms,
    } = registerDetails;
    if (agreeToTerms) {
      if (
        !_.isEmpty(email) &&
        !_.isEmpty(password) &&
        !_.isEmpty(firstName) &&
        !_.isEmpty(lastName)
      ) {
        return true;
      } else {
        alert("Please fill in empty fields");
      }
    } else {
      alert("Please read and agree to the terms and conditions");
    }
    return false;
  };

  const attemptSignUp = async () => {
    if (fieldsAreValid()) {
      setRegisterPending(true);
      const {
        email,
        password,
        firstName,
        lastName,
        agreeToTerms,
        emailPromotion,
      } = registerDetails;
      const params = {
        username: email,
        email,
        provider: "local",
        password,
      };
      await postApi("/auth/local/register", params)
        .then(async (data) => {
          const options = {
            firstName,
            lastName,
            acceptTerms: agreeToTerms,
            emailSubscription: emailPromotion,
          };
          localStorage.setItem("jwtToken", data.jwt);
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
          const user = await putApi(`/users/${data.user.id}`, options).catch(
            (e) => {
              if (e.response) {
                const { data } = e.response;
                alert(data.data[0].messages[0].message);
                setRegisterPending(false);
              }
            }
          );
          delete user.password;
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((e) => {
          if (e.response) {
            setRegisterPending(false);
          }
        });
      setRegisterPending(false);

      window.location.href = "/edit-profile";
    }
  };

  return (
    <section className="create_profile_sec">
      <div className="container-md container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <h5>Sign up with email.</h5>
              </div>
              <div className="col-sm-6 text-sm-right mt_10">
                <a href="/sign-in" className="theme_text">
                  Already a member? Sign in!
                </a>
              </div>
              <div className="col-12">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    className="input_box"
                    placeholder="First Name"
                    onChange={onType}
                    id="firstName"
                  />
                  <input
                    type="text"
                    className="input_box"
                    placeholder="Last Name"
                    onChange={onType}
                    id="lastName"
                  />
                  <input
                    type="email"
                    className="input_box"
                    placeholder="Email"
                    onChange={onType}
                    id="email"
                  />

                  <input
                    type="password"
                    className="input_box"
                    placeholder="Password"
                    onChange={onType}
                    id="password"
                  />
                  <p>
                    Please provide a password with at least 6 characters. Your
                    password mush include at least 1 uppercase letter or special
                    character.
                  </p>

                  <label className="check mt_30">
                    I agree to the Terms of Service and Privacy Policy.
                    <input
                      type="checkbox"
                      name="is_name"
                      onChange={onType}
                      id="agreeToTerms"
                    />
                    <span className="checkmark"></span>
                  </label>

                  <label className="check mt_30">
                    Email me exclusive subscription and special product offers
                    from Seafood At Home.
                    <input
                      type="checkbox"
                      name="is_name"
                      onChange={onType}
                      id="emailPromotion"
                    />
                    <span className="checkmark"></span>
                  </label>

                  <button
                    onClick={attemptSignUp}
                    disabled={registerPending}
                    className="create_button"
                  >
                    {registerPending ? (
                      <ClipLoader color={"#fff"} />
                    ) : (
                      "Create An Account"
                    )}
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

export default SignUpEmailContent;
