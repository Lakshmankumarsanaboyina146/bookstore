import { Link } from "react-router-dom";

import "./index.css";
/*
const BookCard = (props) => {
  const { bookData } = props;
  const { isbn13,title, image } = bookData;
  return (
    <li className="card-container">
      <Link to={`/bookDetails/${isbn13}`} className="link-item">
        <img src={image} alt={title} className="image-card" />
        <h1 className="title">{title}</h1>
      </Link>
    </li>
  );
};
*/

const BookCard = (props) => {
  const { bookData } = props;
  const { image, price, title, isbn13 } = bookData;
  return (
    <li className="card">
      <Link to={`/bookDetails/${isbn13}`} className="link-item">
        <div className="card-content">
          <img src={image} alt={title} className="image-card" />
          <h3>{title}</h3>
          <p className="price">{price}</p>
        </div>
        <div className="add-to-cart">Add to cart</div>
      </Link>
    </li>
  );
};

export default BookCard;
