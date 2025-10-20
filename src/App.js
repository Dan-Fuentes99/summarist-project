import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
import Home from "./Pages/Home";
import ForYou from "./Pages/ForYou";
import Settings from "./Pages/Settings";
import ChoosePlan from "./Pages/ChoosePlan";
import Book from "./Pages/Book";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import NewAccount from "./components/NewAccount";
import Read from "./Pages/Read";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const showSidebar = location.pathname !== "/" && (!isMobile || sidebarOpen);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  function onLoginClick() {
    console.log("Sidebar login clicked!");
    setModalType("login");
    setShowModal(true);
  }
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleLogin(email, password) {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowModal(false);
      setModalType(null);
      navigate("/for-you");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleGuestLogin() {
    setShowModal(false);
    setModalType(null);
    navigate("/for-you");
  }

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/choose-plan" && (
        <Search
          showBurger={isMobile && !sidebarOpen}
          onBurgerClick={() => setSidebarOpen(!sidebarOpen)}
        />
      )}
      {/* {location.pathname !== "/" && location.pathname !== "/choose-plan" && (
        <div className="header-actions-row">
          {isMobile && !sidebarOpen && (
            <button
              className="burger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: "transparent",
                border: "none",
              }}
            >
              <FaBars size={32} />
            </button>
          )}
          <Search />
        </div>
      )} */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1998,
          }}
        />
      )}

      {location.pathname !== "/" && location.pathname !== "/choose-plan" && (
        <Sidebar
          onLoginClick={onLoginClick}
          closeSidebar={closeSidebar}
          isMobile={isMobile}
          isOpen={sidebarOpen}
        />
      )}

      <Routes>
        <Route path="/" element={<Home onLoginClick={onLoginClick} />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route
          path="/settings"
          element={<Settings onLoginClick={onLoginClick} />}
        />
        <Route path="/choose-plan" element={<ChoosePlan />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>

      {showModal && modalType === "login" && (
        <Login
          show={showModal}
          onClose={() => setShowModal(false)}
          handleLogin={handleLogin}
          onForgot={() => setModalType("forgot")}
          onCreate={() => setModalType("signup")}
          onGuest={handleGuestLogin}
          error={error}
        />
      )}
      {showModal && modalType === "forgot" && (
        <ForgotPassword
          show={showModal}
          onClose={() => setShowModal(false)}
          onGoToLogin={() => setModalType("login")}
        />
      )}
      {showModal && modalType === "signup" && (
        <NewAccount
          show={showModal}
          onClose={() => setShowModal(false)}
          onGoToLogin={() => setModalType("login")}
        />
      )}
    </>
  );
}

export default App;
