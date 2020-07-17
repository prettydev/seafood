import React from "react";
import { withRouter } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { hostName } from "../../environment";

interface Props {}

class JoinContent extends React.Component<any, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="signin-section d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center align-self-center signin-box">
          <div>
            <p className="lead text-left signup-header">Join Seafood at Home</p>
            <p className="text-left signup-subheader">
              Seafood at home uses the recipes you save and cooks you follow to
              suggest great content just for you. Join for free!
              <br />
            </p>
          </div>
          <div className="d-flex flex-row flex-shrink-1 flex-fill justify-content-center align-self-stretch login-page-row">
            <button
              className="btn btn-primary-social-login d-flex align-items-center"
              type="button"
              onClick={() =>
                (window.location.href = `${hostName}/connect/facebook`)
              }
            >
              <img src={require("./facebookIcon.svg")} />
              <span>Facebook</span>
            </button>
            {/* <button //TODO: When Matt gets Google Account details - Enable
              className="btn btn-primary-social-login d-flex align-items-center"
              type="button"
            >
              <img src={require("./googleIcon.svg")} />
              <span>Google</span>
            </button> */}
          </div>

          <div className="d-flex flex-grow-1 flex-shrink-1 flex-fill align-items-center align-content-stretch align-self-stretch hr-custom-or login-page-row">
            <div className="flex-shrink-1 flex-fill rule-line"></div>
            <span className="rule-text">OR</span>
            <div className="flex-shrink-1 flex-fill rule-line"></div>
          </div>

          <div className="d-flex flex-column align-items-center align-self-stretch">
            <a
              className="btn btn-primary-signup btn-lg"
              type="button"
              // onClick={() => this.props.history.push("/email-signup")}
              href="/email-signup"
            >
              <span>Sign up with email</span>
            </a>
            <a
              className="signup-link"
              // onClick={() => this.props.history.push("/sign-in-email")}
              href="/sign-in-email"
            >
              Already a member? <b>Sign in!</b>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(JoinContent);
