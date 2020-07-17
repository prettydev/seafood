import React from "react";
import { callbackify } from "util";
import { withRouter } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import callApi from "../../apiHandler";
import { SET_SEARCH_VALUE } from "../../actions/recipesActions";
import { useDispatch } from "react-redux";
import * as _ from "lodash";

interface Props {
  placeholder: string;
  action: Function;
  addClasses?: string;
  history: any;
  value?: string;
}

function SearchBar(props: any) {
  const dispatch = useDispatch();
  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (props.value) {
        const searchResults = await callApi(
          `/recipes?title_contains=${props.value}`
        );

        //TODO: Remove _.Values if searchResults returns array not Object.
        dispatch({
          type: SET_SEARCH_VALUE,
          searchResults: _.values(searchResults),
        });
        props.history.push("/search-results");
      } else {
        dispatch({
          type: SET_SEARCH_VALUE,
          searchResults: [],
        });
      }
    }
  }
  return (
    <div className={`form-group ${props.addClasses}`}>
      <input
        type="text"
        className="form-control"
        onChange={(e) => props.action(e)}
        placeholder={props.placeholder}
        onKeyDown={handleKeyDown}
      />
      <a
        className="search-icon"
        onClick={(e) => {
          handleKeyDown({ key: "Enter" });
        }}
      >
        <img src={require("../../assets/images/search-icon.svg")} alt="" />
      </a>
    </div>
  );
}

export default withRouter(SearchBar);
