import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { Paper, Typography } from "@mui/material";

const SingleCell = (props) => {
  const classes = useStyles();
  const { data, isFirst } = props;
  const diff = data.end - data.start;

  return (
    <div
      className={classes.singleCellContainer}
      style={{ width: `${diff * 20}px`, minWidth: "30px" }}
    >
      <div className={classes.singleCellMain}>
        <Typography style={{ fontSize: "1.2rem", fontWeight: 700 }}>
          P{data.num}
        </Typography>
      </div>
      <div className={classes.singleCellAlt}>
        <Typography
          style={{
            visibility: isFirst ? "visible" : "hidden",
            fontSize: "1.1rem",
            position: "absolute",
            left: -3,
            top: 0,
          }}
        >
          {data.start}
        </Typography>
        <Typography
          style={{
            fontSize: "1.1rem",
            position: "absolute",
            right: data.end >= 10 ? -7 : -3,
            top: 0,
          }}
        >
          {data.end}
        </Typography>
      </div>
    </div>
  );
};

const GanttChart = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <Paper className={classes.root}>
      <Typography style={{ color: "dimgrey", paddingBottom: "0.5rem" }}>
        Gantt Chart
      </Typography>
      <div className={classes.chart}>
        {data.map((e, i) => {
          return <SingleCell key={i} isFirst={i === 0} data={e} />;
        })}
      </div>
    </Paper>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "1.5rem 0",
    padding: "1.5rem",
  },
  chart: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  singleCellContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 0",
  },
  singleCellMain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.3rem 0",
    border: "2px solid black",
  },
  singleCellAlt: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
});

export default GanttChart;
