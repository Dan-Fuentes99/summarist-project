import { Link } from "react-router-dom";
import {
  FaHome,
  FaBookmark,
  FaCog,
  FaSignInAlt,
  FaPencilAlt,
  FaSearch,
  FaQuestionCircle,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import "../styles/sidebar.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Sidebar({ onLoginClick, closeSidebar, isMobile, isOpen }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth);
  }
  return (
    <div>
      <div
        className={`sidebar${isMobile ? " sidebar--mobile" : ""}${
          isOpen ? " sidebar--open" : ""
        }`}
      >
        {isMobile && (
          <button
            className="sidebar__close-btn"
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              zIndex: 2000,
              background: "transparent",
              border: "none",
            }}
            onClick={closeSidebar}
          ></button>
        )}
        <Link to="/" onClick={() => isMobile && closeSidebar()} className="sidebar__logo">
          <img src={logo} alt="" className="sidebar__logo--img" />
        </Link>
        <div className="sidebar__top">
          <Link to="/for-you" onClick={() => isMobile && closeSidebar()} className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaHome className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">For You</div>
          </Link>
          <Link
            to=""
            className="sidebar__link--wrapper sidebar__link--not-allowed"
          >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaBookmark className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">Library</div>
          </Link>
          <Link
            to=""
            className="sidebar__link--wrapper sidebar__link--not-allowed"
          >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaPencilAlt className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </Link>
          <Link
            to=""
            className="sidebar__link--wrapper sidebar__link--not-allowed"
          >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaSearch className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">Search</div>
          </Link>
        </div>
        <div className="sidebar__bottom">
          <Link to="/settings" onClick={() => isMobile && closeSidebar()} className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaCog className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </Link>
          <Link
            to=""
            className="sidebar__link--wrapper sidebar__link--not-allowed"
          >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaQuestionCircle className="sidebar__icon" />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </Link>
          {user ? (
            <div className="sidebar__link--wrapper">
              <div className="sidebar__icon--wrapper">
                <FaSignInAlt className="sidebar__icon" />
              </div>
              <button className="sidebar__link--text" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="sidebar__link--wrapper">
              <div className="sidebar__icon--wrapper">
                <FaSignInAlt className="sidebar__icon" />
              </div>
              <button
                className="sidebar__link--text"
                onClick={() => {
                  onLoginClick();
                  if (isMobile && closeSidebar) closeSidebar();
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
