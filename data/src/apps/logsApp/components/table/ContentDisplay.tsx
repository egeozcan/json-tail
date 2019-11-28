import * as React from "react";
import { FunctionComponent } from "react";

interface IContentDisplayProps {
  content: string;
}

export const ContentDisplay: FunctionComponent<IContentDisplayProps> = ({
  content
}) => {
  if (content === " " || !content) {
    return <>&nbsp;</>;
  }

  if (typeof content === "string" && content.indexOf("data:image") === 0) {
    return <img src={content} alt="dynamic image" />;
  }

  return <>{content}</>;
};
