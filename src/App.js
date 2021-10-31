import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Layout from "./components/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProcessRow from "./components/ProcessRow";
import {
  Button,
  Collapse,
  Fade,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import isEmpty from "./utils/isEmpty";
import { setLoading } from "./store/actions/loadingAction";
import { algorithmList, algoritmSelector } from "./utils/algorithm";
import { customNotification } from "./store/actions/notificationAction";
import GanttChart from "./components/GanttChart";
import TitleDesc from "./components/mini/TitleDesc";
import ResultRow from "./components/ResultRow";
import { primaryLight } from "./utils/ColorPicker";

const App = (props) => {
  const classes = useStyles();
  const [process, processSetter] = useState([]);
  const [algoSelected, algoSelectedSetter] = useState(0);
  const [result, resultSetter] = useState({});
  const isResult = !isEmpty(result);

  useEffect(() => {
    setTimeout(() => {
      props.setLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    console.log("getResult", result);
  }, [result]);

  const handleText = (setText) => (e) => {
    setText(e.target.value);
  };

  const handleProcessDelete = (index) => () => {
    let arr = [...process];
    arr.splice(index, 1);

    processSetter(arr);
  };

  const handleProcessSave =
    (index = null) =>
    (data) => {
      let arr = [...process];
      if (!isEmpty(index)) {
        arr[index] = data;
      } else {
        arr.push(data);
      }

      processSetter(arr);
    };

  const handleClearResult = () => {
    resultSetter({});
  };

  const handleCalculate = () => {
    if (algoSelected == 0) {
      props.customNotification(
        "Please select one scheduling algorithm",
        "error"
      );
    } else if (isEmpty(process)) {
      props.customNotification("Process cannot be empty", "error");
    } else {
      const processList = [...process];
      processList.map((e, i) => {
        e.num = i;
      });
      resultSetter(algoritmSelector(algoSelected, processList));
    }
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Typography
          className={classes.sectionTitle}
          style={{ marginBottom: "3rem" }}
        >
          OS Assignment 2110 by Azizi, Adry, Emir
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              style={{ backgroundColor: primaryLight, color: "white" }}
            >
              <TableRow>
                <TableCell className={classes.tableHeadCell}>Process</TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  Burst time
                </TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  Arrival time
                </TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  {isResult ? "Finishing time" : "Priority"}
                </TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  {isResult ? "Turnaround time" : "Action"}
                </TableCell>
                {isResult ? (
                  <TableCell className={classes.tableHeadCell} align="center">
                    Waiting time
                  </TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isResult
                ? process.map((e, i) => {
                    return (
                      <ProcessRow
                        key={i}
                        num={i}
                        data={e}
                        handleDelete={handleProcessDelete(i)}
                        handleSave={handleProcessSave(i)}
                      />
                    );
                  })
                : [...result.table]
                    .sort((a, b) => a.num - b.num)
                    .map((e, i) => {
                      return <ResultRow key={i} num={i} data={e} />;
                    })}
              <Collapse in={!isResult}>
                <ProcessRow isInitial handleSave={handleProcessSave()} />
              </Collapse>
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.settingContainer}>
          <TextField
            select
            color="secondary"
            label="Scheduling alogrithm"
            value={algoSelected}
            onChange={handleText(algoSelectedSetter)}
            style={{ width: "100%", marginBottom: "1rem" }}
            disabled={isResult}
          >
            <MenuItem value={0} disabled>
              Select scheduling algorithm
            </MenuItem>
            {algorithmList.map((e, i) => (
              <MenuItem key={i} value={e.value}>
                {e.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            onClick={isResult ? handleClearResult : handleCalculate}
          >
            {isResult ? "Reset" : "Calculate"}
          </Button>
        </div>

        {isResult ? (
          <Fade in={isResult}>
            <div className={classes.resultContainer}>
              <Typography className={classes.sectionTitle}>Result</Typography>
              <TitleDesc
                title="Algorithm used"
                desc={algorithmList.find((f) => f.value == algoSelected).label}
              />
              <GanttChart data={result.sorted} />
              <div className={classes.resultContainerRow}>
                <TitleDesc
                  title="Total turnaround time"
                  desc={result.turnaround.total}
                />
                <TitleDesc
                  title="Average turnaround time"
                  desc={result.turnaround.average}
                />
              </div>
              <div className={classes.resultContainerRow}>
                <TitleDesc
                  title="Total waiting time"
                  desc={result.waiting.total}
                />
                <TitleDesc
                  title="Average waiting time"
                  desc={result.waiting.average}
                />
              </div>
            </div>
          </Fade>
        ) : null}
      </div>
    </Layout>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1rem",
    marginBottom: "3rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    textTransform: "uppercase",
    fontWeight: 700,
    marginBottom: "2rem",
  },
  tableHeadCell: {
    backgroundColor: primaryLight,
    color: "white",
    fontSize: "1.1rem",
    fontWeight: 700,
  },
  settingContainer: {
    width: "100%",
    maxWidth: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: "3rem",
  },
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "1rem",
  },
  resultContainerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default connect(null, { setLoading, customNotification })(App);
