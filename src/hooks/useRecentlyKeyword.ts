import { useEffect, useState } from "react";
import { storage } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 최근 검색어 관리를 위한 커스텀 훅
 *
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [props.setIsFocused] - 포커스 상태를 설정하는 함수
 * @param {string} [props.keyword] - 현재 검색어
 * @returns {Object} 최근 검색어와 관련된 함수들을 포함하는 객체
 */

interface useRecentlyKeywordProps {
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  keyword?: string;
}

export default function useRecentlyKeyword({ setIsFocused, keyword }: useRecentlyKeywordProps) {
  const storedRecentlyKeyword = storage.getLocalStorageItem("recentlyKeyword");
  const [recentKeyword, setRecentKeyword] = useState<string[]>(storedRecentlyKeyword ? storedRecentlyKeyword : []);

  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const keywordParam = params.get("keyword");

  // URL의 키워드 파라미터가 변경되고 현재 input value와 다르면 실행
  useEffect(() => {
    if (keywordParam && keywordParam !== keyword) {
      const updatedKeyword = recentKeyword.filter((keyword) => keyword !== keywordParam);
      updatedKeyword.unshift(keywordParam);
      const limitedKeywords = updatedKeyword.slice(0, 8);
      setRecentKeyword(limitedKeywords);
      storage.setLocalStorageItem("recentlyKeyword", limitedKeywords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordParam]);

  // 키워드를 클릭했을 때 실행
  const handleMouseDownKeyword = (selectedKeyword: string) => {
    if (selectedKeyword === keywordParam) {
      if (setIsFocused) {
        setIsFocused(false);
      }
      return;
    }
    if (setIsFocused) {
      setIsFocused(false);
    }
    const newParams = new URLSearchParams();
    newParams.set("keyword", selectedKeyword);

    navigate(`?${newParams.toString()}`, { replace: true });
  };

  // 키워드를 삭제했을 때 실행
  const handleClickRemoveKeyword = (selectedKeyword: string) => {
    const updatedKeyword = recentKeyword.filter((keyword) => keyword !== selectedKeyword);
    setRecentKeyword(updatedKeyword);
    storage.setLocalStorageItem("recentlyKeyword", updatedKeyword);
  };

  return { recentKeyword, handleMouseDownKeyword, handleClickRemoveKeyword };
}
