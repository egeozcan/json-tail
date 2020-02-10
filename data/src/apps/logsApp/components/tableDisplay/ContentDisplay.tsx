import * as React from "react";
import { FunctionComponent, useCallback } from "react";
import styled from "styled-components";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { setCurrentPath } from "./actionCreators/setCurrentPath";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { TableDisplayActionTypes } from "./enums/TableDisplayActionTypes";
import { TableDisplayRenderTypes } from "./enums/TableDisplayRenderTypes";
import { arraysAreSame } from "./helpers/arraysAreSame";

interface IContentDisplayProps {
  content: any;
  title?: string;
  path?: string[];
}

const ContentDisplayContainer = styled.span`
  margin-right: 5px;
`;

export const ContentDisplay: FunctionComponent<IContentDisplayProps> = ({
  content,
  title,
  path = []
}) => {
  const dispatch = useTableDisplayDispatchContext();
  const state = useTableDisplayStateContext();
  const onClick = useCallback(() => dispatch(setCurrentPath(path)), [path]);

  const setRenderingToHTML = useCallback(
    () =>
      dispatch({
        type: TableDisplayActionTypes.SetRenderType,
        data: { type: TableDisplayRenderTypes.HTML, path }
      }),
    [path]
  );

  const pathStr = path.join(",");
  const useHTMLRender =
    state.specialHandledPaths.has(pathStr) &&
    state.specialHandledPaths.get(pathStr) === TableDisplayRenderTypes.HTML;

  return (
    <ContentDisplayContainer onClick={onClick} title={title}>
      {!useHTMLRender ? (
        String(content)
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
      &nbsp;
      {!useHTMLRender ? (
        <a
          href={"#"}
          onClick={e => {
            e.preventDefault();
            setRenderingToHTML();
          }}
        >
          Render in HTML
        </a>
      ) : null}
    </ContentDisplayContainer>
  );
};
