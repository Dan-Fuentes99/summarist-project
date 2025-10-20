import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useGuestLogin() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

function handleGuestLogin() {
  setIsGuestLoading(true);
  setTimeout(() => {
    setIsGuest(true);
    setIsGuestLoading(false);
    navigate("/for-you");
  }, 1500);
}

  const navigate = useNavigate();

  function handleGuestLogin() {
    setIsGuestLoading(true);
  setTimeout(() => {
    setIsGuest(true);
    setIsGuestLoading(false);
    navigate("/for-you");
  }, 1500);
  }

  return { user, setUser, isGuest, setIsGuest, handleGuestLogin };
}

export default useGuestLogin;
