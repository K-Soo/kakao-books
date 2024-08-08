import { forwardRef, useState } from "react";
import styled from "styled-components";
import { BookDetails } from "../../../types";
import BookDetail from "./BookDetail";
import BookThumbnail from "./BookThumbnail";

interface BookCardProps {
  item: BookDetails;
  index: number;
  children: React.ReactNode;
}

export default forwardRef<HTMLDivElement, BookCardProps>(function BookCard({ item, index, children }: BookCardProps, ref) {
  const [isDetailView, setIsDetail] = useState(false);

  return (
    <S.BookCard key={`${item.isbn}-${index}`} ref={ref}>
      {!isDetailView && (
        <BookThumbnail
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
          sale_price={item.sale_price}
          authors={item.authors}
          url={item.url}
          setIsDetail={setIsDetail}
          isDetailView={isDetailView}
        >
          {children}
        </BookThumbnail>
      )}

      {isDetailView && (
        <BookDetail
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
          sale_price={item.sale_price}
          authors={item.authors}
          url={item.url}
          contents={item.contents}
          setIsDetail={setIsDetail}
          isDetailView={isDetailView}
        >
          {children}
        </BookDetail>
      )}
    </S.BookCard>
  );
});

const S = {
  BookCard: styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.gray1};
    z-index: 1;
  `,
};
