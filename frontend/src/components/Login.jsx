// Login.jsx
import React, { useEffect, useState } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset, getMe } from "../features/authSlice";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message, token } = useSelector((state) => state.auth);


  console.log("User level:", user?.level); // Pastikan user dan level ada
  useEffect(() => {
    if (isSuccess && user) {
      console.log("User level:", user.level);
      // Redirect berdasarkan level user
      if (user.level === "admin") {
        navigate("/dashboard");
      } else if (user.level === "kasir") {
        navigate("/kasir");
      } else {
        navigate("/");
      }
    }

    // Menangani error
    if (isError) {
      console.error(message);
      // Dispatch reset hanya jika ada error
      dispatch(reset());
    }

    // Fetch user profile jika token ada dan user belum ada
    if (token && !user) {
      dispatch(getMe());
    }

    // Jangan reset state jika berhasil login
  }, [user, isSuccess, isError, message, dispatch, navigate, token]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
    // console.log("Redux State setelah login:", state.auth);
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body ">
        <div className="container ">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box has-background-light form-border">
                {isError && <p className="has-text-centered has-text-danger">{message}</p>}
                <h1 className="title is-2" style={{ color: "black" }}>
                  Sign In
                </h1>
                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Username
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" style={{ color: "black" }}>
                    Password
                  </label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*****"
                      required
                    />
                  </div>
                </div>
                <div className="field mt-5 has-text-centered">
                  <button type="submit" className="button login " disabled={isLoading}>
                    {isLoading ? "Loading.." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
