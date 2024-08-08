import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Icon from "../../icons/Icon";
import RecentlyKeyword from "./RecentlyKeyword";
import useRecentlyKeyword from "../../hooks/useRecentlyKeyword";

interface SearchFormProps {
  placeholder: string;
}

export default function SearchForm({ placeholder }: SearchFormProps) {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const keywordParams = params.get("keyword");
  const targetParams = params.get("target");

  const formRef = useRef<HTMLDivElement>(null);

  const { recentKeyword, handleClickRemoveKeyword } = useRecentlyKeyword({});

  const isKeywordListEmpty = recentKeyword.length === 0;

  useEffect(() => {
    if (isKeywordListEmpty) {
      setIsFocused(false);
    }
  }, [isKeywordListEmpty]);

  useEffect(() => {
    if (targetParams) {
      setKeyword("");
      return;
    }
    if (keywordParams) {
      setKeyword(keywordParams);
    }
  }, [keywordParams, targetParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyword.trim() === "") {
      return;
    }
    if (event.key === "Enter") {
      setIsFocused(false);
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set("keyword", keyword);
      navigate(`?${urlSearchParams.toString()}`, { replace: true });
    }
  };

  return (
    <S.SearchForm $isFocused={isFocused} onFocus={() => setIsFocused(!isKeywordListEmpty)} ref={formRef}>
      <Icon className="search-icon" name="Search" width="30" height="30" />
      <input
        className="search-field"
        type="text"
        placeholder={placeholder}
        onChange={handleChangeKeyword}
        onKeyDown={handleKeyDown}
        value={keyword}
      />
      {isFocused && (
        <RecentlyKeyword
          recentKeyword={recentKeyword}
          setIsFocused={setIsFocused}
          keyword={keyword}
          handleClickRemoveKeyword={handleClickRemoveKeyword}
        />
      )}
    </S.SearchForm>
  );
}

const S = {
  SearchForm: styled.div<{ $isFocused: boolean }>`
    position: relative;
    height: 50px;
    width: 480px;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    background-color: ${(props) => props.theme.colors.lightGray};
    ${(props) =>
      props.$isFocused &&
      css`
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      `};
    .search-icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
    .search-field {
      all: unset;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      padding-left: 50px;
      padding-right: 25px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
    }
  `,
};
