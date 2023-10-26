// import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import Updateprofile from "./Pages/Updateprofile";
import { useSelector, useDispatch } from "react-redux";
import { LogeIn } from "./http/api";
import { setLogin } from "./features/auth/authSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [isLog, setIsLog] = useState(false);

  const ProtectedRoute = ({ children }) => {
    // const { isAuthenticated, user } = useSelector((state) => state.auth);
    // console.log(isAuthenticated);
    const isAuthenticated = true;

    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    } else {
      <Navigate to={"/"}></Navigate>;
    }

    return children;
  };

  useEffect(() => {
    async function checkLogin() {
      const { data } = await LogeIn();
      if (data.valid === true) {
        setIsLog(true);
        dispatch(setLogin(data.user));
      }
    }
    checkLogin();
  }, [ProtectedRoute]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route path='/' element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
