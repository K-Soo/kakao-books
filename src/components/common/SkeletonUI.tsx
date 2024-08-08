import styled, { css } from "styled-components";

const SkeletonAnimation = css`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  animation: skeleton-gradient 1.5s infinite ease-in-out;
  @keyframes skeleton-gradient {
    0%,
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
  }
`;

const BookItems = ({ count }: { count: number }) => {
  return (
    <StyledBookItems>
      {new Array(count).fill("").map((_, index) => (
        <div key={index} className="item">
          <div className="info">
            <div className="info__content">
              <div className="info__content--img" />
              <div className="info__content--title" />
              <div className="info__content--name" />
            </div>
            <div className="info__price" />
          </div>

          <div className="item__button-box">
            <div className="item__button-box--button" />
            <div className="item__button-box--button" />
          </div>
        </div>
      ))}
    </StyledBookItems>
  );
};

const StyledBookItems = styled.div`
  .item {
    padding: 0 16px 0 47px;
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .info {
      flex: 1;
      display: flex;
      align-items: center;
      &__content {
        display: flex;
        align-items: center;
        width: 100%;
        &--img {
          ${SkeletonAnimation}
          width: 48px;
          height: 68px;
          border-radius: 0;
        }
        &--title {
          ${SkeletonAnimation}
          width: 300px;
          margin: 0 20px;
        }
        &--name {
          ${SkeletonAnimation}
          width: 80px;
        }
      }
      &__price {
        ${SkeletonAnimation}
        width: 85px;
        margin-right: 20px;
      }
    }

    &__button-box {
      display: flex;
      :first-child {
        margin-right: 10px;
      }
      &--button {
        ${SkeletonAnimation}
        height: 48px;
        width: 115px;
        border-radius: 8px;
      }
    }
  }
`;

const SkeletonUI = {
  BookItems,
};

export default SkeletonUI;
