import {
  RECEIVE_SPECIES_DATA,
  RETRIEVED_SPECIES_DATA,
} from "../actions/speciesActions";

const initialState = {
  isLoading: false,
  data: [],
};

export default function speciesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SPECIES_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case RETRIEVED_SPECIES_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    default:
      return state;
  }
}
