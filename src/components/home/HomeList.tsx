import styled from "styled-components";

interface HomeListProps {
  children: React.ReactNode;
}

export default function HomeList({ children }: HomeListProps) {
  return <S.HomeList>{children}</S.HomeList>;
}

const S = {
  HomeList: styled.div`
    margin-bottom: 160px;
  `,
};
