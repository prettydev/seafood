import {
  RECEIVE_SITE_SETTINGS_DATA,
  RETRIEVED_SITE_SETTINGS_DATA,
  RECIEVE_CUSTOM_PAGES,
  RETRIEVED_CUSTOM_PAGES,
} from "../actions/siteSettingsActions";

const initialState = {
  isLoading: false,
  data: {},
  pages: [],
};

export default function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SITE_SETTINGS_DATA:
    case RECIEVE_CUSTOM_PAGES:
      return {
        ...state,
        isLoading: true,
      };
    case RETRIEVED_SITE_SETTINGS_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case RETRIEVED_CUSTOM_PAGES:
      return {
        ...state,
        pages: action.data,
        isLoading: false,
      };
    default:
      return state;
  }
}
