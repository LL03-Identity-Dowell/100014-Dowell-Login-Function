import { useNavigate, useParams } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleCancel = () => {
    navigate("/signup");
  };

  const { Username } = useParams();

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl mb-4">Welcome to our Splash Page!</h1>
      <p id="message" className="text-gray-600 mb-4">
        User <strong className="underline text-green-500">{Username}</strong>
        successfully registered!
      </p>
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
