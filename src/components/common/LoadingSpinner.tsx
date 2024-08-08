import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <S.LoadingSpinner>
      <img className="spinner" src={`/Spinner200px.gif`} alt="Loading" />
    </S.LoadingSpinner>
  );
}

const S = {
  LoadingSpinner: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    height: 100px;
    width: 100%;
    .spinner {
      width: 35px;
      height: 35px;
    }
  `,
};
