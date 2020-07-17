import React, { lazy, useState } from "react";
import * as _ from "lodash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import renderHTML from "react-render-html";
import { withRouter } from "react-router-dom";
import callApi from "../../apiHandler";

const RecomendedRecipes = lazy(() => import("../RecomendedRecipes"));
interface Props {
  species: any[];
  selectedSpecies?: string;
}

interface State {
  species: any[];
  countPerRow: number;
  selectedSpecies: number | null;
  htmlElements: any[];
  countForRecipes: number;
  currentFilter: string;
  relatedRecipes: any[];
}

const SpeciesList = (props: Props) => {
  const [state, setState] = useState({
    species: [],
    countPerRow: 4,
    selectedSpecies: null,
    htmlElements: [],
    countForRecipes: 8,
    currentFilter: "",
    relatedRecipes: [],
  } as State);

  const handleOnClick = (selectedSpecies) => {
    window.location.href = `/species/${selectedSpecies}`;
  };

  const generateList = () => {
    const { species } = props;

    if (species) {
      return species
        .filter((s) =>
          _.includes(_.toLower(s.name), _.toLower(state.currentFilter))
        )
        .map(({ name, icon, slug }, index) => {
          return (
            <div
              className="col-md-3 col-sm-4 col-6"
              key={index}
              onClick={() => handleOnClick(slug)}
            >
              <div className="recipes-brand-box">
                <img src={icon.url} alt="" />
                <h3>{name}</h3>
              </div>
            </div>
          );
        });
    }
  };

  const onType = (e) => {
    setState({ ...state, currentFilter: e.target.value });
  };

  return (
    <div className="recipes-brand-page">
      <section className="recipes-brand-sec">
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="recipes-brand-inner">
                <div>
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Species"
                      onChange={onType}
                    />
                    <a href="#">
                      <LazyLoadImage
                        src={require("../../assets/images/search-icon.svg")}
                        alt=""
                        effect="blur"
                      />
                    </a>
                  </form>
                  <div className="row">
                    {props.species.length ? (
                      generateList()
                    ) : (
                      <div className="d-flex justify-content-around w-100 text-center p-3">
                        There are no matches for this search
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeciesList;
