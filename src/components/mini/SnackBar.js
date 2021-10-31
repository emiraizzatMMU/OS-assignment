import React from "react";
import isEmpty from "../../utils/isEmpty";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { clearNotification } from "../../store/actions/notificationAction";
import { Slide, Typography } from "@mui/material";

const styles = (theme) => ({
  snackbarContainer: {
    width: "100%",
    height: "30px",
    position: "fixed",
    bottom: 0,
    zIndex: 8888,
  },
  errorSnackbar: {
    height: "100%",
    backgroundColor: "crimson",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  successSnackbar: {
    height: "100%",
    backgroundColor: "#00A86B",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  snackbarMsg: {
    color: "white",
    fontSize: "1.3rem",
    fontWeight: 700,
  },
});

class SnackBar extends React.Component {
  state = {
    errorSnackbar: false,
    successSnackbar: false,
    message: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (isEmpty(prevProps.noti.message) && !isEmpty(this.props.noti.message)) {
      if (
        this.props.noti.status === "error" &&
        isEmpty(prevProps.noti.status)
      ) {
        this.setState({
          errorSnackbar: true,
        });
      } else if (
        this.props.noti.status === "success" &&
        isEmpty(prevProps.noti.status)
      ) {
        this.setState({
          successSnackbar: true,
        });
      }
      this.setState({
        message: this.props.noti.message,
      });
      this.closeSnackbar();
      this.clearNoti();
    }
  }

  closeSnackbar = () => {
    setTimeout(() => {
      this.setState({
        errorSnackbar: false,
        successSnackbar: false,
      });
    }, 2500);
  };

  clearNoti = () => {
    setTimeout(() => {
      this.props.clearNotification();
    }, 3000);
  };

  render() {
    const { classes } = this.props;
    const { errorSnackbar, successSnackbar, message } = this.state;
    const { status } = this.props.noti;

    if (!isEmpty(this.props.noti.message) && this.props.noti.show) {
      return (
        <div className={classes.snackbarContainer}>
          {status === "error" && (
            <Slide in={errorSnackbar} direction="up">
              <div className={classes.errorSnackbar}>
                <Typography className={classes.snackbarMsg}>
                  {message}
                </Typography>
              </div>
            </Slide>
          )}

          {status === "success" && (
            <Slide in={successSnackbar} direction="up">
              <div className={classes.successSnackbar}>
                <Typography className={classes.snackbarMsg}>
                  {message}
                </Typography>
              </div>
            </Slide>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  noti: state.noti,
});

export default connect(mapStateToProps, { clearNotification })(
  withStyles(styles, { withTheme: true })(SnackBar)
);
