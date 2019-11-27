import { LogDisplay } from "./LogDisplay";
import { BaseTable } from "./baseComponents/BaseTable";
import * as React from "react";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { createLog } from "../log/createLog";
import { FunctionComponent } from "react";

export interface ITableDisplayProps {
  obj: object;
  level: number;
  path: string[];
}

export const ObjectDisplay: FunctionComponent<ITableDisplayProps> = ({
  obj,
  level,
  path
}) => {
  return (
    <BaseTable baseTableCssClasses={"objectTable jsonTable"}>
      {Object.keys(obj || {}).map(key => {
        const rowContent = (
          <LogDisplay 
            level={level + 1}
            path={path}
            logMessage={createLog(obj[key])}
          />
        );

        if (rowContent.props.content) {
          return (
            <BaseRow key={key} headerType={HeaderType.Single}>
              {key}
              {rowContent}
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
                {rowContent}
              </div>
            </BaseRow>
          );
        }
      })}
    </BaseTable>
  );
}
