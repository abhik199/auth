import React, { useState } from "react";
import "./style.css";
import { Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { register } from "../http/api";

const Signup = () => {
  // const [inputField, setInputField] = useState({});
  // const inputHandler = (e) => {
  //   setInputField({ ...inputField, [e.target.name]: e.target.value });
  // };
  const [value, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandler = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await register(value);

      if (data.status === true) {
        toast.success("Register Successfully");
        setTimeout(() => {
          <Navigate to={"/login"} />;
        }, 1000);
      } else if (data.status === false) {
        toast.error(data.error);
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name" />
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    onClick={inputHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email" />
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onClick={inputHandler}
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">
                    <i className="zmdi zmdi-lock" />
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="pass"
                    onClick={inputHandler}
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    <i className="zmdi zmdi-lock-outline" />
                  </label>
                  <input
                    type="password"
                    id="re_pass"
                    placeholder="Repeat your password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    <span>
                      <span />
                    </span>
                    I agree all statements in{" "}
                    <a href="#" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="Register"
                    id="signup"
                    className="form-submit"
                    defaultValue="Register"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src="images/signup-image.jpg" alt="sing up image" />
              </figure>

              <Link to={"/login"} className="signup-image-link">
                I am already member
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default Signup;
