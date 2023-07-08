import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const successUsername = params.get("username");
    if (successUsername) {
      showSuccessMessage(successUsername);
    }
  }, []);

  const showSuccessMessage = (username) => {
    const message = document.getElementById("message");
    message.innerHTML = `User <strong>${username}</strong> successfully registered!`;
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleCancel = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl mb-4">Welcome to our Splash Page!</h1>
      <p id="message" className="text-gray-600 mb-4"></p>
      <div className="flex flex-row items-center mt-20">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SplashPage;
