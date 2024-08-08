import Home from "../../components/home";
import SearchForm from "../../components/home/SearchForm";
import SearchFormDetail from "../../components/home/SearchFormDetail";

export default function HomeContainer() {
  return (
    <Home>
      <SearchForm placeholder="검색어를 입력하세요" />
      <SearchFormDetail />
    </Home>
  );
}
