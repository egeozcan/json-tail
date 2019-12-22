import styled from "styled-components";

export interface IRowColumnProps {
  selectable?: boolean;
  useEllipsis?: boolean;
  cursor?: CursorType;
  background?: BackgroundType;
  size?: Size;
}

export enum CursorType {
  Normal,
  Pointer
}

export enum BackgroundType {
  Dark,
  Light
}

export enum Size {
  Contract,
  Expand
}

// language=LESS
export const Block = styled.div<IRowColumnProps>`
  & {
    user-select: ${props => (props.selectable ? "unset" : "none")};
    cursor: ${props =>
      props.cursor === CursorType.Pointer ? "pointer" : null};
    background: ${props =>
      props.background === BackgroundType.Dark ? "#eee" : "#fff"};
    padding: 5px;
    flex: ${props => (props.size === Size.Contract ? 0 : 1)};
    white-space: nowrap;
    overflow: ${props => (props.useEllipsis ? "hidden" : "unset")};
    text-overflow: ${props => (props.useEllipsis ? "ellipsis" : "clip")};
  }
`;
