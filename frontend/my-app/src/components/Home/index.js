import React, { useEffect, useState } from "react";
import Header from "../Header";
import BookCard from "../BookCard";
import Loading from "../Loading";
import "./index.css";
import { replace, useNavigate, useParams } from "react-router-dom";
import Failure from "../Failure";

const apiBookStatusConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Home = () => {
  const [booksData, setBooksData] = useState([]);
  const [apiStatus, setapiStatus] = useState(apiBookStatusConstant.initial);
  const [searchInput, setSearchInput] = useState("");
  const [totalResults, settotalResults] = useState(null);

  const navigate = useNavigate();

  const { page } = useParams();
  const currentpage = parseInt(page, 10) || 1;

  const onChangeCurrentpagenext = () => {
    const nextPage = currentpage + 1;
    if (nextPage <= Math.ceil(totalResults / 10)) {
      navigate(`/${currentpage + 1}`);
    }
  };

  const onChangeCurrentpageprev = () => {
    const prevPage = currentpage - 1;
    if (prevPage > 1) {
      navigate(`/${currentpage - 1}`, replace);
    }
  };

  useEffect(() => {
    const getBooksData = async () => {
      setapiStatus(apiBookStatusConstant.inProgress);
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
          setapiStatus(apiBookStatusConstant.success);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching books data", error);
      }
    };

    getBooksData();
  }, [searchInput, currentpage]);

  const searchResultEmptyview = () => (
    <div className="search-result-empty-container">
      <img
        src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?t=st=1741577543~exp=1741581143~hmac=a9093c91126105145a3864b1a88560390fe24b785fca971a5a8967d42b1cffb7&w=900"
        alt="No result Found"
        className="no-search-image"
      />
      <h1 className="search-result-not-found-heading">
        Search Results are not Found{" "}
      </h1>
      <p className="search-result-desc">Please Try Another search Input</p>
    </div>
  );

  const renderBookDetails = () => {
    return (
      <div>
        {booksData.length === 0 ? (
          searchResultEmptyview()
        ) : (
          <ul className="books-card">
            {booksData.map((book) => (
              <BookCard bookData={book} key={book.isbn13} />
            ))}
          </ul>
        )}
        {(booksData.length !== 0 ||
          apiStatus === apiBookStatusConstant.failure) && (
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
        )}
      </div>
    );
  };

  const renderBookStatus = () => {
    switch (apiStatus) {
      case apiBookStatusConstant.success:
        return <div>{renderBookDetails()}</div>;
      case apiBookStatusConstant.failure:
        return <Failure />;
      case apiBookStatusConstant.inProgress:
        return <Loading />;
      default:
        return null;
    }
  };

  return (
    <div className="book-store-bg">
      <Header setSearchInput={setSearchInput} />
      {renderBookStatus()}
    </div>
  );
};

export default Home;
