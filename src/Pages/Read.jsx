import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import '../styles/Read.css'

function Read() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };
    fetchBook();
  }, [id]);


  return (
    <div className="main__content">
      <div className="summary">
        <div className="book__summary">
          <div className="book__summary--title">{book?.title}</div>
          <div className="book__summary--text">{book?.summary}</div>
        </div>
      </div>
    </div>
  );
}

export default Read;
