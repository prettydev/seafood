import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu/index";
import SearchBar from "../SearchBar";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import { Helmet } from "react-helmet";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedValue, setTypedValue] = useState("");
  const siteSettings = useSelector((state: any) => state.settings.data);
  const socialLinks = _.filter(
    siteSettings.socialLinks,
    ({ placement }) => placement === "Both" || placement === "Header"
  );

  const onType = async (e) => {
    setTypedValue(e.target.value);
  };

  const logOut = () => {
    localStorage.clear();
  };

  const jwtToken = localStorage.getItem("jwtToken");

  return (
    <>
      <Helmet>
        <title>{siteSettings.defaultPageTitle}</title>
        {siteSettings.googleAnalyticsAccount ? (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.googleAnalyticsAccount}`}
          />
        ) : null}
        {siteSettings.googleAnalyticsAccount ? (
          <script>
            {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${siteSettings.googleAnalyticsAccount}');
      `}
          </script>
        ) : null}
      </Helmet>
      <header className="header">
        <div className="header-top">
          <div className="container-md container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="socail-media">
                  <ul>
                    {socialLinks.length > 0 &&
                      siteSettings.socialLinks.map((item, index) => (
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
          </div>
        </div>
        <div className="header-bottom">
          <div className="container-md container-fluid">
            <div className="row">
              <div className="col-sm-7">
                <div className="header-bottom-left">
                  <div className="logo">
                    {window.location.pathname !== "/" ? (
                      <a href="/">
                        <img
                          className="img-fluid"
                          src={siteSettings?.siteLogo?.url}
                          alt=""
                        />
                      </a>
                    ) : (
                      <img
                        className="img-fluid"
                        src={siteSettings?.siteLogo?.url}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="header-search">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="form-group browse-btn">
                        <DropdownMenu />
                      </div>
                      <SearchBar
                        addClasses={"find-recipe"}
                        placeholder="Find a Recipe"
                        value={typedValue}
                        action={(e) => onType(e)}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="header-bottom-right">
                  <ul>
                    <li>
                      <a href="/liked-page">
                        <img
                            className='header-like-btn'
                          src={require("../../assets/images/heart-fill-icon.svg")}
                          alt=""
                        />
                        {/* <span>2</span> */}
                        {/* TODO: Matt may want this to be a count of the users *liked* recipes*/}
                      </a>
                    </li>
                    <li>
                      <div className="dropdown">
                        {_.isNil(jwtToken) ? (
                          <a
                            className="creat-profile"
                            id="manageProfileMenuButton"
                            aria-haspopup="true"
                            aria-expanded="false"
                            href="/join"
                          >
                            <img
                              src={require("../../assets/images/user-icon.svg")}
                              alt=""
                            />
                            <p>Create a Profile</p>
                          </a>
                        ) : (
                          <a
                            className="creat-profile dropdown-toggle"
                            id="manageProfileMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <img
                              src={require("../../assets/images/user-icon.svg")}
                              alt=""
                            />
                            <p>Manage Profile</p>
                          </a>
                        )}
                        <div
                          className="dropdown-menu custom-dropdown"
                          aria-labelledby="manageProfileMenuButton"
                        >
                          <a
                            className="dropdown-item custom-item"
                            href="/edit-profile"
                          >
                            Edit Profile
                          </a>
                          <a
                            className="dropdown-item custom-item"
                            href="/"
                            onClick={() => logOut()}
                          >
                            Logout
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="d-sm-none">
                      <a className="menu-icon" href="#">
                        <img
                          src={require("../../assets/images/menu-icon.svg")}
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>

                  <input id="burger" className="d-md d-none" type="checkbox" />

                  <label htmlFor="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default withRouter(Header);
