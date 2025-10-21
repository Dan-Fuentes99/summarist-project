import React, { useState, useEffect } from "react";
import { FaSearch, FaClock, FaBars } from "react-icons/fa";
import "../styles/search.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "./Skeleton";

function Search({ showBurger, onBurgerClick }) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [durations, setDurations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      setBooks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchSearchBooks = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
        );
        setBooks(response.data);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    fetchSearchBooks();
  }, [search]);

  useEffect(() => {
    books.forEach((book) => {
      if (!book.audioLink || durations[book.id]) return;
      const audio = new window.Audio(book.audioLink);
      audio.addEventListener("loadedmetadata", () => {
        setDurations((prev) => ({
          ...prev,
          [book.id]: audio.duration,
        }));
      });
    });
  }, [books, durations]);

  const formatDuration = (secs) => {
    if (!secs) return "0:00";
    const min = Math.floor(secs / 60);
    const sec = Math.round(secs % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="search-header-row">
      <div className="search__background">
        <div className="search__wrapper">
          {showBurger && (
            <button className="burger-btn" onClick={onBurgerClick}>
              <FaBars size={32} />
            </button>
          )}
          <figure></figure>
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  className="search__input"
                  placeholder="Search for Books"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="search__icon">
                  <FaSearch />
                </div>
                {search.trim().length > 0 && (
                  <>
                    {loading && (
                      <div className="search__books--wrapper">
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <Skeleton variant="recommended" key={idx} />
                        ))}
                      </div>
                    )}

                    {!loading && books.length > 0 && (
                      <div className="search__books--wrapper">
                        {books.map((book) => (
                          <Link
                            key={book.id}
                            to={`/book/${book.id}`}
                            className="search__book--link"
                          >
                            <figure className="search__image--wrapper">
                              <img
                                className="book__image"
                                src={book.imageLink}
                                alt={book.title}
                              />
                            </figure>
                            <div>
                              <div className="search__book--title">
                                {book.title}
                              </div>
                              <div className="search__book--author">
                                {book.author}
                              </div>
                              <div className="recommended__book--details">
                                <div className="recommended__book--details-icon">
                                  <FaClock />
                                </div>
                                <div className="recommended__book--details-text">
                                  {formatDuration(durations[book.id])}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
