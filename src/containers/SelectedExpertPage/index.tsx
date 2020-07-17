import React, { useEffect, useState } from "react";
import callApi from "../../apiHandler";
import RecomendedRecipes from "../../components/RecomendedRecipes";
import renderHTML from "react-render-html";

function SelectedExpertPage(props) {
  const selectedExpert = props.match.params.slug;
  const [expert, setExpert] = useState({
    profilePicture: {
      url: "",
    },
    name: "",
    bio: "<p>No Bio</p>",
  } as any);
  const [recipes, setRecipes] = useState([] as any);

  const callExpert = async () => {
    const expertData = await callApi(`/experts?slug_eq=${selectedExpert}`);
    setExpert({ ...expert, ...expertData[0] });
  };

  const callRecipes = async () => {
    const recipeData = await callApi(
      `/recipes?expert.slug_eq=${selectedExpert}`
    );
    setRecipes(recipeData);
  };

  useEffect(() => {
    callExpert();
    callRecipes();
  }, [selectedExpert]);

  return (
    <div className="container-md container-fluid mt-5">
      <div className="d-flex row">
        <div className="col-lg-3 col-sm-12">
          <img
            className="rounded-circle mw-212"
            src={expert.profilePicture.url}
            alt=""
          />
        </div>
        <div className="col-lg-9 col-sm-12 mt-sm-4 p-3">
          {renderHTML(expert.bio)}
        </div>
      </div>
      {recipes.length > 0 ? (
        <RecomendedRecipes
          title={`${expert.name} Recipes`}
          propRecipes={recipes}
          recipeCount={8}
        />
      ) : (
        <h3 className="p-5 text-center container">No Matching Recipes</h3>
      )}
    </div>
  );
}

export default SelectedExpertPage;
