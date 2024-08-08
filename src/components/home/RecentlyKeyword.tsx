import styled from "styled-components";
import useRecentlyKeyword from "../../hooks/useRecentlyKeyword";
import Icon from "../../icons/Icon";

interface RecentlyKeywordProps {
  recentKeyword: string[];
  keyword: string;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickRemoveKeyword: (selectedKeyword: string) => void;
}

export default function RecentlyKeyword({ recentKeyword, keyword, setIsFocused, handleClickRemoveKeyword }: RecentlyKeywordProps) {
  const { handleMouseDownKeyword } = useRecentlyKeyword({ setIsFocused, keyword });

  return (
    <S.RecentlyKeyword>
      {recentKeyword.map((keyword) => (
        <div className="item" key={keyword}>
          <span className="item__text" onMouseDown={() => handleMouseDownKeyword(keyword)}>
            {keyword}
          </span>
          <Icon name="Close" width="24px" height="24px" style={{ fill: "#222222" }} onClick={() => handleClickRemoveKeyword(keyword)} />
        </div>
      ))}
    </S.RecentlyKeyword>
  );
}

const S = {
  RecentlyKeyword: styled.div`
    width: 100%;
    position: absolute;
    min-height: 50px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding-left: 50px;
    padding-right: 25px;
    background-color: ${(props) => props.theme.colors.lightGray};
    z-index: 1;

    .item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 380px;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        cursor: pointer;
        color: ${(props) => props.theme.colors.subtitle};
        &:hover {
          color: ${(props) => props.theme.colors.black};
        }
      }
    }
  `,
};
