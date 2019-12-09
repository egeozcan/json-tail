import { isObjectWithGivenKeys } from "./helpers/isObjectWithGivenKeys";
import { IBaseLogDisplayProps, TableDisplay } from "./TableDisplay";
import * as React from "react";
import { FunctionComponent } from "react";
import { BaseTable } from "./baseComponents/BaseTable";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { ContentDisplay } from "./ContentDisplay";
import { addArrayIndexToLastElement } from "./helpers/addArrayIndexToLastElement";

export interface IArrayDisplayProps extends IBaseLogDisplayProps {
  arr: any[];
}

export const ArrayDisplay: FunctionComponent<IArrayDisplayProps> = ({
  arr,
  level = 1,
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

  if (notSuitableForTableView) {
    return (
      <BaseTable>
        {arr.map((el, idx) => {
          const currentPath = addArrayIndexToLastElement(path, idx);

          return (
            <BaseRow title={currentPath.join(".")} key={idx}>
              <TableDisplay logRec={el} level={level + 1} path={currentPath} />
            </BaseRow>
          );
        })}
      </BaseTable>
    );
  }

  return (
    <BaseTable>
      <BaseRow title={path.join(".")} key={"title"} headerType={HeaderType.All}>
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
              return (
                <TableDisplay
                  logRec={el[title]}
                  level={level + 1}
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
};
