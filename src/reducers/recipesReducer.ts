import {
  RECEIVE_RECIPES_DATA,
  RETRIEVED_RECIPES_DATA,
  SET_SEARCH_VALUE,
} from "../actions/recipesActions";

const initialState = {
  isLoading: false,
  data: [],
  searchResults: [],
};

export default function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_RECIPES_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case RETRIEVED_RECIPES_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchResults: action.searchResults,
      };
    default:
      return state;
  }
}
