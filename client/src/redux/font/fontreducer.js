import { FontActionTypes } from "./fonttypes";

const INITIAL_STATE = {
  currentFont: null,
};

const fontReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FontActionTypes.SET_CURRENT_FONT:
      return {
        ...state,
        currentFont: action.payload,
      };
    default:
      return state;
  }
};

export default fontReducer;
