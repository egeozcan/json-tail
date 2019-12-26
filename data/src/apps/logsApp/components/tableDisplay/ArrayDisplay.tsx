import { isObjectWithGivenKeys } from "./helpers/isObjectWithGivenKeys";
import { ITableDisplayTreeProps, InnerTableDisplay } from "./InnerTableDisplay";
import * as React from "react";
import { FunctionComponent, useMemo } from "react";
import { BaseTable } from "./baseComponents/BaseTable";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { ContentDisplay } from "./ContentDisplay";
import { addArrayIndexToLastElement } from "./helpers/addArrayIndexToLastElement";

export interface IArrayDisplayProps extends ITableDisplayTreeProps {
  arr: any[];
}

export const ArrayDisplay: FunctionComponent<IArrayDisplayProps> = ({
  arr,
  path = []
}) => {
  if (arr.length === 0) {
    return <BaseTable />;
  }

  const firstRow = arr[0];
  const titles = Object.keys(firstRow);

  const notSuitableForTableView =
    !isObjectWithGivenKeys(firstRow) ||
    arr.some(el => !isObjectWithGivenKeys(el, titles));

  return useMemo(() => {
    if (notSuitableForTableView) {
      return (
        <BaseTable>
          {arr.map((el, idx) => {
            const currentPath = addArrayIndexToLastElement(path, idx);

            return (
              <BaseRow title={currentPath.join(".")} key={idx}>
                <InnerTableDisplay displayObject={el} path={currentPath} />
              </BaseRow>
            );
          })}
        </BaseTable>
      );
    }

    return (
      <BaseTable>
        <BaseRow
          title={path.join(".")}
          key={"title"}
          headerType={HeaderType.All}
        >
          {titles.map(title => (
            <ContentDisplay key={title} content={title} />
          ))}
        </BaseRow>

        {arr.map((el, idx) => {
          const cssClass = idx % 2 === 0 ? "even" : "odd";

          return (
            <BaseRow title={path.join(".")} key={idx} cellCssClass={cssClass}>
              {titles.map((title, i) => {
                const currentPath = addArrayIndexToLastElement(path, idx);
                currentPath.push(title);
                return (
                  <InnerTableDisplay
                    displayObject={el[title]}
                    path={currentPath}
                    key={i}
                  />
                );
              })}
            </BaseRow>
          );
        })}
      </BaseTable>
    );
  }, [arr]);
};
