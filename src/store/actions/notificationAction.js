import { CLEAR_NOTIFICATION, NOTIFICATION } from "./index";

export const clearNotification = () => (dispatch) => {
  dispatch({
    type: CLEAR_NOTIFICATION,
  });
};

export const customNotification =
  (message, status, redirect = "", show = true) =>
  (dispatch) => {
    dispatch({
      type: NOTIFICATION,
      message: message,
      status: status,
      redirect: redirect,
      show: show,
    });
  };
