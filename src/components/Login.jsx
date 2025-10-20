import React, { useState } from "react";
import ModalPortal from "./ModalPortal";
import { FiX } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";

const Login = ({
  show,
  onClose,
  handleLogin,
  onForgot,
  onCreate,
  onGuest,
  guestLoading,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  if (!show) return null;

  async function onFormSubmit(e) {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await handleLogin(email, password);
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <ModalPortal>
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onClose}><FiX /></button>
          <h2 style={{ marginTop: "32px" }}>Login to Summarist</h2>
          <button
            className="guest__btn"
            onClick={onGuest}
            disabled={guestLoading}
          >
            {guestLoading ? <FiLoader className="spinner" /> : "Continue as Guest"}
          </button>
          <div className="or-divider">
            <span className="line"></span>
            <span className="or-text">or</span>
            <span className="line"></span>
          </div>
          <form onSubmit={onFormSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              className="modal__btn"
              type="submit"
              disabled={loginLoading}
              style={{ position: "relative" }}
            >
              {loginLoading ? (
                <FiLoader className="spinner" style={{ marginRight: 8, verticalAlign: "middle" }} />
              ) : (
                "Login"
              )}
            </button>
          </form>
          {error && (
            <div
              style={{
                color: "#e63946",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {"Incorrect email or password."}
            </div>
          )}
          <div className="modal__links">
            <a
              className="modal__link"
              onClick={e => {
                e.preventDefault();
                onForgot();
              }}
            >
              Forgot password?
            </a>
            <br />
            <button
              className="modal__link--btn"
              onClick={e => {
                e.preventDefault();
                onCreate();
              }}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Login;
