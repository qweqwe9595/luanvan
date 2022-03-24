import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/Profile/Profile";
import "./app.scss";
import { Routes, Route } from "react-router-dom";
import SearchResults from "./pages/searchResults/SearchResults";
import Friend from "./pages/friends/Friend";
import { useEffect, useState } from "react";
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);
  return (
    <div className="app">
      {token ? (
        <Routes>
          <Route path="/profile/:userId" element={<Profile />}></Route>
          <Route path="/searchresult" element={<SearchResults />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/friend" element={<Friend />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<Login />}></Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
