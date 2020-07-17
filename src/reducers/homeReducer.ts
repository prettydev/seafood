import { RECEIVE_HOME_DATA, RETRIEVED_HOME_DATA } from "../actions/homeActions";

const initialState = {
  isLoading: false,
  data: {},
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_HOME_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case RETRIEVED_HOME_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    default:
      return state;
  }
}
