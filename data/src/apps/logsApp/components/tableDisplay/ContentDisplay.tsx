import * as React from "react";
import { FunctionComponent, useCallback } from "react";
import styled from "styled-components";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { setCurrentPath } from "./actionCreators/setCurrentPath";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { TableDisplayActionTypes } from "./enums/TableDisplayActionTypes";
import { TableDisplayRenderTypes } from "./enums/TableDisplayRenderTypes";

interface IContentDisplayProps {
  content: any;
  title?: string;
  path?: string[];
  allowHTML?: boolean;
}

const ContentDisplayContainer = styled.span`
  & {
    margin-right: 5px;

    a {
      visibility: hidden;
    }

    .html-container {
      display: inline-block;
    }
  }

  &:hover {
    a {
      visibility: visible;
    }
  }
`;

export const ContentDisplay: FunctionComponent<IContentDisplayProps> = ({
  content,
  title,
  path = [],
  allowHTML = true
}) => {
  const dispatch = useTableDisplayDispatchContext();
  const state = useTableDisplayStateContext();
  const onClick = useCallback(() => dispatch(setCurrentPath(path)), [path]);

  const pathStr = path.join(",");
  const useHTMLRender =
    state.specialHandledPaths.has(pathStr) &&
    state.specialHandledPaths.get(pathStr) === TableDisplayRenderTypes.HTML;
  const switchRendering = useCallback(
    () =>
      dispatch({
        type: TableDisplayActionTypes.SetRenderType,
        data: {
          type: useHTMLRender
            ? TableDisplayRenderTypes.String
            : TableDisplayRenderTypes.HTML,
          path
        }
      }),
    [path, state.specialHandledPaths]
  );
  const switchButton = !allowHTML ? null : (
    <a
      href={"#"}
      onClick={e => {
        e.preventDefault();
        switchRendering();
      }}
    >
      Render as {useHTMLRender ? "string" : "HTML"}
    </a>
  );

  return (
    <ContentDisplayContainer onClick={onClick} title={title}>
      {!useHTMLRender ? (
        String(content)
      ) : (
        <div
          className={"html-container"}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      &nbsp;
      {switchButton}
    </ContentDisplayContainer>
  );
};
