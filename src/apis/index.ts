import * as API from "../types";
import { paginateData } from "../utils/paginateData";
import { getLikesData } from "../utils";
import environment from "../environment";

interface FetchConfig extends RequestInit {
  headers?: HeadersInit;
}

const config = {
  headers: {
    Authorization: `KakaoAK ${environment.kakaoKey}`,
  },
};

const responseBody = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errData = await response.json();
    const errorMessage = errData.message || `HTTP error! Status: ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

const requests = {
  get: <T>(url: string, config?: FetchConfig) => fetch(url, { ...config, method: "GET" }).then(responseBody<T>),
};

export const Get = {
  getKakaoBooks: ({ keyword, page, target }: API.BooksRequest) => {
    const urlSearchParams = new URLSearchParams();
    if (target) urlSearchParams.set("target", target);

    const queryString = urlSearchParams.toString();
    const url = `https://dapi.kakao.com/v3/search/book?query=${keyword}&page=${page}${queryString ? `&${queryString}` : ""}`;

    return requests.get<API.BooksResponse>(url, config);
  },
  getLocalStorageData: (page: number) =>
    Promise.resolve()
      .then(() => getLikesData<API.BookDetails[]>())
      .then((listData) => paginateData({ data: listData, limit: 10, page: page })),
};
