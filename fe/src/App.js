import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/Profile/Profile";
import "./app.scss";
import UserIntro from "./component/SettingProfile/UserIntro";

const App = () => {
  return (
    <div className="app">
      {/* <UserIntro></UserIntro> */}
      <Profile></Profile>
      {/* <Login></Login> */}
      {/* <SignUp></SignUp> */}
    </div>
  );
};

export default App;
