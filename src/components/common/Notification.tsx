import styled from "styled-components";

interface NotificationProps {
  show: boolean;
}

export default function Notification({ show }: NotificationProps) {
  return <S.Notification className={show ? "show" : ""}>찜목록에 추가되었습니다.</S.Notification>;
}

const S = {
  Notification: styled.div`
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 16px;
    border-radius: 4px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    width: 300px;
    text-align: center;

    &.show {
      opacity: 1;
    }
  `,
};
