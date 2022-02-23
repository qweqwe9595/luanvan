import Home from "./pages/Home";

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
      <Home></Home>
    </div>
  );
};

export default App;
