import "./index.css";

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="page-not-found-heading">Page Not Found</h1>
    <p className="page-not-found-description">
      We are sorry, the page you request not found
    </p>
  </div>
);

export default NotFound;
