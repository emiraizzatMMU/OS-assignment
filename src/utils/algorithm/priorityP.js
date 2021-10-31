import isEmpty from "../isEmpty";

const priorityP = (data) => {
  let sorted = [];
  let totalTAT = 0;
  let totalWT = 0;
  let timer = 0;
  let isDone = false;

  const arr = JSON.parse(JSON.stringify(data)); // copy by value

  while (!isDone) {
    arr.sort((a, b) => {
      return a.arrival - b.arrival;
    });

    let filtered = arr.filter((e) => e.arrival <= timer);

    if (!isEmpty(filtered)) {
      if (filtered.length > 1) {
        filtered.sort((a, b) => {
          return a.priority - b.priority;
        });
      }

      timer++;
      let et = timer;

      if (isEmpty(sorted)) {
        let st = timer - 1;

        sorted.push({
          ...filtered[0],
          start: st,
          end: et,
        });
      } else {
        const exitedNum = sorted[sorted.length - 1].num;
        const isInProcess = exitedNum == filtered[0].num;

        if (isInProcess) {
          sorted[sorted.length - 1].end = et;
        } else {
          let st = timer - 1;
          let foundExitedI = arr.findIndex((f) => {
            return f.num == exitedNum;
          });

          if (foundExitedI !== -1) {
            arr[foundExitedI].arrival = st;
          }

          sorted.push({
            ...filtered[0],
            start: st,
            end: et,
          });
        }
      }

      let foundI = arr.findIndex((f) => f.num == filtered[0].num);
      arr[foundI].burst = arr[foundI].burst - 1;

      if (arr[foundI].burst <= 0) {
        arr.splice(foundI, 1);
      }
    } else {
      timer++;
    }

    if (isEmpty(arr)) {
      isDone = true;
    }
  }

  let table = [];
  data.map((d, i) => {
    let filterFromSorted = sorted.filter((f) => f.num == d.num);
    let dArrival = 0;
    let dFinish = 0;

    filterFromSorted.forEach((f) => {
      if (dArrival > f.arrival) {
        dArrival = f.arrival;
      }
      if (dFinish < f.end) {
        dFinish = f.end;
      }
    });

    table.push({
      ...d,
      start: dArrival,
      end: dFinish,
    });
  });

  table.map((e, i) => {
    let tat = e.end - e.arrival;
    let wt = tat - e.burst;

    table[i].turnaround = tat;
    table[i].waiting = wt;

    totalTAT += tat;
    totalWT += wt;
  });

  const turnaround = {
    total: totalTAT,
    average: +(totalTAT / data.length).toFixed(4),
  };

  const waiting = {
    total: totalWT,
    average: +(totalWT / data.length).toFixed(4),
  };

  return { table, sorted, turnaround, waiting };
};

export default priorityP;
