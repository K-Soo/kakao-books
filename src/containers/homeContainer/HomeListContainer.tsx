import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Get } from "../../apis";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { BookDetails, BooksResponse, BooksRequest } from "../../types";
import TotalCount from "../../components/common/TotalCount";
import BookCard from "../../components/common/bookCard";
import { InfiniteData } from "react-query";
import useDebounce from "../../hooks/useDebounce";
import { getLikesData } from "../../utils/getLikesData";
import { storage } from "../../utils/storage";
import EmptyComponent from "../../components/common/EmptyComponent";
import HomeList from "../../components/home/HomeList";
import Icon from "../../icons/Icon";
import ErrorComponent from "../../components/common/ErrorComponent";
import Notification from "../../components/common/Notification";

// 로컬 스토리지에 있는 좋아요 데이터를 기반으로 책 데이터에 isLike 필드를 추가하는 함수
const selectFunction = (likes: BookDetails[]) => (data: InfiniteData<BooksResponse>) => {
  // 로컬 스토리지의 좋아요 데이터에 현재 문서의 ISBN이 있는지 확인하여 isLike 필드를 추가
  data.pages.forEach((page) => {
    page.documents = page.documents.map((doc) => ({
      ...doc,
      isLike: likes.some((like) => like.isbn === doc.isbn),
    }));
  });
  return data;
};

const QUERY_KEY = "booksQuery";

export default function HomeListContainer() {
  const params = new URLSearchParams(useLocation().search);
  const [showNotification, setShowNotification] = useState(false);
  const keywordParam = params.get("keyword");
  const targetParam = params.get("target");

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const likesData = getLikesData<BookDetails[]>();

  const booksQueryKey = [QUERY_KEY, keywordParam, targetParam].filter(Boolean);

  const request = {
    queryKey: booksQueryKey,
    requestAPI: Get.getKakaoBooks,
    options: {
      enabled: !!keywordParam,
      suspense: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      select: selectFunction(likesData),
    },
    requestQuery: {
      keyword: keywordParam,
      ...(targetParam && { target: targetParam }), // targetParam이 있을 경우 포함
    } as BooksRequest,
  };

  const { data, isSuccess, fetchNextPage, hasNextPage, isError, isFetchingNextPage, refetch, isIdle } = useInfiniteScroll<
    BooksResponse,
    BooksRequest
  >(request);

  useEffect(() => {
    if (isFetchingNextPage) return;
    if (!hasNextPage) return;

    const callback = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(callback, { threshold: 0.1 });
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [fetchNextPage, isFetchingNextPage, hasNextPage, data]);

  const handleLikeClick = useDebounce((item: BookDetails) => {
    let updatedLikes;

    if (item.isLike) {
      updatedLikes = likesData.filter((book) => book.isbn !== item.isbn);
    }
    if (!item.isLike) {
      setShowNotification(true);
      updatedLikes = [...likesData, { ...item, isLike: true }];
      setTimeout(() => {
        setShowNotification(false);
      }, 800);
    }
    storage.setLocalStorageItem("likeDB", updatedLikes);
    refetch();
  }, 200);

  if (isError) {
    return (
      <HomeList>
        <TotalCount count={0} text="도서 검색 결과" />
        <ErrorComponent />
      </HomeList>
    );
  }

  return (
    <>
      <Notification show={showNotification} />
      <HomeList>
        <TotalCount count={data?.pages[0]?.meta?.total_count ?? 0} text="도서 검색 결과" />
        {isIdle && <EmptyComponent text="검색어를 입력해주세요." />}
        {isSuccess && data && data?.pages[0]?.documents?.length === 0 && <EmptyComponent text="검색된 결과가 없습니다." />}
        {data &&
          data?.pages.map((pageData) => {
            return pageData.documents.map((book, index) => {
              return (
                <BookCard key={`${book.isbn}-${index}`} index={index} item={book} ref={index === pageData.documents.length - 1 ? lastItemRef : null}>
                  <Icon className="like-icon" name={book.isLike ? "LikeOn" : "LikeOff"} onClick={() => handleLikeClick(book)} />
                </BookCard>
              );
            });
          })}
      </HomeList>
    </>
  );
}
