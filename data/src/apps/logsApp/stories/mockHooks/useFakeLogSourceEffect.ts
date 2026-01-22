import { useEffect, type Dispatch } from "react";
import { createLog } from "../../actionCreators/createLog";
import type { AppAction } from "../../interfaces/IAppAction";

const fakeData = [
  require("../example-data/topping.json"),
  require("../example-data/atlassian.json"),
  require("../example-data/weird.json")
];

export function useFakeLogSourceEffect(dispatch: Dispatch<AppAction>) {
  useEffect(() => {
    let numLogs = 0;
    const faker = () => {
      const randWaitTime = 100 + 200 * Math.random();
      dispatch(createLog(fakeData[getRandomInt(0, fakeData.length)]));
      numLogs++;
      if (numLogs < 10) {
        timeout = setTimeout(faker, randWaitTime);
      }
    };
    let timeout = setTimeout(faker, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
