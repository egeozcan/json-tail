import * as React from "react";
import { FunctionComponent } from "react";

interface IContentDisplayProps {
  content: any;
  title?: string;
}

export const ContentDisplay: FunctionComponent<IContentDisplayProps> = ({
  content,
  title
}) => {
  if (content === " " || !content) {
    return <span title={title}>&nbsp;</span>;
  }

  if (typeof content === "string" && content.indexOf("data:image") === 0) {
    return <img src={content} alt="dynamic image" />;
  }

  return <span title={title}>{content}</span>;
};
