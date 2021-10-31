import { SET_LOADING } from "./index";

export const setLoading = (state) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: state,
  });
};
