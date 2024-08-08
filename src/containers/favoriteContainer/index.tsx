import { useEffect, useRef, useState } from "react";
import { BookDetails, PagingResult } from "../../types";
import { Get } from "../../apis";
import BookCard from "../../components/common/bookCard";
import Favorite from "../../components/favorite";
import Icon from "../../icons/Icon";
import TotalCount from "../../components/common/TotalCount";
import EmptyComponent from "../../components/common/EmptyComponent";
import SkeletonUI from "../../components/common/SkeletonUI";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorComponent from "../../components/common/ErrorComponent";
interface InfiniteData<T> {
  pageParams: number[];
  pages: PagingResult<T>[];
}

const INIT_BOOKS_DATA = { pageParams: [], pages: [] };

export default function FavoriteContainer() {
  const [booksData, setBooksData] = useState<InfiniteData<BookDetails>>(INIT_BOOKS_DATA);
  const [page, setPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const fetchBooksData = async (page: number) => {
    try {
      const data = await Get.getLocalStorageData(page);
      setBooksData((prev) => ({
        pageParams: [...prev.pageParams, page],
        pages: [...prev.pages, data as PagingResult<BookDetails>],
      }));
    } catch (error) {
      setIsError(true);
    } finally {
      if (isInitialLoading) {
        setIsInitialLoading(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 0.5초 대기 후 데이터 반환
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await fetchBooksData(page);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (isLoading) return;

    const callback = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting && true) {
        const lastPage = booksData.pages.at(-1);

        if (lastPage?.meta.next === -1) {
          return;
        }
        setPage((prev) => prev + 1);
      }
    };

    const observerInstance = new IntersectionObserver(callback, { threshold: 0.5 });
    observer.current = observerInstance;

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [booksData.pages, isLoading]);

  const likeDBLocalStorageData = localStorage.getItem("likeDB");
  const likeDBD = likeDBLocalStorageData ? JSON.parse(likeDBLocalStorageData) : [];

  const handleClickLike = (item: BookDetails) => {
    if (item.isLike) {
      const updatedLikes = likeDBD.filter((book: BookDetails) => book.isbn !== item.isbn);
      localStorage.setItem("likeDB", JSON.stringify(updatedLikes));
    } else {
      const updatedLikes = [...likeDBD, { ...item, isLike: true }];
      localStorage.setItem("likeDB", JSON.stringify(updatedLikes));
    }
    setBooksData(INIT_BOOKS_DATA);

    for (let i = 1; i <= page; i++) {
      fetchBooksData(i); // 각 페이지 데이터 리패치
    }
  };

  if (isError) {
    return (
      <Favorite>
        <TotalCount count={booksData?.pages[0]?.meta?.total ?? 0} text="찜한 책" />
        <ErrorComponent />
      </Favorite>
    );
  }

  if (isInitialLoading) {
    return (
      <Favorite>
        <TotalCount count={booksData?.pages[0]?.meta?.total ?? 0} text="찜한 책" />
        <SkeletonUI.BookItems count={4} />
      </Favorite>
    );
  }

  return (
    <Favorite>
      <TotalCount count={booksData?.pages[0]?.meta?.total ?? 0} text="찜한 책" />
      {booksData && booksData.pages[0]?.meta?.total === 0 && <EmptyComponent text="찜한 책이 없습니다." />}
      {booksData &&
        booksData.pages.map((pageData) => {
          return pageData.documents.map((book, index) => (
            <BookCard key={book.isbn} index={index} item={book} ref={index === pageData.documents.length - 1 ? lastItemRef : null}>
              <Icon className="like-icon" name={book.isLike ? "LikeOn" : "LikeOff"} onClick={() => handleClickLike(book)} />
            </BookCard>
          ));
        })}
      {isLoading && <LoadingSpinner />}
    </Favorite>
  );
}
