import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import AppNavbar from "../components/navbar/AppNavbar";
import Details from "../pages/Details";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import Update from "../pages/Update";

const AppRouter = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<PrivateRouter />}>
          <Route path="" element={<Details />} />
        </Route>
        <Route path="/profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/newblog" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />} />
        </Route>
        <Route path="/update/:id" element={<PrivateRouter />}>
          <Route path="" element={<Update />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default AppRouter;
