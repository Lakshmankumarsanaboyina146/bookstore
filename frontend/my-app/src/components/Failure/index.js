import "./index.css";

const Failure = () => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-view-image"
    />
    <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
    <p className="failure-view-description">
      We cannot seem to find the page you are looking for.
    </p>
    <button type="button" className="retry-button">
      Retry
    </button>
  </div>
);

export default Failure;
