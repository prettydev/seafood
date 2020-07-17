import homeReducer from "./homeReducer";
import speciesReducer from "./speciesReducer";
import recipesReducer from "./recipesReducer";
import expertsReducer from "./expertsReducer";
import postsReducer from "./postsReducer";
import siteSettingsReducer from "./siteSettingsReducer";

export default {
  home: homeReducer,
  species: speciesReducer,
  recipes: recipesReducer,
  experts: expertsReducer,
  posts: postsReducer,
  settings: siteSettingsReducer,
};
