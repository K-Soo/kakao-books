import styled, { css } from "styled-components";
import { ColorsTypes } from "../../styles/Theme";

type nameTypes = "searchDetail";
interface ButtonProps {
  label: string;
  color: ColorsTypes;
  margin?: string;
  width?: string;
  name?: nameTypes;
  height?: string;
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({ onClick, label, color, margin, width, name, height, className, type = "button", children }: ButtonProps) {
  return (
    <S.Button className={className} type={type} onClick={onClick} color={color} $margin={margin} width={width} name={name} height={height}>
      {label}
      {children}
    </S.Button>
  );
}

const S = {
  Button: styled.button<{ color: ColorsTypes; $margin?: string; width?: string; name?: nameTypes; height?: string }>`
    all: unset;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: ${(props) => (props.$margin ? props.$margin : 0)};
    height: ${(props) => (props.height ? props.height : "48px")};
    width: ${(props) => (props.width ? props.width : "115px")};
    background-color: ${(props) => props.theme.colors[props.color]};
    ${(props) =>
      props.color === "palettePrimary" &&
      css`
        color: ${(props) => props.theme.colors.white};
      `};

    ${(props) =>
      props.color === "paletteLightGray" &&
      css`
        color: ${(props) => props.theme.colors.secondary};
      `};
    ${(props) =>
      props.name === "searchDetail" &&
      css`
        font-size: 14px;
        font-weight: 500;
        background-color: ${(props) => props.theme.colors.white};
        border: 1px solid ${(props) => props.theme.colors.subtitle};
        color: ${(props) => props.theme.colors.subtitle};
      `};
  `,
};
