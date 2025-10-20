import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import image from "../assets/login.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { getSubscriptionStatus } from "../components/SubscriptionStatus";

function Settings({ onLoginClick }) {
  const [email, setEmail] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleCancelPremium = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) {
        alert("Please log in first.");
        return;
      }
      await setDoc(
        doc(db, "users", user.uid),
        {
          subscription: "basic",
          canceledAt: new Date().toISOString(),
        },
        { merge: true }
      );
      alert("Your subscription has been canceled. You are now a basic member.");
      setSubscriptionStatus("basic");
    } catch (err) {
      alert("Error canceling premium: " + err.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setEmail(user ? user.email : null);
      if (user) {
        const status = await getSubscriptionStatus(user);
        setSubscriptionStatus(status);
      } else {
        setSubscriptionStatus(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className="settings__wrapper">
          <div className="section__title page__title">Settings</div>
          {email ? (
            <div className="settings__account--wrapper">
              <div className="subscription__wrapper">
                <div className="subscription__title">
                  Your Subscription Plan
                </div>
                <div className="subscription__plan--status">
                  {subscriptionStatus === "premium" ? "Premium" : "Basic"}
                </div>
                {subscriptionStatus === "basic" && (
                  <Link to="/choose-plan" className="btn settings__btn">
                    Upgrade to Premium
                  </Link>
                )}
                {subscriptionStatus === "premium" && (
                  <div className="subscription__note">
                    You already have Premium access!
                  </div>
                )}
                {subscriptionStatus === "premium" && (
                  <button
                    className="btn settings__btn"
                    style={{ background: "#d32f2f", marginTop: "16px" }}
                    onClick={handleCancelPremium}
                  >
                    Cancel Premium
                  </button>
                )}
              </div>
              <div className="subscription__wrapper">
                <div className="subscription__title">Email</div>
                <div className="subscription__plan">{email}</div>
              </div>
            </div>
          ) : (
            <div className="settings__login--wrapper">
              <img src={image} alt="login" />
              <div className="settings__login--text">
                Log in to your account to see your details.
              </div>
              <button onClick={onLoginClick} className="btn settings__btn">
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
