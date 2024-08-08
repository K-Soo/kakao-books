import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Icon from "../../icons/Icon";
import { selectOptionType } from "../../types";

interface SelectProps {
  options: selectOptionType[];
  value: string;
  margin?: string;
  handleClickSelect: (option: selectOptionType) => void;
}

export default function Select({ options, value, margin, handleClickSelect }: SelectProps) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 옵션 클릭 시 실행
  const handleClickDropDown = (option: selectOptionType) => {
    handleClickSelect(option);
    setIsOpenDropDown(false);
  };

  // 드롭다운 외부 클릭 시 닫기
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpenDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.Select margin={margin} ref={dropdownRef}>
      <div className="input-box" onClick={() => setIsOpenDropDown((prev) => !prev)}>
        <input className="input-box__filed" type="text" value={value} readOnly />
        <Icon name="Arrow" className="input-box__arrow-icon" width="20px" height="20px" />
      </div>

      {isOpenDropDown && (
        <div className="drop-down">
          <ul className="drop-down__items">
            {options.map((option) => (
              <li className="drop-down__items--item" key={option.value} onClick={() => handleClickDropDown(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </S.Select>
  );
}

const S = {
  Select: styled.div<{ margin?: string }>`
    position: relative;
    width: 100px;
    margin: ${(props) => props.margin};
    height: 36px;
    user-select: none;
    .input-box {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #d2d6da;
      position: relative;
      height: 100%;
      &__filed {
        all: unset;
        width: 100%;
        padding-left: 10px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        color: ${(props) => props.theme.colors.primary};
      }
      &__arrow-icon {
        position: absolute;
        right: 3px;
        pointer-events: none;
      }
    }
    .drop-down {
      z-index: 1;
      position: absolute;
      top: 120%;
      background-color: ${(props) => props.theme.colors.white};
      width: 100%;
      box-shadow: 0px 0px 4px 0px #00000040;
      &__items {
        all: unset;
        width: 100%;
        &--item {
          all: unset;
          box-sizing: border-box;
          display: inline-block;
          color: ${(props) => props.theme.colors.subtitle};
          display: flex;
          align-items: center;
          height: 30px;
          width: 100%;
          padding-left: 8px;
          cursor: pointer;
          &:hover {
            color: ${(props) => props.theme.colors.primary};
          }
        }
      }
    }
  `,
};
