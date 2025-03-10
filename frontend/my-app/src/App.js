import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Registration";
import BookDetails from "./components/BookDetails";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <Routes>
    <Route path="/register" element={<Registration />} />
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" index element={<Home />} />
      <Route path="/:page" element={<Home />} />
      <Route path="/bookDetails/:isbn13" element={<BookDetails />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
