import StatusCard from "../../component/admin/StatusCard";
import React , { useState ,useEffect} from "react";
import axios from "axios";
function Setting() {
  const [eventDetails, setEventDetails] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/events/all",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setEventDetails(res.data.eventsQuery.reverse());
      })
      .catch((err) => {
      });
  }, []);
  console.log(eventDetails);
  return (
    <>     
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <StatusCard
              color="orange"
              icon="clocks"
              title="New Users"
              amount="2,356"
              percentage="3.48"
              percentageIcon="arrow_downward"
              percentageColor="red"
              date="Since last week"
            />
            <StatusCard
              color="purple"
              icon="paid"
              title="Sales"
              amount="924"
              percentage="1.10"
              percentageIcon="arrow_downward"
              percentageColor="orange"
              date="Since yesterday"
            />
          </div>
        
      
    </>
  );
}
export default Setting;
