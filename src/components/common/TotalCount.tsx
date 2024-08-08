import styled from "styled-components";

interface TotalCountProps {
  count: number;
  text: string;
}
export default function TotalCount({ count, text }: TotalCountProps) {
  return (
    <S.TotalCount>
      <span className="text">{text}</span>
      <strong className="count">{count}</strong>
    </S.TotalCount>
  );
}

const S = {
  TotalCount: styled.div`
    margin-bottom: 36px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: ${(props) => props.theme.colors.primary};
    .text {
      padding-right: 10px;
    }
    .count {
      color: ${(props) => props.theme.colors.palettePrimary};
      font-weight: 500;
      &::before {
        content: "총";
        color: ${(props) => props.theme.colors.primary};
        padding-right: 3px;
      }
      &::after {
        content: "건";
        color: ${(props) => props.theme.colors.primary};
      }
    }
  `,
};
