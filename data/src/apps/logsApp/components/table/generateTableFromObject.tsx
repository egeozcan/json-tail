import { render } from "./LogTable";
import { BaseTable, IBaseTableProps } from "./baseComponents/BaseTable";
import * as React from "react";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { ContentDisplay } from "./ContentDisplay";

export function generateTableFromObject(
  obj: object,
  level: number,
  path: string[]
): React.ReactElement<IBaseTableProps> {
  return (
    <BaseTable baseTableCssClasses={"objectTable jsonTable"}>
      {Object.keys(obj || {}).map(key => {
        const content = render(obj[key], level + 1);

        if (typeof content === "string") {
          return (
            <BaseRow key={key} headerType={HeaderType.Single}>
              {key}
              <ContentDisplay content={content} />
            </BaseRow>
          );
        } else {
          return (
            <BaseRow
              headerType={HeaderType.Single}
              colspan={2}
              cssClass={"hasSubTable"}
              key={key}
            >
              <div className={"subTable"}>
                {key}
                {content}
              </div>
            </BaseRow>
          );
        }
      })}
    </BaseTable>
  );
}
