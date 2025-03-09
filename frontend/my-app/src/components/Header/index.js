import { replace, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const Header = (props) => {
  const { setSearchInput } = props;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", replace);
  };

  const onChangeSearchInput = (event) => setSearch(event.target.value);

  const onClickSearchButton = () => setSearchInput(search);

  const onChangekeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchInput(search);
    }
  };

  return (
    <header>
      <div className="header">
        <div className="book-logo-container">
          <img
            src="https://thumbs.dreamstime.com/b/hand-book-logo-illustration-art-background-43965136.jpg"
            alt="books logo"
            className="books-logo"
          />
          <h1 className="books-heading">Books Store</h1>
        </div>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search books"
            className="search-input"
            onChange={onChangeSearchInput}
            onKeyDown={onChangekeyDown}
          />
          <button
            type="button"
            className="search-button"
            onClick={onClickSearchButton}>
            Search
          </button>
        </div>
        <div>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="search-container-mobile">
        <input
          type="search"
          placeholder="Search books"
          className="search-input"
          onChange={onChangeSearchInput}
          onKeyDown={onChangekeyDown}
        />
        <button
          type="button"
          className="search-button"
          onClick={onClickSearchButton}>
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
