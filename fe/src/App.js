import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/Profile/Profile";
import "./app.scss";
import { Routes, Route } from "react-router-dom";
import SearchResults from "./pages/searchResults/SearchResults";
import Friend from "./pages/friends/Friend";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile/:userId" element={<Profile />}></Route>
        <Route path="/searchresult" element={<SearchResults />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/friend" element={<Friend />}></Route>
      </Routes>
    </div>
  );
};

export default App;
