import { useEffect } from "react";
import { createLog } from "../../actionCreators/createLog";
import { AppAction } from "../../interfaces/IAppAction";

const fakeData = [
  require("../example-data/topping.json"),
  require("../example-data/atlassian.json"),
  require("../example-data/weird.json")
];

export function useFakeLogSourceEffect(dispatch: React.Dispatch<AppAction>) {
  useEffect(() => {
    const faker = () => {
      const randWaitTime = 1000 + 2000 * Math.random();
      dispatch(createLog(fakeData[getRandomInt(0, fakeData.length)]));
      timeout = setTimeout(faker, randWaitTime);
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
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
