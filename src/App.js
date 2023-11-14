import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import UsernameForgot from "./components/UsernameForgot";
import SplashPage from "./pages/SplashPage";
import SignOutPage from "./pages/SignOutPage";
import NotFound from "./pages/NotFound";
import ChangePassword from "./components/changePassword";
import ForgotPassword from "./components/forgotPassword";
import UsersData from "./pages/usersData";
import checkRequests from "./Hoc/CheckRequests";
import Error503 from "./pages/Error503";

function App(props) {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route exact path="/sign-out" element={<SignOutPage />} />
          <Route path="/splash/:username" element={<SplashPage />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/forgot_username" element={<UsernameForgot />} />
          <Route path="/usersData" element={<UsersData />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/503" element={<Error503 />} />
        </Routes>
      </Router>
    </>
  );
}

export default checkRequests(App);
