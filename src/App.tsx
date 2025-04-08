import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";

const routes = [
  { path: "/vv", element: <AuthPage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/", element: <Home /> },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
