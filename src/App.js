import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import PasswordForget from "./components/PasswordForget";
import UserNameForget from "./components/UserNameForget";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/password" element={<PasswordForget />} />
          <Route path="/username" element={<UserNameForget />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
