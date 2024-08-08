import styled from "styled-components";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <S.Layout>
      <Header />
      <main>{children}</main>
    </S.Layout>
  );
}

const S = {
  Layout: styled.div`
    max-width: 1920px;
    margin: 0 auto;
    main {
      width: 960px;
      margin: 0 auto;
    }
  `,
};
