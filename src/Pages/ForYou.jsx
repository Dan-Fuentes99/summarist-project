import React from "react";
import SelectedBook from "../components/SelectedBook";
import Recommended from "../components/Recommended";
import Suggested from "../components/Suggested";
import "../styles/ForYou.css";
import "../styles/recommended.css";

function ForYou() {
  return (
    <div className="main__content">
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>
            <audio src=""></audio>
            <SelectedBook />
            <div className="recommended__books--wrapper">
              <div className="for-you__title">Recommended for you</div>
              <div className="for-you__subtitle">
                We think you'll like these
              </div>
              <Recommended />
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__subtitle">Browse new books</div>
              <Suggested />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForYou;
