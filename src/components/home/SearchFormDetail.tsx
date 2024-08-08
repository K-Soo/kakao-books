import styled from "styled-components";
import Button from "../common/Button";
import SearchFormDetailModal from "../home/SearchFormDetailModal";
import { useEffect, useRef, useState } from "react";

export default function SearchFormDetail() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const searchFormDetailRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  const handleClickOutside = (event: MouseEvent) => {
    if (searchFormDetailRef.current && !searchFormDetailRef.current.contains(event.target as Node)) {
      setIsOpenModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.SearchFormDetail ref={searchFormDetailRef}>
      <Button color="lightGray" name="searchDetail" onClick={() => setIsOpenModal((prev) => !prev)} label="상세검색" width="72px" height="35px" />
      {isOpenModal && <SearchFormDetailModal setIsOpenModal={setIsOpenModal} />}
    </S.SearchFormDetail>
  );
}

const S = {
  SearchFormDetail: styled.div`
    margin-left: 16px;
    position: relative;
  `,
};
