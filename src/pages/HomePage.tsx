import { Fragment, Suspense } from "react";
import HomeContainer from "../containers/homeContainer";
import HomeListContainer from "../containers/homeContainer/HomeListContainer";
import TotalCount from "../components/common/TotalCount";
import SkeletonUI from "../components/common/SkeletonUI";

const fallbackContent = (
  <>
    <TotalCount count={0} text="도서 검색 결과" />
    <SkeletonUI.BookItems count={10} />
  </>
);

export default function HomePagePage() {
  return (
    <Fragment>
      <HomeContainer />
      <Suspense fallback={fallbackContent}>
        <HomeListContainer />
      </Suspense>
    </Fragment>
  );
}
