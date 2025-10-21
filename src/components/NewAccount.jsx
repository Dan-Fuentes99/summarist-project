import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupModal = ({ show, onClose, onGoToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!show) return null;

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setSuccess("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created! You can now log in.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
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
        <h2 style={{ marginTop: "32px" }}>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing up…" : "Sign Up"}
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

export default SignupModal;
