import Friend_request from "./component/friendRequest/Friend-request";
import Home from "./pages/Home";
import Contacts from "./component/contacts/Contacts";
const App =() => {
  return (
    <div className="containers">
      {/* yêu cầu kết bạn */}
      <div>
        <Friend_request />
      </div>
      <div>
       <Contacts />
      </div>
    </div>
  );
}

export default App;
