// import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import Updateprofile from "./Pages/Updateprofile";
import { useSelector, useDispatch } from "react-redux";
import { LogeIn } from "./http/api";
import { setLogin } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<Signup />} />
        <Route
          path='/'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route path='/' element={<Home />} /> */}
      </Routes>
    </>
  );
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const dispatch = useDispatch();
  async function call() {
    const res = await LogeIn();
    if (res.data.valid) {
      dispatch(setLogin(res.data.user));
    } else if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  }
  useEffect(() => {
    call();
  }, []);
};

export default App;
