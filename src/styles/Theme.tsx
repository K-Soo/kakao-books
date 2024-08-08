import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";

interface ThemeProps {
  children: React.ReactNode;
}

const colors = {
  // palette
  palettePrimary: "#4880EE",
  paletteLightGray: "#F2F4F6",
  // Text
  black: "#000000",
  gray1: "#D2D6DA",
  primary: "#353C49",
  subtitle: "#8D94A0",
  secondary: "#6D7582",
  white: "#FFFFFF",
  lightGray: "#F2F4F6",
};

export type ColorsTypes = keyof typeof colors;
const theme = { colors };

export default function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
