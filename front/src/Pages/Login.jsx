import React, { useState } from "react";

import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "./style.css";

const Login = () => {
  const [inputField, setInputField] = useState({});
  const data = { data: false };

  const googleLogin = () => {
    window.open();
  };
  const twitterLogin = () => {
    window.open();
  };
  const facebookLogin = () => {
    window.open();
  };

  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (data.data === true) {
        toast.success("Login Successfully");
      } else if (data.data === false) {
        toast.error("Wrong credentials");
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className='sign-in'>
        <div className='container'>
          <div className='signin-content'>
            <div className='signin-image'>
              <figure>
                <img src='images/signin-image.jpg' alt='sign up image' />
              </figure>

              <Link to={"/singup"} className='signup-image-link'>
                Create an account
              </Link>
            </div>
            <div className='signin-form'>
              <h2 className='form-title'>Sign up</h2>
              <form className='register-form' onSubmit={handleLogin}>
                <div className='form-group'>
                  <label htmlFor='your_name'>
                    <i className='zmdi zmdi-account material-icons-name' />
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='your_name'
                    onChange={inputHandler}
                    placeholder='Your Email'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='your_pass'>
                    <i className='zmdi zmdi-lock' />
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='your_pass'
                    onChange={inputHandler}
                    placeholder='Password'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='checkbox'
                    name='remember-me'
                    id='remember-me'
                    className='agree-term'
                  />
                  <label htmlFor='remember-me' className='label-agree-term'>
                    <span>
                      <span />
                    </span>
                    Remember me
                  </label>
                </div>
                <div className='form-group form-button'>
                  <input type='submit' className='form-submit' value='Login' />
                </div>
              </form>

              <div className='social-login'>
                <span className='social-label'>Or login with</span>

                <ul className='socials'>
                  <li>
                    <button onClick={facebookLogin}>
                      <i className='fa-brands fa-facebook'></i>
                    </button>
                  </li>
                  <li>
                    <button onClick={twitterLogin}>
                      <i className='fa-brands fa-twitter'></i>
                    </button>
                  </li>
                  <li>
                    <button onClick={googleLogin}>
                      <i className='fa-brands fa-google'></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default Login;
