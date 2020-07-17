import React, { useState, useEffect } from "react";
import _ from "lodash";
import ShareModal from "../ShareModal";
import callApi from "../../apiHandler";
import renderHTML from "react-render-html";
import ClipLoader from "react-spinners/ClipLoader";

function LikedPageContent() {
  const [unliking, setUnliking] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState([] as any);
  const [immutRecipes, setImmutRecipes] = useState([] as any);
  const [numberOfRecipes, setNumberOfRecipes] = useState(5);
  const [selectedRecipe, setSelectedRecipe] = useState({} as any);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const callForLikedRecipes = async () => {
    if (!_.isNil(user.id)) {
      const response = await callApi(`/user-likes?user.id_eq=${user.id}`);
      setLikedRecipes(response);
      setImmutRecipes(response);
    }
  };

  const onType = (e) => {
    if (e.target.value.length > 0) {
      setLikedRecipes(
        _.filter(immutRecipes, ({ recipe }) => {
          return (
            _.includes(recipe.title, e.target.value) ||
            _.includes(recipe.content, e.target.value)
          );
        })
      );
    }
  };

  const unlikeRecipe = async (recipeId, index) => {
    setUnliking({ ...unliking, [index]: true });
    const response = await callApi(`/recipe/like/${recipeId}`).catch((e) => {
      setUnliking({ ...unliking, [index]: false });
    });
    if (response) {
      const response = await callApi(`/user-likes?user.id_eq=${user.id}`);
      setLikedRecipes(response);
      setImmutRecipes(response);
      setUnliking({ ...unliking, [index]: false });
    }
  };

  useEffect(() => {
    callForLikedRecipes();
  }, []);

  const viewWidth = window.innerWidth;

  return (
    <section className="create_profile_sec profile">
      <div className="container-md container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-12 mb_40">
            <div className="d-flex align-items-center profile_img_wrapper">
              <div className="mr_30 profile_img">
                <img
                  src={
                    user?.profileImage?.url
                      ? user.profileImage.url
                      : require("../../assets/images/user-icon.svg")
                  }
                  className="profile_img"
                  alt=""
                  style={{ backgroundColor: "grey" }}
                />
              </div>
              <div>
                <h2>
                  HEY{" "}
                  {_.toUpper(user.firstName) + " " + _.toUpper(user.lastName)}!
                </h2>
                <a href="/edit-profile" className="view-more-btn edit">
                  Edit profile
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-5 col-xl-4 mt_20">
            <h5>MY RECIPES</h5>
          </div>
          <div className="col-sm-8 col-md-7 col-xl-7 text-sm-right mt_20">
            <div className="recipes-cooking-top m-0">
              <form>
                <div className="form-group search_wrapper">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={onType}
                  />
                  <a href="#">
                    <img
                      src={require("../../assets/images/search-icon.svg")}
                      alt=""
                    />
                  </a>
                </div>
              </form>
            </div>
          </div>

          {likedRecipes
            .map(({ recipe }: any, index) => (
              <div className="col-xl-12" key={"liked_" + recipe.slug}>
                <div className="product_wrapper mt_30">
                  <div className="d-flex justify-content-between product">
                    <div
                      className="image-holder background-image mr_30"
                      style={{
                        backgroundImage: `url(${recipe.images[0].url})`,
                        width: "220px",
                        height: "220px",
                        minWidth: "220px",
                      }}
                    />
                    <div className="description">
                      <h4>{recipe.title}</h4>
                      <div>
                        {recipe.content ? renderHTML(recipe.content) : <p></p>}
                      </div>

                      <a
                        href={`recipe/${recipe.slug}`}
                        className="view-more-btn mt_20 stretched-link"
                      >
                        CLICK FOR RECIPE
                      </a>
                    </div>
                    <div className="action">
                      <a
                        className="share mr_30"
                        data-toggle="modal"
                        data-target="#share"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedRecipe(recipe);
                        }}
                      >
                        SHARE
                      </a>
                      <a
                        onClick={() => unlikeRecipe(recipe.id, index)}
                        className="remove"
                      >
                        {unliking[index] ? (
                          <ClipLoader color={"#fff"} />
                        ) : (
                          "REMOVE"
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
            .slice(0, numberOfRecipes)}

          {numberOfRecipes < likedRecipes?.length && (
            <div className="col-12 text-center mt_30">
              <a
                href="#"
                onClick={() => setNumberOfRecipes(numberOfRecipes + 5)}
                className="view-more-btn mt_20"
              >
                VIEW MORE
              </a>
            </div>
          )}
        </div>
      </div>
      {!_.isEmpty(selectedRecipe) && (
        <ShareModal
          isOpen={isOpen}
          runAfter={() => setIsOpen(false)}
          recipe={selectedRecipe}
        />
      )}
    </section>
  );
}

export default LikedPageContent;
