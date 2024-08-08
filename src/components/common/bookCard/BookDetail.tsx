import styled from "styled-components";
import Button from "../Button";
import { useEffect, useState } from "react";
import { priceComma } from "../../../utils";
import { regex } from "../../../utils";
import Icon from "../../../icons/Icon";
interface BookDetailProps {
  thumbnail: string;
  title: string;
  sale_price: number;
  price: number | string;
  authors: string[];
  url: string;
  contents: string;
  isDetailView: boolean;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function BookDetail({
  title,
  thumbnail,
  price,
  sale_price,
  authors,
  url,
  setIsDetail,
  contents,
  isDetailView,
  children,
}: BookDetailProps) {
  const [formattedText, setFormattedText] = useState<string[]>([]);

  useEffect(() => {
    const sentences = contents.split(regex.sentence).filter((sentence) => sentence.trim().length > 0);

    setFormattedText(sentences);
  }, [contents]);

  return (
    <S.BookDetail>
      <S.Content>
        <div className="image-box">
          {children}
          {thumbnail && <img className="image-box__image" src={thumbnail} alt="img" />}
          <StyledDimmed />
        </div>
        <div className="detail">
          <div className="detail__info">
            <h3 className="detail__info--title">{title}</h3>
            <p className="detail__info--name">{authors[0]}</p>
          </div>

          <h6 className="detail__introduction">책소개</h6>
          {formattedText.map((sentence, index) => (
            <p key={index} className="detail__contents">
              {sentence.trim()}
            </p>
          ))}
        </div>
      </S.Content>

      <aside className="control">
        <Button className="control__button" onClick={() => setIsDetail(false)} label="상세정보" color="paletteLightGray">
          <Icon name="Arrow" width="20px" height="20px" margin="0 0 0 2px" active={isDetailView} />
        </Button>

        <div className="control__bottom">
          <div className="control__bottom--price-box">
            <del className="price">{priceComma(price)}원</del>
            {sale_price !== 0 && <div className="sale-price">{priceComma(sale_price)}원</div>}
          </div>
          <Button onClick={() => window.open(url, "_blank")} label="구매하기" color="palettePrimary" width="100%" margin="24px 0 0 0" />
        </div>
      </aside>
    </S.BookDetail>
  );
}

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
  BookDetail: styled.div`
    height: 350px;
    display: flex;
    padding: 24px 16px 40px 54px;
    .like-icon {
      position: absolute;
      right: 0;
    }
    .control {
      display: flex;
      flex-direction: column;
      align-items: end;
      width: 240px;
      &__button {
        text-align: right;
        margin-top: 2px;
      }
      &__bottom {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;
        &--price-box {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: end;
          .price {
            font-size: 18px;
            font-weight: 350;
            color: ${(props) => props.theme.colors.primary};
            &::before {
              content: "원가";
              display: inline-block;
              font-size: 14px;
              font-weight: 500;
              padding-right: 10px;
              color: ${(props) => props.theme.colors.subtitle};
            }
          }
          .sale-price {
            font-weight: 600;
            font-size: 18px;

            &::before {
              content: "할인가";
              font-size: 14px;
              font-weight: 500;
              padding-right: 15px;
              color: ${(props) => props.theme.colors.subtitle};
            }
          }
        }
      }
    }
  `,
  Content: styled.section`
    flex: 1;
    display: flex;
    .image-box {
      width: 210px;
      height: 280px;
      position: relative;
      border: 0.5px solid #f5f5f5;
      &__image {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      flex: 1;
      margin-left: 32px;
      &__info {
        display: flex;
        align-items: center;
        margin-top: 22px;
        &--title {
          all: unset;
          font-family: Noto Sans KR;
          font-size: 18px;
          font-weight: 700;
          color: ${(props) => props.theme.colors.primary};
        }
        &--name {
          all: unset;
          flex: 1;
          width: 100%;
          margin-left: 16px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          color: ${(props) => props.theme.colors.subtitle};
        }
      }
      &__introduction {
        all: unset;
        display: block;
        margin-top: 16px;
        font-size: 18px;
        font-weight: 700;
        line-height: 26px;
      }
      &__contents {
        all: unset;
        margin-top: 12px;
        font-size: 14px;
        display: block;
        font-weight: 500;
        text-align: left;
        color: ${(props) => props.theme.colors.primary};
      }
    }
  `,
};
