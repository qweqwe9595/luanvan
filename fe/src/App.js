import Home from "./pages/Home";
import Login from "./pages/login/Login";

const App = () => {
  const getData = async () => {
    const res = await fetch(
      "http://localhost:5000/api/users/6211bdae8a9e499bf4ff95c1",
      {
        method: "GET",
      }
    );
    return res.json();
  };

  getData().then((data) => console.log(data));

  return (
    <div className="containers">
      <Login></Login>
      {/* <Home></Home> */}
    </div>
  );
};

export default App;
