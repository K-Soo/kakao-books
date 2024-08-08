import { PagingResult } from "../types";

/**
 * 데이터 배열을 페이지 단위로 나눕니다.
 *
 * @param {PaginateDataArgs<T>} args - 페이지네이션에 필요한 인자.
 * @param {T[]} args.data - 페이지네이션 할 데이터 배열.
 * @param {number} args.page - 현재 페이지 번호.
 * @param {number} args.limit - 한 페이지에 표시할 항목 수.
 * @returns {PagingResult<T>} 페이지네이션된 결과를 포함한 객체.
 */

interface PaginateDataArgs<T> {
  data: T[];
  page: number;
  limit: number;
}

export function paginateData<T>({ data, page, limit }: PaginateDataArgs<T>): PagingResult<T> {
  const TOTAL_COUNT = data.length;
  const PAGE_NUM = Number(page);
  const LIMIT_NUM = Number(limit);
  const TOTAL_PAGE = Math.ceil(TOTAL_COUNT / LIMIT_NUM);

  const startIndex = (PAGE_NUM - 1) * LIMIT_NUM;
  const endIndex = PAGE_NUM * LIMIT_NUM;

  const result: PagingResult<T> = {
    meta: {
      page: PAGE_NUM,
      maxPage: TOTAL_PAGE,
      next: -1,
      total: TOTAL_COUNT,
    },
    documents: [],
  };

  result.documents = data.slice(startIndex, endIndex);

  if (endIndex < TOTAL_COUNT) result.meta.next = PAGE_NUM + 1;
  if (endIndex >= TOTAL_COUNT) result.meta.next = -1;

  return result;
}
