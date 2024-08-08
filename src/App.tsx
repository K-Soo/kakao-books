import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Theme from "./styles/Theme";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import { path } from "./constants/path";

function App() {
  return (
    <Theme>
      <Layout>
        <Routes>
          <Route path={path.HOME} element={<HomePage />} />
          <Route path={path.FAVORITE} element={<FavoritePage />} />
        </Routes>
      </Layout>
    </Theme>
  );
}

export default App;
