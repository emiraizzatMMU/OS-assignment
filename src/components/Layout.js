import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";

import Loading from "./mini/Loading";
import SnackBar from "./mini/SnackBar";
import { Fade } from "@mui/material";

class PublicComponent extends React.Component {
  state = {
    mobileOpen: false,
    errorSnackbar: false,
    successSnackbar: false,
    message: "",
    cartStatus: false,
    isReady: false,
  };

  numberWheelScroll = (e) => {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  };

  componentDidMount() {
    document.addEventListener("wheel", this.numberWheelScroll);
    this.appReady();
  }

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    document.removeEventListener("wheel", this.numberWheelScroll);
  }

  appReady = () => {
    this.setState({
      isReady: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { isLoading } = this.props.loading;
    const { errorSnackbar, successSnackbar, message } = this.state;

    if (this.state.isReady) {
      return (
        <div className={classes.root}>
          <SnackBar />
          <Fade in={isLoading} mountOnEnter unmountOnExit>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                position: "fixed",
                width: "100%",
                height: "100vh",
                backgroundColor: "white",
              }}
            >
              <Loading open={isLoading} />
            </div>
          </Fade>
          <div className={classes.content}>
            <main className={classes.main}>{this.props.children}</main>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    //overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    //backgroundColor: mainBgColor,
  },

  snackbarContainer: {
    width: "100%",
    height: "35px",
    position: "fixed",
    bottom: 0,
    zIndex: 1000,
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
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    //backgroundColor: mainBgColor,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    minHeight: "100vh",
    //minHeight: `calc(100vh - ${nvhDefault})`,
    width: "100%",
    maxWidth: "1100px",
    [theme.breakpoints.down("xs")]: {
      //minHeight: `calc(100vh - ${nvhMobile})`,
    },
  },
  DialogRoot: {
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
  },
});

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles, { withTheme: true })(PublicComponent));
