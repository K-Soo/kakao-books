/**
 * 로컬 스토리지 작업을 위한 유틸리티 객체
 *
 * @function getLocalStorageItem
 * @param {nameTypes} name - 가져올 로컬 스토리지 항목의 이름
 * @returns {any | null} 로컬 스토리지에서 가져온 데이터. JSON 파싱에 실패하거나 데이터가 없으면 null을 반환.
 *
 * @function setLocalStorageItem
 * @param {nameTypes} name - 설정할 로컬 스토리지 항목의 이름
 * @param {any} value - 로컬 스토리지에 저장할 값. JSON 문자열로 변환되어 저장됩니다.
 */

type nameTypes = "likeDB" | "recentlyKeyword";

export const storage = {
  getLocalStorageItem: (name: nameTypes) => {
    const storageData = localStorage.getItem(name);
    if (storageData) {
      try {
        return JSON.parse(storageData);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return null;
      }
    }
    return null;
  },
  setLocalStorageItem: (name: nameTypes, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
};
