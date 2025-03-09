import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DummyHeader from "../DummyHeader";
import "./index.css";

const BookDetails = () => {
  const [bookDetails, setbookDetails] = useState({});
  const {
    author,
    desc,
    language,
    pages,
    price,
    publisher,
    subtitle,
    title,
    year,
    image,
  } = bookDetails;
  const { isbn13 } = useParams();
  useEffect(() => {
    const getBookDetailsbyId = async () => {
      let url = `https://api.itbook.store/1.0/books/${isbn13}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setbookDetails(data);
      }
    };
    getBookDetailsbyId();
  }, [isbn13]);
  console.log(bookDetails);
  return (
    <>
      <DummyHeader />
      <div className="bookstore-details-bg">
        <div className="book-image-card">
          <img src={image} alt={title} className="book-image" />
        </div>
        <div className="description-and-items-container">
          <div className="desc-card">
            <p className="desc">{desc}</p>
            <ul className="list-items">
              <li>Title : {title}</li>
              <li>SubTitle : {subtitle}</li>
              <li>Author : {author}</li>
              <li>Language : {language}</li>
              <li>Price : {price}</li>
              <li>No of pages : {pages}</li>
              <li>publisher : {publisher}</li>
              <li>Year : {year}</li>
            </ul>
            <div>
              <button type="button" className="cart">
                Add to Cart
              </button>
              <button type="button" className="buy-now">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
