import { BaseTable } from "./baseComponents/BaseTable";
import * as React from "react";
import { FunctionComponent } from "react";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { ContentDisplay } from "./ContentDisplay";
import { LogDisplay } from "./LogDisplay";
import { IObjectDisplayProps } from "./interfaces/IObjectDisplayProps";

export const ObjectDisplay: FunctionComponent<IObjectDisplayProps> = ({
  obj,
  level,
  path
}) => {
  return (
    <BaseTable baseTableCssClasses={"objectTable jsonTable"}>
      {Object.keys(obj || {}).map(key => {
        const curElement = obj[key];

        if (isRenderableAsString(curElement)) {
          return (
            <BaseRow
              key={key}
              title={path.join(".")}
              headerType={HeaderType.Single}
            >
              {key}
              <ContentDisplay content={curElement} />
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
                <LogDisplay log={curElement} path={path.concat([key])} />
              </div>
            </BaseRow>
          );
        }
      })}
    </BaseTable>
  );
};
