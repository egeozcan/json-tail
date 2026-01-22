import { BaseTable } from "./baseComponents/BaseTable";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useMemo } from "react";
import { BaseRow, HeaderType } from "./baseComponents/BaseRow";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { ContentDisplay } from "./ContentDisplay";
import type { ITableDisplayTreeProps } from "./InnerTableDisplay";
import { InnerTableDisplay } from "./InnerTableDisplay";

export interface IObjectDisplayProps extends ITableDisplayTreeProps {
  obj: object;
}

export const ObjectDisplay: FunctionComponent<
  PropsWithChildren<IObjectDisplayProps>
> = ({ obj, path }) => {
  return useMemo(
    () => (
      <BaseTable baseTableCssClasses={"objectTable jsonTable"}>
        {Object.keys(obj || {}).map((key) => {
          const curElement: unknown = (obj as Record<string, unknown>)[key];

          const currentPath = (path || []).concat([key]);
          if (isRenderableAsString(curElement)) {
            return (
              <BaseRow
                key={key}
                title={currentPath.join(".")}
                headerType={HeaderType.Single}
                cellCssClass={"simpleRow"}
              >
                <ContentDisplay
                  allowHTML={false}
                  path={currentPath}
                  content={key}
                />
                <ContentDisplay path={currentPath} content={curElement} />
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
                  <ContentDisplay allowHTML={false} path={path} content={key} />
                  <InnerTableDisplay
                    displayObject={curElement}
                    path={currentPath}
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
