import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Header from "./components/Header";
import Footer from "./pages/Footer/Footer";
import SingleBlogList from "./components/SingleBlogList";
import CreatePost from "./pages/CreatePost/CreatePost";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<ResetPassword />} />
        <Route path="/blog/:id" element={<SingleBlogList />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
