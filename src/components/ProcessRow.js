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

const ProcessRow = (props) => {
  const [isEdit, isEditSetter] = useState(false);
  const [aTime, aTimeSetter] = useState("");
  const [bTime, bTimeSetter] = useState("");
  const [priorityNum, priorityNumSetter] = useState("");
  const { isInitial, num, handleDelete, handleSave, data } = props;
  const classes = useStyles();

  const dataSetter = (isFill = true) => {
    if (isFill) {
      aTimeSetter(data.arrival);
      bTimeSetter(data.burst);
      priorityNumSetter(data.priority);
    } else {
      aTimeSetter("");
      bTimeSetter("");
      priorityNumSetter("");
    }
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      dataSetter();
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      dataSetter(!isEmpty(data));
    }
  }, [isEdit]);

  const handleText = (setText) => (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value == "" || re.test(e.target.value)) {
      setText(e.target.value);
    }
  };

  const handleEdit = (state) => () => {
    isEditSetter(state);
  };

  const handleClickSave = () => {
    let a = parseInt(aTime);
    let b = parseInt(bTime);
    let p = parseInt(priorityNum);

    if (isNaN(a) || isNaN(b) || isNaN(p)) {
      props.customNotification("All values must be a number", "error");
    } else if (b == 0) {
      props.customNotification("Burst time cannot be zero", "error");
    } else {
      handleEdit(false)();
      handleSave({
        arrival: parseInt(aTime),
        burst: parseInt(bTime),
        priority: parseInt(priorityNum),
      });
    }
  };

  return (
    <TableRow>
      <Dialog fullScreen open={isEdit} onClose={handleEdit(false)}>
        <SnackBar />
        <div className={classes.dialogContent}>
          <DialogTitle>Enter process details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              className={classes.textInput}
              label="Burst time"
              variant="outlined"
              value={bTime}
              onChange={handleText(bTimeSetter)}
            />
            <TextField
              className={classes.textInput}
              label="Arrival time"
              variant="outlined"
              value={aTime}
              onChange={handleText(aTimeSetter)}
            />

            <TextField
              className={classes.textInput}
              label="Priority"
              variant="outlined"
              value={priorityNum}
              onChange={handleText(priorityNumSetter)}
            />
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleEdit(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleClickSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      {isInitial && isEmpty(data) ? (
        <TableCell align="left" colSpan={5}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleEdit(true)}
            startIcon={<AddRounded />}
          >
            Add process
          </Button>
        </TableCell>
      ) : (
        <>
          <TableCell>
            <Typography
              className={classes.columnText}
              style={{ fontWeight: 700 }}
            >
              P{num}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography className={classes.columnText}>{data.burst}</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography className={classes.columnText}>
              {data.arrival}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography className={classes.columnText}>
              {data.priority}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <div className={classes.actionColumn}>
              <IconButton aria-label="edit" onClick={handleEdit(true)}>
                <EditRounded />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={handleDelete}
              >
                <DeleteRounded />
              </IconButton>
            </div>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    minHeight: "300px",
    height: "100vh",
    maxWidth: "500px",
    margin: "0 auto",
    boxSizing: "border-box",
    paddingBottom: "2rem",
  },
  textInput: {
    width: "100%",
    margin: "1rem 0",
  },
  actionColumn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  columnText: {
    fontSize: "1.2rem",
  },
});

export default connect(null, { customNotification })(ProcessRow);
