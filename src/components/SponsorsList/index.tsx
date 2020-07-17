import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import callApi from "../../apiHandler";

interface State {
  sponsors: any[];
  countPerRow: number;
  selectedSponsors: number | null;
  htmlElements: any[];
  countForRecipes: number;
  currentFilter: string;
  relatedRecipes: any[];
}

const SponsorsList = () => {
  const [state, setState] = useState({
    sponsors: [],
    countPerRow: 4,
    selectedSponsors: null,
    htmlElements: [],
    countForRecipes: 8,
    currentFilter: "",
    relatedRecipes: [],
  });

  useEffect(() => {
    callSponsors();
  }, []);

  const callSponsors = async () => {
    setState({ ...state, sponsors: await callApi("/sponsors") });
  };

  const generateList = () => {
    const { sponsors } = state;
    if (sponsors) {
      return sponsors
        .filter((s: any) =>
          _.includes(_.toLower(s.name), _.toLower(state.currentFilter))
        )
        .map(({ name, image, link }: any, index) => {
          return (
            <div
              className="col-md-3 col-sm-4 col-6 ifakelink"
              key={index}
              onClick={() => (window.location.href = link)}
            >
              <div className="recipes-brand-box">
                <img src={image.url} alt="" />
                {/*<h3>{name}</h3>*/}
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
                {_.isNil(state.selectedSponsors) && (
                  <div>
                    <form>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Sponsors"
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
                      {state.sponsors.length ? (
                        generateList()
                      ) : (
                        <div className="d-flex justify-content-around w-100 text-center p-3">
                          There are no matches for this search
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SponsorsList;
