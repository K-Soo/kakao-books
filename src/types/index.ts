export type MetaTypes = {
  is_end: false;
  pageable_count: 997;
  total_count: 997;
};

export type BookDetails = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: string;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
  isLike: boolean;
};

export interface BooksResponse {
  documents: BookDetails[];
  meta: MetaTypes;
}

export interface BooksRequest {
  keyword: string;
  page: number;
  target: string;
}

export interface PagingResult<T> {
  meta: {
    page: number;
    maxPage: number;
    next: number;
    total: number;
  };
  documents: T[];
}

export type selectOptionType = { label: string; value: string };
