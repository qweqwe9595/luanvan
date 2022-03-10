import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/Profile/Profile";
import "./app.scss";
import SearchResults from "./pages/searchResults/SearchResults";
const App = () => {
  return (
    <div className="app">
      {/* <Profile></Profile> */}
      {/* <Login></Login> */}
      {/* <SignUp></SignUp> */}
      {/* <Home></Home> */}
      <SearchResults></SearchResults>
    </div>
  );
};

export default App;
