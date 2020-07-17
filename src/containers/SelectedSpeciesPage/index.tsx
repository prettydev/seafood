import React, { useEffect, useState } from "react";
import callApi from "../../apiHandler";
import RecomendedRecipes from "../../components/RecomendedRecipes";
import renderHTML from "react-render-html";

function SelectedSpeciesPage(props) {
  const selectedSpecies = props.match.params.selectedSpecies;
  const [species, setSpecies] = useState({
    icon: {
      url: "",
    },
    description: "",
    recipes: [],
    name: "",
  } as any);
  const [recipes, setRecipes] = useState([] as any);

  const callSpecies = async () => {
    const speciesData = await callApi(`/species?slug_eq=${selectedSpecies}`);
    setSpecies(speciesData[0]);
  };

  const callRecipes = async () => {
    const recipeData = await callApi(
      `/recipes?species.slug_eq=${selectedSpecies}`
    );
    setRecipes(recipeData);
  };

  useEffect(() => {
    callSpecies();
    callRecipes();
  }, [props.match.params.selectedSpecies]);

  // console.log(species.description);

  return (
    <div className="container-md container-fluid mt-5">
      <div className="d-flex row">
        <div className="col-lg-3 col-sm-12">
          <img
            src={species.icon.url}
            alt=""
            onClick={() => (window.location.href = "/species")}
          />
        </div>
        <div className="col-lg-9 col-sm-12 mt-sm-4 p-3 species-blurb">
          <h1 className="text-center">{species.name}</h1>
          {renderHTML(species.description)}
        </div>
      </div>
      {species.recipes.length > 0 ? (
        <RecomendedRecipes
          title={`${species.name} Recipes`}
          propRecipes={recipes}
          recipeCount={8}
        />
      ) : (
        <h3 className="p-5 text-center container">No Matching Recipes</h3>
      )}
    </div>
  );
}

export default SelectedSpeciesPage;
