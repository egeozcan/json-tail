import { isObjectWithGivenKeys } from "./helpers/isObjectWithGivenKeys";
import { LogDisplay } from "./LogDisplay";
import * as React from "react";
import { FunctionComponent } from "react";
import { BaseTable } from "./baseComponents/BaseTable";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { ContentDisplay } from "./ContentDisplay";
import { IArrayDisplayProps } from "./interfaces/IArrayDisplayProps";

export const ArrayDisplay: FunctionComponent<IArrayDisplayProps> = ({
  arr,
  level,
  path
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
        {arr.map((el, idx) => (
          <BaseRow key={idx}>
            <LogDisplay log={el} level={level + 1} path={path} />
          </BaseRow>
        ))}
      </BaseTable>
    );
  }

  return (
    <BaseTable>
      <BaseRow key={"title"} headerType={HeaderType.All}>
        {titles.map(title => (
          <ContentDisplay content={title} />
        ))}
      </BaseRow>

      {arr.map((el, idx) => {
        const cssClass = idx % 2 === 0 ? "even" : "odd";

        return (
          <BaseRow title={path.join(".")} key={idx} cellCssClass={cssClass}>
            {titles.map((title, i) => (
              <LogDisplay
                log={el[title]}
                level={level + 1}
                path={path}
                key={i}
              />
            ))}
          </BaseRow>
        );
      })}
    </BaseTable>
  );
};
