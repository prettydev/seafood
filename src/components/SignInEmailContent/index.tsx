import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { postApi } from "../../apiHandler";

function SignInEmailContent() {
  const [userDetails, setUserDetails] = useState({
    identifier: "",
    password: "",
  } as any);

  const onType = (e) => {
    const type = e.target.type === "email" ? "identifier" : e.target.type;
    setUserDetails({ ...userDetails, [type]: e.target.value });
  };

  const signIn = async () => {
    if (userDetails.identifier && userDetails.password) {
      const data = await postApi("/auth/local", userDetails);
      localStorage.setItem("lastclear", JSON.stringify(new Date().getTime()));
      localStorage.setItem("jwtToken", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/";
    }
  };

  return (
    <section className="d-flex justify-content-center profile-login-section">
      <div className="d-flex flex-column align-items-center align-self-center profile-login-box">
        <div className="d-flex align-self-stretch justify-content-between align-items-end mb-2">
          <p className="lead signup-header">Sign in with Email</p>
          <p className="text">
            <a href="/email-signup" className="signup-link">
              Need an account? Create Account!
            </a>
          </p>
        </div>

        <div className="d-flex flex-column align-self-stretch">
          <input
            className="form-control-lg input_box"
            type="email"
            onChange={(e) => onType(e)}
            placeholder="Email Address"
          />
          <input
            className="form-control-lg input_box"
            type="password"
            onChange={(e) => onType(e)}
            placeholder="Password"
          />
        </div>
        <div className="d-flex align-self-stretch mt_30">
          <button
            className="btn btn-lg btn-signup"
            type="button"
            onClick={signIn}
          >
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default withRouter(SignInEmailContent);
