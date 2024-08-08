/**
 * 숫자 또는 문자열에 천 단위 구분 쉼표를 추가하는 함수
 *
 * @param {number | string | undefined} x - 천 단위 구분 쉼표를 추가할 숫자 또는 문자열. undefined나 빈 문자열일 경우 "0"을 반환.
 * @returns {string} 천 단위 구분 쉼표가 추가된 문자열. 입력이 유효하지 않을 경우 "0"을 반환.
 */

export const priceComma = (x: number | string | undefined): string => {
  if (x === "" || x === undefined) {
    return "0";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
