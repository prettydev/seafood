export const RECEIVE_RECIPES_DATA = "RECEIVE_RECIPES_DATA";
export const RETRIEVED_RECIPES_DATA = "RETRIEVED_RECIPES_DATA";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";

export function receiveRecipesData() {
  return { type: RECEIVE_RECIPES_DATA };
}

export function retrievedRecipesData(data) {
  return { type: RETRIEVED_RECIPES_DATA, data };
}

export function setSearchValue(searchResults) {
  return { type: SET_SEARCH_VALUE, searchResults };
}
