import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const checkRequests = (Wrapped) => {
  function CheckRequests(props) {
    const navigate = useNavigate();

    useEffect(() => {
      axios.interceptors.response.use(
        function (response) {
          // Do something with response data
          return response;
        },
        function (error) {
          switch (error.response.status) {
            case 503:
              navigate("/503"); //we will redirect user into 503 page
              break;
            default:
              break;
          }
          // Do something with response error
          return Promise.reject(error);
        }
      );
    }, [navigate]); // Add navigate as a dependency to avoid stale closure

    return <Wrapped {...props} />;
  }
  return CheckRequests;
};

export default checkRequests;
