import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import MainPage from "./pages/MainPage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { routes } from "./routes/index";
import PrivateRoutes from "./auth/PrivateRoute";
function App() {
  const isAuthenticated = true; // Example, you need to replace this with your actual authentication logic


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

