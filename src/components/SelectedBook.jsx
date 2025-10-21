import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import '../styles/selectedbook.css';
import { Link } from "react-router-dom";
import { Skeleton } from "./Skeleton";

function SelectedBook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchSelectedBook = async () => {
    const response = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setBook(response.data);
  };

  useEffect(() => {
    setLoading(true); 
    fetchSelectedBook().then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000); 
    });
  }, []);

  return (
    <div className="overflow">
      {loading
        ? Array.from({ length: 1 }).map((_, idx) => <Skeleton variant="selected" key={idx} />)
        : book.map((book, index) => (
        <Link to={`/book/${book.id}`} className="selected__book">
        <div className="selected__book--subtitle">{book.subTitle}</div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure className="selected__img--wrapper">
            <img src={book.imageLink} alt="" className="selected__img" />
          </figure>
          <div className="selected__book--text">
            <div className="selected__book--title">{book.title}</div>
            <div className="selected__book--author">{book.author}</div>
            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon-wrapper">
                <FaPlayCircle className="selected__book--icon" />
              </div>
              <div className="selected__book--duration">2 mins 23 secs</div>
            </div>
          </div>
        </div>
      </Link>))}
    </div>
  );
}

export default SelectedBook;
