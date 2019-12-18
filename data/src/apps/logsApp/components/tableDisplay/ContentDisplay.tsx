import * as React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";

interface IContentDisplayProps {
  content: any;
  title?: string;
}

export const ContentDisplayContainer = styled.span`
  margin-right: 5px;
`;

export const ContentDisplay: FunctionComponent<IContentDisplayProps> = ({
  content,
  title
}) => {
  return (
    <ContentDisplayContainer title={title}>
      {String(content)}&nbsp;
    </ContentDisplayContainer>
  );
};
