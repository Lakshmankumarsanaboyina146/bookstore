import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Registration";
import BookDetails from "./components/BookDetails";

const App = () => (
  <Routes>
    <Route path="/register" element={<Registration />} />
    <Route path="/login" element={<Login />} />
    <Route path="/books/:page" element={<Home />} />
    <Route path="/books" element={<Home />} />
    <Route path="/bookDetails/:isbn13" element={<BookDetails />} />
  </Routes>
);

// const App = () => <BookDetails />;
export default App;
