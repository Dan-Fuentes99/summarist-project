import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaClock } from "react-icons/fa";
import { PremiumPill } from "./PremiumPill";
import "../styles/recommended.css";
import { Link } from "react-router-dom";
import { Skeleton } from "./Skeleton";

function Recommended() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [durations, setDurations] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
      .then(response => setBook(response.data))
      .finally(() => setTimeout(() => setLoading(false), 3000));
  }, []);

  useEffect(() => {
    book.forEach(book => {
      if (!book.audioLink) return;
      const audio = new window.Audio(book.audioLink);
      audio.addEventListener('loadedmetadata', () => {
        setDurations(prev => ({ ...prev, [book.id]: audio.duration }));
      });
    });
  }, [book]);

  const formatDuration = secs => {
    if (!secs) return "0:00";
    const min = Math.floor(secs / 60);
    const sec = Math.round(secs % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  
  return (
    <div className="recommended__books">
      {loading
  ? Array.from({ length: 3 }).map((_, idx) => <Skeleton variant="recommended" key={idx} />)
  : book.map((book, index) => (
          <Link to={`/book/${book.id}`} className="recommended__book--link" key={index}>
            <audio src=""></audio>
            <figure className="book__img--wrapper">
              <img src={book.imageLink} alt="" className="book__img" />
            </figure>
            <div className="recommended__book--title">{book.title}</div>
            {book.subscriptionRequired && <PremiumPill />}
            <div className="recommended__book--author">{book.author}</div>
            <div className="recommended__book--subtitle">{book.subTitle}</div>
            <div className="recommended__book--details-wrapper">
              <div className="recommended__book--details">
                <div className="recommended__book--details-icon">
                  <FaClock className="book__details--icon" />
                </div>
                <div className="recommended__book--details-text">{formatDuration(durations[book.id])}</div>
              </div>
              <div className="recommended__book--details">
                <div className="recommended__book--details-icon">
                  <FaStar className="book__details--icon" />
                </div>
                <div className="recommended__book--details-text">{book.averageRating}</div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Recommended;
