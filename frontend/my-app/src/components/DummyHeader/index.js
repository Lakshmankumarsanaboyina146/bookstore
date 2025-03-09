import { replace, useNavigate } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";

const DummyHeader = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", replace);
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

        <div>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DummyHeader;
