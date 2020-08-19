import { FontActionTypes } from "./fonttypes";

export const setCurrentFont = (font) => ({
  type: FontActionTypes.SET_CURRENT_FONT,
  payload: font,
});
