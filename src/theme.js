import { createTheme } from "@mui/material/styles";
import {
  mainBgColor,
  primary,
  primaryDark,
  primaryLight,
  secondary,
  secondaryDark,
  secondaryLight,
} from "./utils/ColorPicker";

export const theme = createTheme({
  typography: {
    fontFamily: "Lato, Arial, Helvetica, sans-serif",
  },
  palette: {
    primary: {
      light: primaryLight,
      main: primary,
      dark: primaryDark,
      contrastText: "#fff",
    },
    secondary: {
      light: secondaryLight,
      main: secondary,
      dark: secondaryDark,
      contrastText: "#fff",
    },
    info: {
      light: "#505050",
      main: "#252525",
      dark: "#000",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontFamily: "Lato, Arial, Helvetica, sans-serif",
        fontSize: "0.8rem",
        fontWeight: 400,
        letterSpacing: "0.8px",
      },
    },
    MuiDialog: {
      paperFullScreen: {
        height: "auto",
        maxHeight: "80vh",
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0,0,0,0.7)",
      },
    },
    MuiExpansionPanelSummary: {
      expandIcon: {
        color: "rgba(0,0,0,0)",
      },
    },
    MuiExpansionPanel: {
      root: {
        "&:before": {
          backgroundColor: "rgba(0,0,0,0)",
        },
      },
    },
    MuiCollapse: {
      root: {
        width: "100%",
      },
      container: {
        width: "100%",
      },
      wrapper: {
        width: "100%",
      },
      wrapperInner: {
        width: "100%",
      },
    },
    MuiTabs: {
      scroller: { padding: "0 0.1rem" },
    },
    MuiList: {
      root: {
        backgroundColor: mainBgColor,
      },
    },
    MuiListItem: {
      root: {
        letterSpacing: "0.1rem",
      },
    },
    MuiBottomNavigationAction: {
      root: {
        color: "rgba(0, 0, 0, 0.25)",
      },
    },
    MuiButton: {
      root: {
        fontFamily: "Lato, Arial, Helvetica, sans-serif",
        letterSpacing: "0.2rem",
        height: "44px",
        borderRadius: "22px",
        fontSize: "1rem",
      },
    },
    MuiToggleButtonGroup: {
      root: {
        padding: 0,
      },
    },
    MuiTimelineContent: {
      positionRight: {
        flex: 2,
      },
    },
  },
});
