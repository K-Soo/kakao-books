import styled from "styled-components";
import Icon from "../../icons/Icon";

interface EmptyComponentProps {
  text: "찜한 책이 없습니다." | "검색된 결과가 없습니다." | "검색어를 입력해주세요.";
}

export default function EmptyComponent({ text }: EmptyComponentProps) {
  return (
    <S.EmptyComponent>
      <Icon name="Book" width="80px" height="80px" />
      <p>{text}</p>
    </S.EmptyComponent>
  );
}

const S = {
  EmptyComponent: styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: ${(props) => props.theme.colors.secondary};
  `,
};
