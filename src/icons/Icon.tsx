import React from "react";
import styled, { css } from "styled-components";
import * as svg from "./svg";

export type IconType = keyof typeof svg;

export type IconProps = {
  name: IconType;
  className?: string;
  width?: string;
  height?: string;
  margin?: string;
  onClick?: any;
  cursor?: string;
  animate?: boolean;
  active?: boolean;
  style?: React.CSSProperties | undefined;
};

function Icon({ name, className, style, onClick }: IconProps) {
  return React.createElement(svg[name], {
    className,
    style,
    onClick,
  });
}

export default styled(Icon)`
  width: ${(props) => (props.width ? props.width : "16px")};
  height: ${(props) => (props.height ? props.height : "16px")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  cursor: ${(props) => (props.cursor ? props.cursor : "pointer")};
  ${(props) =>
    props.active &&
    css`
      transform: rotate(180deg);
    `};

  &:hover {
    transform: scale(1.05);
  }
  svg {
    fill: currentColor;
  }
`;
