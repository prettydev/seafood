import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import callApi from "../../apiHandler";
import renderHTML from "react-render-html";
import ReactPlayer from "react-player";
import Directions from "../Recipe/Directions";
import Ingredients from "../Recipe/Ingredients";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { response } from "express";
import { LoadingWrapper } from "../LoadingWrapper";
import {
  PinterestShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

interface PostData {
  title: string;
  recipe: Recipe;
}

interface Recipe {
  recipeContent: RecipeContentComponent[];
  ingredientsList: [];
  directions: [];
}

interface RecipeContentComponent {
  __component: string;
  ingredientsList: [];
  directions: [];
}

function SponsoredRecipeContent(props) {
  const [postData, setPostData] = useState({
    bodyText: "",
    coverImage: {
      url: "",
    },
    sponsorLogo: {
      url: "",
    },
    expert: {
      blogName: "",
      profilePicture: {
        url: "",
      },
    },
    images: [],
    title: "",
    videoLink: "",
    expertExcerpt: "",
  } as any);

  const [recipe, setRecipe] = useState({
    bodyContent: "",
    created_at: "",
    id: 0,
    images: [{ url: "" }],
    meta: {},
    noteContent: "",
    nutritionFacts: [],
    recipeContent: [],
    slug: "",
    subTitle: "",
    directions: [],
    ingredientsList: [],
  } as any);

  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    const data = await callApi(`/post/${props.selectedPost}`);
    if (data) {
      setRecipe({ ...data.recipe });
      setPostData({ ...data });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <LoadingWrapper isLoading={isLoading}>
        <section className="recipes-salmon-sec">
          <div className="recipes-salmon-top">
            <div className="container-md container-fluid">
              <div className="row">
                <div className="col-md-9">
                  <div className="recipes-salmon-left">
                    <h2>{postData?.title}</h2>
                    <div className="recipes-print">
                      {!_.isEmpty(recipe) && (
                        <ul>
                          <li>
                            <a>
                              <PinterestShareButton
                                media={recipe?.images[0].url}
                                url={`${window.location.origin}/post/${postData.slug}`}
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
                                url={`${window.location.origin}/post/${postData.slug}`}
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
                                url={`${window.location.origin}/post/${postData.slug}`}
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
                                url={`${window.location.origin}/post/${postData.slug}`}
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
                      )}
                      <a className="print-btn" onClick={window.print}>
                        <LazyLoadImage
                          src={require("../../assets/images/print-icon.svg")}
                          effect="blur"
                        />
                        PRINT PAGE
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  {postData?.expert && (
                    <div className="recipes-salmon-right">
                      <div className="image-holder">
                        {/*<img src={expert.profilePicture.url} alt="" />*/}
                        <LazyLoadImage
                          src={postData?.expert.profilePicture.url}
                          effect="blur"
                        />
                      </div>
                      <h3>{postData?.expert.blogName}</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="recipes-video">
          <div className="container-md container-fluid">
            <div className="row">
              <div className="col-12">
                {postData?.sponsorLogo && (
                  <div className="recipes-video-title">
                    <h3>
                      BROUGHT TO YOU BY{" "}
                      <LazyLoadImage
                        src={postData?.sponsorLogo.url}
                        effect="blur"
                      />
                    </h3>
                  </div>
                )}
                <div className="image-holder">
                  {!_.isNil(recipe?.videoLink) && (
                    <div className="d-flex justify-content-center">
                      <ReactPlayer url={recipe?.videoLink} />
                    </div>
                  )}
                  {recipe?.images?.length > 0 && !recipe?.videoLink && (
                    <LazyLoadImage
                      className="img-fluid"
                      src={recipe?.images[0].url}
                      effect="blur"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {postData.content && (
          <section className="recipes-salmon-been">
            <div className="container-md container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="recipes-salmon-been-inner">
                    {renderHTML(postData?.content)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {recipe && (
          <section className="coconut-curry-sec">
            <div className="container-md container-fluid">
              <div className="coconut-curry-prep">
                <div className="row">
                  <div className="col-md-8">
                    <div className="coconut-curry-left">
                      <h3>{recipe?.title}</h3>
                      {recipe?.tags && recipe?.tags?.length > 0 && (
                        <p>
                          • {recipe?.tags.map(({ tag }) => tag).join(" • ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    {recipe.time && (
                      <div className="coconut-curry-right">
                        <ul>
                          <li>
                            Prep Time:{" "}
                            <strong>
                              {recipe?.time.prepTime}{" "}
                              {recipe?.time.prepTimeUnits}
                            </strong>{" "}
                          </li>
                          <li>
                            Cooking time:{" "}
                            <strong>
                              {" "}
                              {recipe?.time.cookTime} {recipe?.time.timeUnit}
                            </strong>{" "}
                          </li>
                          <li>
                            servings: <strong>4</strong>{" "}
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!_.isEmpty(recipe) && (
                <div className="row">
                  <div className="col-md-6">
                    <Ingredients ingredients={recipe?.ingredients} />
                  </div>
                  <div className="col-md-6">
                    <Directions directions={recipe?.directions} />
                  </div>
                </div>
              )}
              <div className="nutrition-fact-curry">
                {recipe.nutritionFacts && (
                  <div className="text-inner">
                    <h3>NUTRITION FACTS:</h3>
                    <p>
                      |
                      {
                        recipe?.nutritionFacts &&
                          _.map(
                            recipe.nutritionFacts[0],
                            (value, key, index) => {
                              if (key !== "id" && !_.isNil(value)) {
                                return ` ${key} : ${value} |`;
                              }
                            }
                          )
                        // recipe?.nutritionFacts[0]
                        //   .mapKeys(
                        //     ({ nutritionComponent, unit, showUnit, value }, key) =>
                        //       _.compact([
                        //         value,
                        //         showUnit && unit,
                        //         nutritionComponent,
                        //       ]).join(" ")
                        //   )
                        //   .join(" | ")}
                      }
                    </p>
                  </div>
                )}
                {recipe?.images && (
                  <div className="row">
                    {recipe.images.map(({ url }, index) => (
                      <div className="col-sm-6" key={"image_" + index}>
                        <div className="image-holder">
                          {/*<img className="img-fluid" src={url} alt="" />*/}
                          <LazyLoadImage
                            className="img-fluid"
                            src={url}
                            effect="blur"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
        {postData?.sponsorLogo && (
          <div className="recipes-video-title">
            <h3>
              BROUGHT TO YOU BY{" "}
              <LazyLoadImage src={postData?.sponsorLogo.url} effect="blur" />
            </h3>
          </div>
        )}
        {postData?.expert && postData.expertExcerpt && (
          <section className="nutrition-user-sec">
            <div className="container-md container-fluid">
              <div className="row">
                <div className="col-12">
                  {postData?.expert && (
                    <div className="nutrition-user-inner">
                      <div className="image-holder">
                        <LazyLoadImage
                          className="img-fluid"
                          src={postData?.expert.profilePicture.url}
                          effect="blur"
                        />
                      </div>
                      <div className="text-box">
                        {renderHTML(postData?.expertExcerpt)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </LoadingWrapper>
    </>
  );
}

export default SponsoredRecipeContent;
