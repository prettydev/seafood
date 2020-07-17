import {
  RECEIVE_POSTS_DATA,
  RETRIEVED_POSTS_DATA,
} from "../actions/postActions";

const initialState = {
  isLoading: false,
  data: [],
};

export default function speciesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POSTS_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case RETRIEVED_POSTS_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    default:
      return state;
  }
}
