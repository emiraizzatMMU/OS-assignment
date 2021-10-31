import { CLEAR_NOTIFICATION, NOTIFICATION } from "../actions";

const initialState = {
  message: "",
  status: "",
  redirect: "",
  show: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        message: "",
        status: "",
        redirect: "",
        show: false,
      };
    case NOTIFICATION:
      return {
        ...state,
        message: action.message,
        status: action.status,
        redirect: action.redirect,
        show: action.show,
      };
    default:
      return state;
  }
}
