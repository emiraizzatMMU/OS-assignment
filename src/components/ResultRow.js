import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableCell,
  TableRow,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { AddRounded, DeleteRounded, EditRounded } from "@mui/icons-material";
import isEmpty from "../utils/isEmpty";
import { customNotification } from "../store/actions/notificationAction";
import { connect } from "react-redux";
import SnackBar from "./mini/SnackBar";

const ResultRow = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>
        <Typography className={classes.columnText} style={{ fontWeight: 700 }}>
          P{data.num}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.columnText}>{data.burst}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.columnText}>{data.arrival}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.columnText}>{data.end}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.columnText}>
          {data.turnaround}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.columnText}>{data.waiting}</Typography>
      </TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles({
  columnText: {
    fontSize: "1.2rem",
  },
});

export default connect(null, { customNotification })(ResultRow);
