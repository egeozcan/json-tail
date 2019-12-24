import * as React from "react";
import { FunctionComponent, useCallback } from "react";
import styled from "styled-components";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { setCurrentPath } from "./actionCreators/setCurrentPath";

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
  const onClick = useCallback(() => dispatch(setCurrentPath(path)), [path]);

  return (
    <ContentDisplayContainer onClick={onClick} title={title}>
      {String(content)}&nbsp;
    </ContentDisplayContainer>
  );
};
