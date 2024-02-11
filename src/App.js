import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { routes } from "./routes/index";
import PrivateRoutes from "./auth/PrivateRoute";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />}>{routes}</Route>
        </Route>
        
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

