import {
  RECEIVE_EXPERTS_DATA,
  RETRIEVED_EXPERTS_DATA,
} from "../actions/expertsActions";

const initialState = {
  isLoading: false,
  data: [],
};

export default function expertsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_EXPERTS_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case RETRIEVED_EXPERTS_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    default:
      return state;
  }
}
