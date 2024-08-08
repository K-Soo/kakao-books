import styled from "styled-components";

export default function ErrorComponent() {
  return (
    <S.ErrorComponent>
      <h3 className="error">ERROR</h3>
      <p>죄송합니다. 잠시 후 다시시도해주세요.</p>
    </S.ErrorComponent>
  );
}

const S = {
  ErrorComponent: styled.div`
    margin-top: 100px;
    text-align: center;
    font-weight: 500;
    color: ${(props) => props.theme.colors.secondary};
    .error {
      color: #000;
      font-size: 22px;
      margin: 0;
      padding: 0;
    }
  `,
};
