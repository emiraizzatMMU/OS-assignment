import isEmpty from "../isEmpty";

const sjfNP = (data) => {
  let sorted = [];
  let totalTAT = 0;
  let totalWT = 0;
  let timer = 0;
  let isDone = false;

  const arr = [...data];
  arr.sort((a, b) => {
    return a.priority - b.priority;
  });

  while (!isDone) {
    let filtered = arr.filter((e) => e.arrival <= timer);

    if (!isEmpty(filtered)) {
      if (filtered.length > 1) {
        filtered.sort((a, b) => {
          return a.burst - b.burst;
        });
      }
      filtered.map((e) => {
        let st = timer;
        let et = timer + e.burst;
        let tat = et - e.arrival;
        let wt = tat - e.burst;
        sorted.push({ ...e, start: st, end: et, turnaround: tat, waiting: wt });

        totalTAT += tat;
        totalWT += wt;

        timer = et;
        let foundI = arr.findIndex((f) => f.num == e.num);
        arr.splice(foundI, 1);
      });
    } else {
      timer++;
    }

    if (isEmpty(arr)) {
      isDone = true;
    }
  }

  const turnaround = {
    total: totalTAT,
    average: +(totalTAT / data.length).toFixed(4),
  };

  const waiting = {
    total: totalWT,
    average: +(totalWT / data.length).toFixed(4),
  };

  return { table: sorted, sorted, turnaround, waiting };
};

export default sjfNP;
