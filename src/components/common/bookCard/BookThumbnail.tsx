import { memo } from "react";
import styled from "styled-components";
import Button from "../Button";
import { priceComma } from "../../../utils";
import Icon from "../../../icons/Icon";
interface BookThumbnailProps {
  thumbnail: string;
  title: string;
  sale_price: number;
  price: number | string;
  authors: string[];
  url: string;
  isDetailView: boolean;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default memo(function BookThumbnail({
  title,
  thumbnail,
  price,
  sale_price,
  authors,
  url,
  setIsDetail,
  isDetailView,
  children,
}: BookThumbnailProps) {
  const numericPrice = Number(price);
  const displayPrice = sale_price === -1 ? numericPrice : sale_price;

  return (
    <S.BookThumbnail>
      <article className="info">
        <div className="info__content">
          <div className="info__content--img">
            {children}
            {thumbnail && <img src={thumbnail} alt="img" />}
            <StyledDimmed />
          </div>
          <h6 className="info__content--title">{title}</h6>
          <div className="info__content--authors">
            <span>{authors[0]}</span>
          </div>
        </div>

        {/* 가격이 0인 데이터가 있어서 예외처리 */}
        {numericPrice !== 0 && <strong className="info__price">{priceComma(displayPrice)}원</strong>}
      </article>

      <aside className="button-box">
        <Button onClick={() => window.open(url, "_blank")} label="구매하기" color="palettePrimary" margin="0 10px 0 0" />
        <Button onClick={() => setIsDetail(true)} label="상세정보" color="paletteLightGray">
          <Icon name="Arrow" width="20px" height="20px" margin="0 0 0 2px" active={isDetailView} />
        </Button>
      </aside>
    </S.BookThumbnail>
  );
});
const StyledDimmed = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.02);
  z-index: -1;
`;

const S = {
  BookThumbnail: styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0 16px 0 47px;
    .like-icon {
      position: absolute;
      right: 0;
    }
    .info {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      &__content {
        display: flex;
        align-items: center;
        &--img {
          width: 48px;
          height: 68px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &--title {
          flex: 1;
          font-size: 18px;
          font-weight: 700;
          margin: 0 20px;
          color: ${(props) => props.theme.colors.textPrimary};
        }
        &--authors {
          font-size: 14px;
          font-weight: 500;
          color: ${(props) => props.theme.colors.secondary};
          display: flex;
          flex-wrap: wrap;
        }
      }
      &__price {
        white-space: nowrap;
        margin-left: 5px;
      }
    }
    .button-box {
      display: flex;
      margin-left: 30px;
    }
  `,
};
