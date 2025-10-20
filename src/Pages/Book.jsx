import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Book.css";
import { Skeleton } from "../components/Skeleton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  FaStar,
  FaClock,
  FaMicrophone,
  FaLightbulb,
  FaBookOpen,
  FaBookmark,
} from "react-icons/fa";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [audioDuration, setAudioDuration] = useState(null);
  const [user, setUser] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState("basic");
  const [showAudio, setShowAudio] = useState(false);
  const [listenError, setListenError] = useState("");
  const needsPremium = book?.subscriptionRequired === true;

  const canAccessBook =
    !!user && (!needsPremium || subscriptionStatus === "premium");

  const handleListenClick = () => {
    if (!user) {
      setShowAudio(false);
      setListenError("Log in to Listen.");
      return;
    }

    if (book.subscriptionRequired && subscriptionStatus !== "premium") {
      setShowAudio(false);
      setListenError("Upgrade to premium to listen.");
      return;
    }

    setShowAudio(true);
    setListenError("");
  };

  const formatDuration = (secs) => {
    if (!secs) return "0:00";
    const min = Math.floor(secs / 60);
    const sec = Math.round(secs % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().subscription === "premium") {
          setSubscriptionStatus("premium");
        } else {
          setSubscriptionStatus("basic");
        }
      } else {
        setSubscriptionStatus("basic");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        if (!id) throw new Error("No book ID found in route params.");
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        console.log("API book response:", response.data);
        setBook(response.data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (book && book.audioLink) {
      const audio = new window.Audio(book.audioLink);
      audio.addEventListener("loadedmetadata", () => {
        setAudioDuration(audio.duration);
      });
    }
  }, [book]);

  if (loading) return <Skeleton variant="book-detail" />;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>No book found.</div>;

  return (
    <div className="main__content">
      {/* <div className="wrapper"> */}
        <div className="book__row">
          <div className="book__container">
            <div className="inner__wrapper">
              <div className="inner__book">
                <div className="inner-book__title">{book.title}</div>
                <div className="inner-book__author">{book.author}</div>
                <div className="inner-book__sub--title">
                  {book.subTitle || book.subtitle}
                </div>
                <div className="inner-book__wrapper">
                  <div className="inner-book__description--wrapper">
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaStar />
                      </div>
                      <div className="inner-book__rating">
                        {book.averageRating}
                      </div>
                      <div className="inner-book__overall--rating">
                        ({book.totalRating} ratings)
                      </div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaClock />
                      </div>
                      <div className="inner-book__duration">
                        {audioDuration !== null
                          ? formatDuration(audioDuration)
                          : "Loading..."}
                      </div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaMicrophone />
                      </div>
                      <div className="inner-book__type">{book.type}</div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <FaLightbulb />
                      </div>
                      <div className="inner-book__key--ideas">
                        {book.keyIdeas} Key Ideas
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inner-book__read--btn-wrapper">
                  {book && canAccessBook ? (
                    <>
                      <Link
                        to={`/read/${book.id}`}
                        className="inner-book__read--btn"
                      >
                        <div className="inner-book__read--icon">
                          <FaBookOpen />
                        </div>
                        <div className="inner-book__read--text">Read</div>
                      </Link>
                      <button
                        className="inner-book__read--btn"
                        onClick={handleListenClick}
                      >
                        <div className="inner-book__read--icon">
                          <FaMicrophone />
                        </div>
                        <div className="inner-book__read--text">Listen</div>
                      </button>
                    </>
                  ) : (
                    <button className="inner-book__read--btn" disabled>
                      <div className="inner-book__read--icon">
                        <FaBookOpen />
                      </div>
                      <div className="inner-book__read--text">
                        {user ? "Premium Only" : "Log in to Read"}
                      </div>
                    </button>
                  )}
                </div>
                <div className="inner-book__bookmark">
                  <div className="inner-book__bookmark--icon">
                    <FaBookmark />
                  </div>
                  <div className="inner-book__bookmark--text">
                    Add to My Library
                  </div>
                </div>
                <div className="inner-book__secondary--title">
                  What's it about?
                </div>
                <div className="inner-book__tags--wrapper">
                  {book.tags &&
                    book.tags.map((tag, i) => (
                      <div key={i} className="inner-book__tag">
                        {tag}
                      </div>
                    ))}
                </div>
                <div className="inner-book__book--description">
                  {book.bookDescription}
                </div>
                <div className="inner-book__secondary--title">
                  About the Author
                </div>
                <div className="inner-book__book--description">
                  {book.authorDescription}
                </div>
              </div>
              <div className="inner-book__img--wrapper">
                <figure className="inner-book__image--wrapper">
                  <img src={book.imageLink} className="inner-book__image" />
                </figure>
                {showAudio && user && book && book.audioLink && (
                  <div className="bottom-audio-player">
                    <audio controls src={book.audioLink}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {listenError && (
                  <div
                    className="listen-error"
                    style={{
                      color: "#d32f2f",
                      marginTop: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {listenError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Book;
