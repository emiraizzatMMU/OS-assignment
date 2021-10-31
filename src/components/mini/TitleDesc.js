import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Typography } from "@mui/material";

const TitleDesc = (props) => {
  const classes = useStyles();
  const { title, desc } = props;
  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.desc}>{desc}</Typography>
    </Paper>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 1.5rem",
    margin: "1.5rem 0",
    marginRight: "1rem",
  },
  title: {
    fontSize: "0.9rem",
    color: "dimgrey",
    paddingBottom: "0.5rem",
  },
  desc: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
});

export default TitleDesc;
