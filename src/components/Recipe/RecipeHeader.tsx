import React, { useState, useEffect } from "react";
import StarRating from "../Common/StarRating";
import * as _ from "lodash";
import {
  PinterestShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookShareButton,
} from "react-share";
import callApi from "../../apiHandler";
import FsLightbox from "fslightbox-react";

export default function RecipeHeader(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [toggler, setToggler] = useState(true);

  useEffect(() => {
    setIsLiked(props.liked);
  }, [props]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function addSpace(name: string) {
    switch (_.toUpper(name)) {
      case "SERVINGSIZE":
        return "SERVING SIZE";
      case "TOTALFAT":
        return "TOTAL FAT";
      case "SATURATEDFAT":
        return "SATURATED FAT";
      case "POLYUNSATURATEDFAT":
        return "POLYUNSATURATED FAT";
      case "MONOUNSATURATEDFAT":
        return "MONOUNSATURATED FAT";
      case "TRANSFAT":
        return "TRANS FAT";
      case "TOTALCARBOHYDRATES":
        return "TOTAL CARBOHYDRATES";
      default:
        return _.toUpper(name);
    }
  }

  function generateNutritionFacts() {
    return _.map(props.nutritionFacts[0], (value, key, index) => {
      if (key !== "id" && !_.isNil(value) && !_.isEmpty(value)) {
        return (
          <li key={key + index}>
            <span>
              {value + " " + addSpace(key)}
            </span>
          </li>
        );
      }
    });
  }

  return (
    <section className="recipes-banner-sec">
      <div className="container-md container-fluid">
        <div className="row">
          <div className="col">
            <div className="recipes-banner-left">
              <div className="text-box">
                <div className="text-inner">
                  <div className="title">
                    <h3>{props.title}</h3>
                    <StarRating
                        value={props.ratingsAverage}
                        showCount={false}
                        editing={false}
                        onStarHoverOut={undefined}
                        onStarHover={undefined}
                    />
                  </div>
                  <div>
                    {props.tags &&
                    props.tags.map(({ tag, id }) => (
                        <span key={id} className="badge badge-pill sah-badge-light-grey mr-1">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="recipes-banner-left">
              <div className="text-box">
                <div className="text-inner">
                  <div className="recipes-btn">
                    <ul>
                      {!_.isEmpty(user) && (
                        <li>
                          <a
                            onClick={async () => {
                              await callApi(
                                `/recipe/like/${props.id}`
                              ).then(() => setIsLiked(!isLiked));
                            }}
                          >
                            <img
                              src={require("../../assets/images/like-icon.svg")}
                              alt=""
                            />
                            {isLiked
                              ? "REMOVE FROM MY RECIPES"
                              : "SAVE TO MY RECIPES"}
                          </a>
                        </li>
                      )}
                      <li>
                        <a
                          onClick={() => {
                            window.scrollTo({
                              top: document.body.scrollHeight,
                              behavior: "smooth",
                            });
                          }}
                        >
                          <img
                            src={require("../../assets/images/star-reviews.svg")}
                            alt=""
                          />
                          SEE REVIEWS
                        </a>
                      </li>
                      <li>
                        <a onClick={() => window.print()}>
                          <img
                            src={require("../../assets/images/print-icon.svg")}
                            alt=""
                          />
                          PRINT RECIPES
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="socail-share">
                  <span>Share</span>
                  <ul>
                    <li>
                      <a>
                        <PinterestShareButton
                          media={
                            "https://www.google.com/search?q=image&rlz=1C5CHFA_enUS889US889&sxsrf=ALeKk02KpY9RJfQ2X1NDli7C2IrHfSQqTQ:1588882382454&tbm=isch&source=iu&ictx=1&fir=gOUAFhrbQ2nYQM%253A%252COXvyXJop1qSGqM%252C_&vet=1&usg=AI4_-kSgGwZYdbjPFPvtAMc9uu9_78J8ZQ&sa=X&ved=2ahUKEwiNl_uPyKLpAhUSLK0KHQn_AUwQ9QEwAnoECAUQNA#imgrc=gOUAFhrbQ2nYQM:"
                          }
                          url={`${
                            window.location.origin
                          }/recipe/${"tilapia-with-salad-and-mango-salsa"}`}
                          formTarget={"_blank"}
                          children={
                            <img
                              src={require("../../assets/images/pinterest-icon-blue.svg")}
                              alt=""
                            />
                          }
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FacebookShareButton
                          url={`${
                            window.location.origin
                          }/recipe/${"tilapia-with-salad-and-mango-salsa"}`}
                          formTarget={"_blank"}
                          children={
                            <img
                              src={require("../../assets/images/facebook-icon-blue.svg")}
                              alt=""
                            />
                          }
                        />
                      </a>
                    </li>
                    <li>
                      <a>
                        <TwitterShareButton
                          url={`${
                            window.location.origin
                          }/recipe/${"tilapia-with-salad-and-mango-salsa"}`}
                          formTarget={"_blank"}
                          children={
                            <img
                              src={require("../../assets/images/twitter-icon-blue.svg")}
                              alt=""
                            />
                          }
                        />
                      </a>
                    </li>
                    <li>
                      <a>
                        <EmailShareButton
                          url={`${
                            window.location.origin
                          }/recipe/${"tilapia-with-salad-and-mango-salsa"}`}
                          formTarget={"_blank"}
                          children={
                            <img
                              src={require("../../assets/images/sms-icon.svg")}
                              alt=""
                            />
                          }
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="recipes-banner-inner">
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="image-holder">
                {props.images && (
                  <>
                    {props.videoLink ? (
                      <div onClick={() => setToggler(!toggler)}>
                        <img
                          className="img-fluid"
                          src={props?.images[0]?.url}
                          alt=""
                        />
                        <div className="video-icon">
                          <a href="#">
                            <img
                              src={require("../../assets/images/video-icon.svg")}
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <img
                        className="img-fluid"
                        src={props?.images[0]?.url}
                        alt=""
                      />
                    )}
                    <FsLightbox
                      toggler={toggler}
                      // source={props.videoLink}
                      sources={[props.videoLink]}
                    />{" "}
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="recipes-banner-right">
                <div className="text-box">
                  {props.time && (
                    <ul>
                      <li>
                        Difficulty:
                        <span>{props.time.difficulty}</span>
                      </li>
                      <li>
                        Cook Time:
                        <span>
                          {props.time.cookTime} {props.time.timeUnit}
                        </span>
                      </li>
                      <li>
                        Prep Time:
                        <span>
                          {props.time.prepTime} {props.time.prepTimeUnits}
                        </span>
                      </li>
                      <li>
                        Servings:
                        <span>
                          {props.time.servings ? props.time.servings : 1}
                        </span>
                      </li>
                      <li>
                        NUTRITION FACTS:
                        <ul className="mt-1">
                          {generateNutritionFacts()}
                        </ul>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
