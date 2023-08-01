import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Policy from "./pages/Policy";
import Chat from "./pages/Chat";
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";
import PasswordResetForm from "./components/PasswordResetForm";
import UsernameForgot from "./components/UsernameForgot";
import SplashPage from "./pages/SplashPage";
import SignOutPage from "./pages/SignOutPage";
import NotFound from "./pages/NotFound";
import ChangePassword from "./components/changePassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path="/logout" element={<SignOutPage />} />
          <Route path="/splash/:Username" element={<SplashPage />} />
          <Route path="/password" element={<PasswordResetForm />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/username" element={<UsernameForgot />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" component={NotFound} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
