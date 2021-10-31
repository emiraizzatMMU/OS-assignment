import priorityNP from "./priorityNP";
import priorityP from "./priorityP";
import sjfNP from "./sjfNP";
import store from "../../store";
import { setLoading } from "../../store/actions/loadingAction";

export const algorithmList = [
  {
    value: 1,
    label: "Preemptive Priority",
  },
  {
    value: 2,
    label: "Non-preemptive Priority",
  },
  {
    value: 3,
    label: "Non-preemptive SJF",
  },
];

export const algoritmSelector = (num, data) => {
  store.dispatch(setLoading(true));
  let result = {};

  switch (num) {
    case 1:
      {
        result = priorityP(data);
      }
      break;
    case 2:
      {
        result = priorityNP(data);
      }
      break;
    case 3: {
      result = sjfNP(data);
    }
  }
  store.dispatch(setLoading(false));

  return result;
};
