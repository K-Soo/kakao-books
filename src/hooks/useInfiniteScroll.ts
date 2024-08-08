import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryKey, UseInfiniteQueryOptions, useInfiniteQuery } from "react-query";

/**
 * 무한 스크롤을 처리하는 커스텀 훅
 *
 *
 * @param {Object} params - useInfiniteScroll 훅에 필요한 매개변수들
 * @param {(args: Q) => Promise<T>} params.requestAPI - API 요청 함수
 * @param {Q} params.requestQuery - API 요청에 사용될 인자
 * @param {QueryKey} params.queryKey - React Query에서 사용하는 쿼리 키
 * @param {Omit<UseInfiniteQueryOptions<T, unknown, T, T, QueryKey>, "queryKey" | "queryFn">} [params.options] - React Query 옵션
 *
 * @returns {Object} 무한 스크롤 상태와 데이터를 포함한 객체
 * @returns {InfiniteData<T> | undefined} returns.data - API 응답 데이터
 * @returns {boolean} returns.isLoading - 쿼리가 로딩 상태인지 여부
 * @returns {boolean} returns.isFetching - 쿼리가 재로딩 상태인지 여부
 * @returns {boolean} returns.isSuccess - 쿼리가 성공 상태인지 여부
 * @returns {boolean | undefined} returns.hasNextPage - 다음 페이지가 있는지 여부
 * @returns {boolean} returns.isError - 쿼리가 에러 상태인지 여부
 * @returns {boolean} returns.isIdle - 쿼리가 초기 상태인지 여부
 * @returns {boolean} returns.isFetchingNextPage - 다음 페이지를 로드 중인지 여부
 * @returns {Function} returns.fetchNextPage - 다음 페이지를 요청하는 함수
 * @returns {Function} returns.refetch - 쿼리를 다시 요청하는 함수
 */

export interface UseInfiniteScrollProps<T, Q> {
  queryKey: QueryKey;
  requestAPI: (args: Q) => Promise<T>;
  options?: Omit<UseInfiniteQueryOptions<T, unknown, T, T, QueryKey>, "queryKey" | "queryFn">;
  requestQuery: Q;
}

let page = 1;

export type UseInfiniteScrollResult<T> = {
  data: InfiniteData<T> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<T, unknown>>;
  isError: boolean;
  refetch: () => void;
  isIdle: boolean;
  isFetchingNextPage: boolean;
};

export default function useInfiniteScroll<T, Q>({
  requestAPI,
  requestQuery,
  queryKey,
  options,
}: UseInfiniteScrollProps<T, Q>): UseInfiniteScrollResult<T> {
  const fetchUrl = async (currentPage: number) => {
    const response = await requestAPI({ ...requestQuery, page: currentPage });
    // await new Promise((resolve) => setTimeout(resolve, 200)); // 로딩UI 체크
    return response;
  };

  const { data, fetchNextPage, isSuccess, hasNextPage, isLoading, isFetching, isError, refetch, isIdle, isFetchingNextPage } = useInfiniteQuery<T>(
    queryKey,
    (queryParamsData) => {
      const currentPage: number = queryParamsData?.pageParam || 1;
      page = currentPage + 1;
      return fetchUrl(currentPage);
    },
    {
      getNextPageParam: (lastPage: any) => {
        const nextPage = lastPage?.meta.is_end === false ? page : false;
        return nextPage;
      },
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isIdle,
    isFetching,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isError,
    refetch,
    isFetchingNextPage,
  };
}
