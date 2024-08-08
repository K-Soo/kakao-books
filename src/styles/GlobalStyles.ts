import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 
  * {
    box-sizing: border-box;
    -webkit-touch-callout: none; 
    -webkit-tap-highlight-color : transparent !important; 
  }

  html{
    overflow-x: hidden;
  }

  html,
  body {
    overscroll-behavior-y: none; 
  }

  body{
    font-family: Noto Sans KR, sans-serif;
    padding: 0;
    margin: 0;
  }

 
  a {
    color: inherit;
    text-decoration: none;
  }

  input, textarea { 
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0;
    resize: none;
    outline: none;
  }

  input[type='text']{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    border: none;
    color: #333;
  }
  input:focus {
    outline: none;
  }
  select:focus {
    outline: none;
    cursor: pointer;
  }

`;

export default GlobalStyle;
