import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { path } from "../../constants/path";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <S.Header>
      <div className="container">
        <h1 className="container__logo" onClick={() => navigate(path.HOME)}>
          CERTICOS BOOKS
        </h1>
        <nav>
          <StyledLink to={path.HOME} $active={path.HOME === pathname}>
            도서 검색
          </StyledLink>
          <StyledLink to={path.FAVORITE} $active={path.FAVORITE === pathname}>
            내가 찜한 책
          </StyledLink>
        </nav>
        <div></div>
      </div>
    </S.Header>
  );
}

const StyledLink = styled(Link)<{ $active: boolean }>`
  margin: 0 28px;
  border-bottom: ${(props) => (props.$active ? "1px solid #4880EE" : "1px solid #fff")};
  color: ${(props) => props.theme.colors.primary};
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
`;

const S = {
  Header: styled.div`
    position: sticky;
    top: 0;
    z-index: 2;
    height: 80px;
    background-color: ${(props) => props.theme.colors.white};
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: relative;
      &__logo {
        color: ${(props) => props.theme.colors.black};
        font-size: 24px;
        font-weight: 700;
        text-align: left;
        cursor: pointer;
        left: 150px;
        position: absolute;
      }
      nav {
        display: flex;
        flex-wrap: nowrap;
      }
    }
  `,
};
