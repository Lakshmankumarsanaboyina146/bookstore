import Loader from "react-js-loader";
import "./index.css";

const Loading = () => {
  return (
    <div className="loader-container">
      <Loader
        type="spinner-circle"
        bgColor="#e65529"
        color="#e65529"
        title={"Loading"}
        size={100}
      />
    </div>
  );
};

export default Loading;
