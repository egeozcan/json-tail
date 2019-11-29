import { useEffect } from "react";
import { createLog } from "../../actionCreators/createLog";
import { AppAction } from "../../interfaces/AppAction";

export function useFakeLogSourceEffect(dispatch: React.Dispatch<AppAction>) {
  useEffect(() => {
    const faker = () => {
      const randWaitTime = 1000 + 2000 * Math.random();
      dispatch(
        createLog({
          potato: Math.random() * 1029358,
          scotty: "doesn't know",
          fiona: "says she's out shopping",
          nested: {
            stuff: {
              should: {
                not: {
                  be: {
                    a: {
                      problem: [1, 2, 3]
                    }
                  }
                }
              }
            }
          },
          maLookAtMeImATable: [
            { a: 1, b: 2, c: 3, d: 4 },
            { a: 1, b: 2, c: 3, d: 5 },
            { a: 1, b: 2, c: 3, d: 6 },
            { a: 1, b: 2, c: 3, d: 7 },
            { a: 1, b: 2, c: 3, d: 8 },
            { a: 1, b: 2, c: 3, d: 9 },
            { a: 1, b: 2, c: 3, d: 10 }
          ]
        })
      );
      timeout = setTimeout(faker, randWaitTime);
    };
    let timeout = setTimeout(faker, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);
}
