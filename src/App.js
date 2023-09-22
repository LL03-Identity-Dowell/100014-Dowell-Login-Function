import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import Policy from "./pages/Policy";
import Chat from "./pages/Chat";
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";
import UsernameForgot from "./components/UsernameForgot";
import SplashPage from "./pages/SplashPage";
import SignOutPage from "./pages/SignOutPage";
import NotFound from "./pages/NotFound";
import ChangePassword from "./components/changePassword";
import ForgotPassword from "./components/forgotPassword";
import UsersData from "./pages/usersData";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/beta" element={<Home />} />
          <Route path="/beta/signup" element={<SignUp />} />
          <Route exact path="/beta/logout" element={<SignOutPage />} />
          <Route path="/beta/splash/:Username" element={<SplashPage />} />
          <Route path="/beta/forgotPassword" element={<ForgotPassword />} />
          <Route path="/beta/changePassword" element={<ChangePassword />} />
          <Route path="/beta/username" element={<UsernameForgot />} />
          <Route path="/beta/chat" element={<Chat />} />
          <Route path="/beta/policy" element={<Policy />} />
          <Route path="/beta/help" element={<Help />} />
          <Route path="/beta/faq" element={<FAQ />} />
          <Route path="/beta/usersData" element={<UsersData />} />

          <Route path="*" component={NotFound} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
