import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ show, onClose, onGoToLogin }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!show) return null;

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      setError(
        err.code === "auth/user-not-found"
          ? "No account with that email was found."
          : err.message.replace("Firebase: ", "")
      );
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          <FiX size={24} color="#333" />
        </button>
        <h2 style={{ marginTop: "32px" }}>Forgot Password</h2>
        <p style={{
            marginBottom: "1rem",
            color: "#555",
            textAlign: "center"
        }}>Enter your email address to reset your password.</p>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "95%",
              marginBottom: "1rem",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
            disabled={loading}
          />
          {error && (
            <div style={{ color: "#e63946", marginBottom: "1rem" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "#20ba68", marginBottom: "1rem" }}>{success}</div>
          )}
          <button
            className="modal__btn"
            type="submit"
            style={{
              width: "100%",
              background: "#20ba68",
              color: "#fff",
              border: "none",
              padding: "0.75rem",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? "Sending…" : "Reset Password"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <a
            href="#"
            className="modal__link"
            onClick={e => {
              e.preventDefault();
              onGoToLogin();
            }}
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
