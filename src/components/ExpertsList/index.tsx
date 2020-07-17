import React, { useEffect } from "react";
import * as _ from "lodash";
import SearchBar from "../SearchBar";
import IndividualLatestRecipeHorizontal from "../RecomendedRecipes/IndividualLatestRecipeHorizontal";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import callApi from "../../apiHandler";
import { LoadingWrapper } from "../LoadingWrapper";

interface Props {
  experts: any[];
}

interface State {
  experts: any[];
  species: any[];
  recipes: any[];
  expertRecipes: any[];
  immutableExpertRecipes: any[];
  selectedSpecies: string;
  selectedExpert: string;
  amountOfExperts: number;
  isLoading: boolean;
}

class ExpertsList extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      experts: [],
      species: [],
      recipes: [],
      expertRecipes: [],
      immutableExpertRecipes: [],
      selectedSpecies: "",
      selectedExpert: "",
      amountOfExperts: 12,
      isLoading: false,
    };

    this.generateExpertList = this.generateExpertList.bind(this);
    this.generateLatestRecipesList = this.generateLatestRecipesList.bind(this);
    this.createExpertElement = this.createExpertElement.bind(this);
    this.onExpertChange = this.onExpertChange.bind(this);
    this.onSpeciesChange = this.onSpeciesChange.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const experts = await callApi("/experts");
    const species = await callApi("/all_species");
    const expertRecipes = await callApi(
      "/recipes?expert.name_ne=undefined&_limit=6&_sort=created_at"
    );
    this.setState({
      experts,
      species,
      expertRecipes,
      immutableExpertRecipes: expertRecipes,
      isLoading: false,
    });
    this.generateExpertList();
    this.generateLatestRecipesList();
  }

  generateExpertList() {
    const newList: any[] = [];
    if (this.state.experts.length > 0) {
      const amount =
        this.state.experts.length > this.state.amountOfExperts
          ? this.state.amountOfExperts
          : this.state.experts.length;
      for (let i = 0; i < amount; i++) {
        newList.push(this.createExpertElement(this.state.experts[i], i));
      }
    }
    return newList;
  }

  createExpertElement(expert, index) {
    return (
      <div
        className="col-md-3 col-sm-4 col-6 ifakelink"
        key={`expert_${index}`}
        onClick={() => (window.location.href = `/expert/${expert.slug}`)}
      >
        <div className="recipes-cooking-user">
          <img
            className="rounded-circle mw-212"
            src={expert.profilePicture.url}
          />
          <h3>
            {expert.name} {expert.blogName}
          </h3>
        </div>
      </div>
    );
  }

  generateLatestRecipesList() {
    const newList = [] as any;
    if (this.state.expertRecipes.length > 0) {
      for (let i = 0; i < this.state.expertRecipes.length; i++) {
        const {
          title,
          subTitle,
          blurb,
          slug,
          expert,
          images,
        } = this.state.expertRecipes[i];
        newList.push(
          <div className="col-lg-6 col-md-12" key={i}>
            <div className="lastest-recipes-box-inner">
              <div className="image-holder">
                <div
                  className="background-image"
                  style={{
                    backgroundImage: `url(${images[0].url})`,
                  }}
                />
                <div className="heart-icon">
                  <img src="images/heart-fill-icon2.svg" alt="" />
                </div>
                <div className="thumbnail-user">
                  <img
                    className="rounded-circle"
                    src={expert.profilePicture.url}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-box">
                <h3>{title}</h3>
                <p>{blurb}</p>
                <a href={`/recipe/${slug}`} className="stretched-link">CLICK FOR RECIPE</a>
              </div>
            </div>
          </div>
        );
        this.setState({ recipes: newList });
      }
    }
  }

  onExpertChange(value) {
    const expertFiltered = _.filter(
      this.state.immutableExpertRecipes,
      ({ expert }) => _.includes(expert.name, value)
    );
    this.setState(
      {
        selectedExpert: value,
        expertRecipes:
          expertFiltered.length > 0
            ? expertFiltered
            : this.state.immutableExpertRecipes,
      },
      () => this.generateLatestRecipesList()
    );
  }

  onSpeciesChange(value) {
    const speciesFiltered = _.filter(
      this.state.immutableExpertRecipes,
      ({ species }) =>
        _.includes(
          _.map(species, ({ name }) => name),
          value
        )
    );
    this.setState(
      {
        selectedSpecies: value,
        expertRecipes:
          speciesFiltered.length > 0
            ? speciesFiltered
            : this.state.immutableExpertRecipes,
      },
      () => this.generateLatestRecipesList()
    );
  }

  render() {
    const { experts, species } = this.state;
    return (
      <LoadingWrapper isLoading={this.state.isLoading}>
        {this.state.experts.length === 0 && (
            <div className="fill-body d-flex flex-column justify-content-center align-items-center">
              <h2 style={{"marginBottom":"1em"}}>Coming Soon!</h2>
              <h4>
                If you are interested in becoming a seafood expert, please
                contact us at <a href="mailto:experts@seafoodathome.com">experts@seafoodathome.com</a>.
              </h4>
            </div>
        )}
        {this.state.experts.length > 0 && (
            <section className="recipes-cooking-sec">
              <div className="recipes-cooking-inenr">
                <div className="container-md container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="recipes-cooking-top d-flex row">
                        <div className="dropdown col text-center">
                          <div
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                          >
                            <div className="form-group">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Experts"
                                  value={this.state.selectedExpert}
                                  readOnly
                              />
                              <a className="search-icon">
                                <img
                                    src={require("../../assets/images/search-icon.svg")}
                                    alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div
                              className="dropdown-menu custom-dropdown l-20"
                              aria-labelledby="expertsMenuButton"
                          >
                            {experts.map((expert, i) => (
                                <a
                                    key={`${expert.name}_${i}`}
                                    className="dropdown-item custom-item"
                                    onClick={() => this.onExpertChange(expert.name)}
                                >
                                  <p>{expert.name}</p>
                                </a>
                            ))}
                          </div>
                        </div>
                        <div className="dropdown col text-center l-21">
                          <div
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                          >
                            <div className="form-group">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Species"
                                  value={this.state.selectedSpecies}
                                  readOnly
                              />
                              <a className="search-icon">
                                <img
                                    src={require("../../assets/images/search-icon.svg")}
                                    alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div
                              className="dropdown-menu custom-dropdown l-20 row"
                              aria-labelledby="speciesMenuButton"
                          >
                            {species.map((spc, i) => (
                                <div className="col-3">
                                  <a
                                      key={`${spc.name}_${i}`}
                                      className="dropdown-item custom-item"
                                      onClick={() => this.onSpeciesChange(spc.name)}
                                  >
                                    <p>{spc.name}</p>
                                  </a>
                                </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="row">{this.generateExpertList()}</div>
                      {this.state.experts.length > this.state.amountOfExperts && (
                          <a
                              className="view-more-btn"
                              onClick={() =>
                                  this.setState({
                                    amountOfExperts: this.state.amountOfExperts + 12,
                                  })
                              }
                          >
                            VIEW MORE
                          </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lastest-recipes">
                <div className="container-md container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="heading">
                        <h2>
                          LATEST RECIPES
                        </h2>
                      </div>
                      <div className="lastest-recipes-inner">
                        <div className="row">{this.state.recipes}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        )}
      </LoadingWrapper>
    );
  }
}

function ExpertsListWithHook(Component) {
  return function WrappedComponent(props) {
    const experts = useSelector((state: any) => state.experts.data);
    return <Component {...props} experts={experts} />;
  };
}

export default ExpertsListWithHook(ExpertsList);
