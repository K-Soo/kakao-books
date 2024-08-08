import styled from "styled-components";

interface FavoriteProps {
  children: React.ReactNode;
}
export default function Favorite({ children }: FavoriteProps) {
  return (
    <S.Favorite>
      <h2 className="title">내가 찜한 책</h2>
      {children}
    </S.Favorite>
  );
}

const S = {
  Favorite: styled.div`
    margin: 80px 0 160px 0;
    .title {
      font-size: 22px;
      font-weight: 700;
      line-height: 24px;
    }
  `,
};
