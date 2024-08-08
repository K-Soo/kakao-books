import styled from "styled-components";

interface HomeProps {
  children: React.ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <S.Home>
      <h2 className="title">도서 검색</h2>
      <div className="search-form">{children}</div>
    </S.Home>
  );
}

const S = {
  Home: styled.div`
    margin: 80px 0 24px 0;
    .title {
      font-size: 22px;
      font-weight: 700;
      line-height: 24px;
    }
    .search-form {
      display: flex;
      align-items: center;
    }
  `,
};
