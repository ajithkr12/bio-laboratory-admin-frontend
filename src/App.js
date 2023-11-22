import {BrowserRouter,Routes,Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage"
import { routes } from "./routes/index";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<MainPage />}>
          {routes}
        </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
