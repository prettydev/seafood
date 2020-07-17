import React from "react";
import * as _ from "lodash";
import { useSelector } from "react-redux";

function DropdownMenu() {
  const species = useSelector((state: any) => state.species.data);

  const jwtToken = localStorage.getItem("jwtToken");

  return (
    <div className="form-group browse-btn">
      <div className="dropdown">
        <button
          className="btn btn-secondary"
          type="button"
          id="dropdownMenuButton"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Browse <img src={require("../../assets/images/down-arrow.svg")} />
        </button>
        <div className="dropdown_menu">
          <div className="row">
            <div className="col-sm-7">
              <div className="row">
                <div className="col-12">
                  <h5
                    onClick={() => (window.location.href = "/species")}
                    className="ifakelink"
                  >
                    Species
                    <img
                      className="img-fluid d-sm-inline-block d-none"
                      src={require("../../assets/images/right-arrow.svg")}
                      alt=""
                    />
                    <img
                      className="img-fluid d-inline-block d-sm-none"
                      src={require("../../assets/images/angle_left.png")}
                      alt=""
                    />
                  </h5>
                </div>
                {species?.length > 0 &&
                  species.map(({ name, slug }, i) => (
                    <div className="col-6" key={"species" + i}>
                      <a className="mobile-white" href={`/species/${slug}`}>
                        {name}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-sm-5">
              <h5
                onClick={() => (window.location.href = "/experts")}
                className="ifakelink"
              >
                The Experts
                <img
                  className="img-fluid d-sm-inline-block d-none"
                  src={require("../../assets/images/right-arrow.svg")}
                  alt=""
                />
                <img
                  className="img-fluid d-inline-block d-sm-none"
                  src={require("../../assets/images/angle_left.png")}
                  alt=""
                />
              </h5>
              <h5>
                Your Account
                <img
                  className="img-fluid d-sm-inline-block d-none"
                  src={require("../../assets/images/right-arrow.svg")}
                  alt=""
                />
                <img
                  className="img-fluid d-inline-block d-sm-none"
                  src={require("../../assets/images/angle_left.png")}
                  alt=""
                />
              </h5>
              <ul>
                {!jwtToken ? (
                  <li>
                    <a href="/sign-in">Login</a>
                  </li>
                ) : (
                  <li>
                    <a href="/edit-profile">Edit Account</a>
                  </li>
                )}
              </ul>
              <h5
                onClick={() => (window.location.href = "/contact-us")}
                className="ifakelink"
              >
                Contact Us
                <img
                  className="img-fluid d-sm-inline-block d-none"
                  src={require("../../assets/images/right-arrow.svg")}
                  alt=""
                />
              </h5>
              <ul>
                <li>
                  <a href="/page/customer-support">Customer Support</a>
                </li>
                <li>
                  <a href="/page/media-relations">Media Relations</a>
                </li>
                <li>
                  <a href="/page/a-with-us">Advertising With Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
