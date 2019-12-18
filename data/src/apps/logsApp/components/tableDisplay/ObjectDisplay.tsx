import { BaseTable } from "./baseComponents/BaseTable";
import * as React from "react";
import { FunctionComponent, useMemo } from "react";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { ContentDisplay } from "./ContentDisplay";
import { IBaseLogDisplayProps, TableDisplay } from "./TableDisplay";

export interface IObjectDisplayProps extends IBaseLogDisplayProps {
  obj: object;
}

export const ObjectDisplay: FunctionComponent<IObjectDisplayProps> = ({
  obj,
  path
}) => {
  return useMemo(
    () => (
      <BaseTable baseTableCssClasses={"objectTable jsonTable"}>
        {Object.keys(obj || {}).map(key => {
          const curElement: any = (obj as any)[key];

          if (isRenderableAsString(curElement)) {
            return (
              <BaseRow
                key={key}
                title={(path || []).concat([key]).join(".")}
                headerType={HeaderType.Single}
                cellCssClass={"simpleRow"}
              >
                <ContentDisplay content={key} />
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
                  <ContentDisplay content={key} />
                  <TableDisplay
                    log={curElement}
                    path={(path || []).concat([key])}
                  />
                </div>
              </BaseRow>
            );
          }
        })}
      </BaseTable>
    ),
    [obj]
  );
};
