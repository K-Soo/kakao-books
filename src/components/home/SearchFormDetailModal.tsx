import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../../icons/Icon";
import Button from "../common/Button";
import Select from "../common/Select";
import { bookSearchOptions } from "../../constants/options";
import { selectOptionType } from "../../types";

interface SearchFormDetailModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchFormDetailModal({ setIsOpenModal }: SearchFormDetailModalProps) {
  const [selectValue, setSelectValue] = useState(bookSearchOptions[0]);
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const keywordParams = params.get("keyword");
  const targetParams = params.get("target");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!targetParams) {
      return;
    }
    if (targetParams) {
      const findSelectedOption = bookSearchOptions.find((option) => option.value === targetParams);
      setSelectValue(findSelectedOption ?? bookSearchOptions[0]);
    }
    if (keywordParams) {
      setInputValue(keywordParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetParams]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 셀렉트 박스를 클릭할 때 호출 및 인풋 포커스
  const handleClickSelect = useCallback((option: selectOptionType) => {
    setSelectValue(option);
    inputRef.current?.focus();
  }, []);

  // 입력값이 변경될 때 호출
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }
    setIsOpenModal(false);
    params.set("keyword", inputValue);
    params.set("target", selectValue.value);
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <S.SearchFormDetailModal>
      <div className="header">
        <Icon name="Close" width="20px" height="20px" onClick={() => setIsOpenModal(false)} />
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-form__select-box">
          <Select value={selectValue.label} options={bookSearchOptions} handleClickSelect={handleClickSelect} />
          <input
            className="input-form__select-box--input"
            type="text"
            onChange={handleChangeInput}
            value={inputValue}
            ref={inputRef}
            placeholder="검색어 입력"
          />
        </div>

        <Button color="palettePrimary" label="검색하기" width="100%" height="36px" type="submit" />
      </form>
    </S.SearchFormDetailModal>
  );
}

const S = {
  SearchFormDetailModal: styled.div`
    z-index: 1;
    position: absolute;
    top: 130%;
    left: 50%;
    transform: translateX(-50%);
    width: 360px;
    height: 160px;
    border-radius: 8px;
    box-shadow: 0px 4px 14px 6px #97979726;
    padding: 8px;
    background-color: ${(props) => props.theme.colors.white};
    .header {
      text-align: right;
    }
    .input-form {
      &__select-box {
        display: flex;
        margin-bottom: 16px;
        width: 100%;
        &--input {
          all: unset;
          flex: 1;
          margin-left: 4px;
          border-bottom: 1px solid #d2d6da;
          padding-left: 5px;
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
        }
      }
    }
  `,
};
