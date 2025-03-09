import React, { useEffect, useState } from "react";
import Header from "../Header";
import BookCard from "../BookCard";
import Loading from "../Loading";
import "./index.css";
import { replace, useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [totalResults, settotalResults] = useState(null);

  const navigate = useNavigate();

  const { page } = useParams();
  const currentpage = parseInt(page, 10) || 1;

  const onChangeCurrentpagenext = () => {
    const nextPage = currentpage + 1;
    if (nextPage <= Math.ceil(totalResults / 10)) {
      navigate(`/books/${currentpage + 1}`);
    }
  };

  const onChangeCurrentpageprev = () => {
    const prevPage = currentpage - 1;
    if (prevPage > 1) {
      navigate(`/books/${currentpage - 1}`, replace);
    }
  };

  useEffect(() => {
    const getBooksData = async () => {
      setLoading(true);
      try {
        let url;
        if (searchInput !== "") {
          url = `https://api.itbook.store/1.0/search/${searchInput}/${currentpage}`;
        } else {
          url = `https://api.itbook.store/1.0/new`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBooksData(data.books);
          settotalResults(data.total);
          setLoading(false);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching books data", error);
      } finally {
        setLoading(false);
      }
    };

    getBooksData();
  }, [searchInput, currentpage]);

  return (
    <div className="book-store-bg">
      <Header setSearchInput={setSearchInput} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <ul className="books-card">
            {booksData.map((book) => (
              <BookCard bookData={book} key={book.isbn13} />
            ))}
          </ul>
          <div className="button-container">
            <button
              type="button"
              onClick={onChangeCurrentpageprev}
              disabled={currentpage === 0}>
              Prev
            </button>
            <div>
              <span className="current-page">{currentpage}</span>
            </div>
            <button
              type="button"
              onClick={onChangeCurrentpagenext}
              disabled={
                currentpage === Math.ceil(totalResults / booksData.length)
              }>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
