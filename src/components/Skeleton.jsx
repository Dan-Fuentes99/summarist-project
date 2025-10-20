import React from "react";
import "../styles/skeleton.css";

export function Skeleton({ variant }) {
  switch (variant) {
    case "recommended":
      return (
        <div className="recommended__books">
          <div className="recommended__book--link skeleton">
            <div className="book__img--wrapper shimmer"></div>
            <div className="recommended__book--title shimmer"></div>
            <div className="recommended__book--author shimmer"></div>
            <div className="recommended__book--subtitle shimmer"></div>
            <div className="recommended__book--details-wrapper">
              <div className="recommended__book--details shimmer"></div>
              <div className="recommended__book--details shimmer"></div>
            </div>
          </div>
        </div>
      );
    case "selected":
      return (
        <div className="selected__book skeleton">
          <div className="selected__book--subtitle shimmer"></div>
          <div className="selected__book--line shimmer"></div>
          <div className="selected__book--content">
            <figure className="book__image--wrapper shimmer"></figure>
            <div className="selected__book--text">
              <div className="selected__book--title shimmer"></div>
              <div className="selected__book--author shimmer"></div>
              <div className="selected__book--duration-wrapper">
                <div className="selected__book--icon-wrapper shimmer"></div>
                <div className="selected__book--duration shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case "book-detail":
      return (
        <div className="main__content">
          <div className="wrapper">
            <div className="row">
              <div className="container">
                <div className="inner__wrapper">
                  <div className="inner__book skeleton">
                    <div
                      className="skeleton-title shimmer"
                      style={{
                        marginBottom: "16px",
                        width: "100%",
                        height: "32px",
                      }}
                    ></div>
                    <div
                      className="skeleton-author shimmer"
                      style={{
                        marginBottom: "16px",
                        width: "100%",
                        height: "20px",
                      }}
                    ></div>
                    <div
                      className="skeleton-subtitle shimmer"
                      style={{
                        marginBottom: "24px",
                        width: "100%",
                        height: "18px",
                      }}
                    ></div>
                    <div
                      className="inner-book__wrapper"
                      style={{
                        marginBottom: "24px",
                        padding: "16px 0",
                        borderTop: "1px solid #e1e7ea",
                        borderBottom: "1px solid #e1e7ea",
                      }}
                    >
                      <div className="inner-book__description--wrapper">
                        <div
                          className="skeleton-detail-row shimmer"
                          style={{ width: "48%", height: "18px" }}
                        ></div>
                        <div
                          className="skeleton-detail-row shimmer"
                          style={{ width: "48%", height: "18px" }}
                        ></div>
                        <div
                          className="skeleton-detail-row shimmer"
                          style={{ width: "48%", height: "18px" }}
                        ></div>
                        <div
                          className="skeleton-detail-row shimmer"
                          style={{ width: "48%", height: "18px" }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="inner-book__read--btn-wrapper"
                      style={{ marginBottom: "24px" }}
                    >
                      <div
                        className="skeleton-detail-row shimmer"
                        style={{ width: "144px", height: "48px" }}
                      ></div>
                      <div
                        className="skeleton-detail-row shimmer"
                        style={{ width: "144px", height: "48px" }}
                      ></div>
                    </div>
                    <div
                      className="inner-book__bookmark"
                      style={{ marginBottom: "40px" }}
                    >
                      <div
                        className="skeleton-detail-row shimmer"
                        style={{ width: "50px", height: "20px" }}
                      ></div>
                      <div
                        className="skeleton-detail-row shimmer"
                        style={{ width: "120px", height: "20px" }}
                      ></div>
                    </div>
                    <div
                      className="skeleton-title shimmer"
                      style={{
                        width: "40%",
                        height: "18px",
                        marginBottom: "16px",
                      }}
                    ></div>
                    <div
                      className="inner-book__tags--wrapper"
                      style={{ marginBottom: "16px" }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="skeleton-detail-row shimmer"
                          style={{
                            width: "80px",
                            height: "30px",
                            marginRight: "16px",
                          }}
                        ></div>
                      ))}
                    </div>
                    <div
                      className="skeleton-detail-row shimmer"
                      style={{
                        width: "100%",
                        height: "60px",
                        marginBottom: "16px",
                      }}
                    ></div>
                    <div
                      className="skeleton-title shimmer"
                      style={{
                        width: "40%",
                        height: "18px",
                        marginBottom: "16px",
                      }}
                    ></div>
                    <div
                      className="skeleton-detail-row shimmer"
                      style={{
                        width: "100%",
                        height: "40px",
                        marginBottom: "16px",
                      }}
                    ></div>
                  </div>
                  <div className="inner-book__img--wrapper">
                    <div
                      className="skeleton-img shimmer"
                      style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
