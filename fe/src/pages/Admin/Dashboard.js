import StatusCardDashBoard from "../../component/admin/StatusCardDashBoard";
import ChartLineNewUser from "../../component/admin/ChartLineNewUser";
import ChartBarNewPost from "../../component/admin/ChartBarNewPost";
import PageVisitsCard from "../../component/admin/PageVisitsCard";
import TrafficCard from "../../component/admin/TrafficCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [newEvent, setNewEvent] = useState({});
  const [newJob, setNewJob] = useState({});
  const [newDoc, setNewDoc] = useState({});
  const [newReport, setNewReport] = useState({});
  const [newOnline, setNewOnline] = useState({});

  useEffect(() => {
    const countNewEvent = () => {
      axios
        .get("http://localhost:5000/api/statistic/newEvents?query=month")
        .then((res) => {
          setNewEvent(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewEvent();
    const countNewJob = () => {
      axios
        .get("http://localhost:5000/api/statistic/newJobs?query=month")
        .then((res) => {
          setNewJob(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewJob();
    const countNewDoc = () => {
      axios
        .get("http://localhost:5000/api/statistic/newDocs?query=month")
        .then((res) => {
          setNewDoc(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewDoc();
    const countNewReport = () => {
      axios
        .get("http://localhost:5000/api/statistic/newDocs?query=month")
        .then((res) => {
          setNewReport(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewReport();
    const countNewOnline = () => {
      axios
        .get("http://localhost:5000/api/statistic/onlineToday")
        .then((res) => {
          setNewOnline(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewOnline();
  }, []);

  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-80" />
      <div className="px-3 md:px-8 -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <ChartLineNewUser />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <ChartBarNewPost />
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 mb-4">
            <StatusCardDashBoard
              color="green"
              icon="report"
              title="Người đăng nhập hôm nay"
              amount={newOnline[Object.keys(newOnline)[0]]}
            />
            {newEvent[Object.keys(newEvent)[0]] >
            newEvent[Object.keys(newEvent)[1]] ? (
              <StatusCardDashBoard
                color="red"
                icon="event"
                title="Sự kiện"
                amount={newEvent[Object.keys(newEvent)[0]]}
                percentage={
                  newEvent[Object.keys(newEvent)[0]] -
                  newEvent[Object.keys(newEvent)[1]]
                }
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="So với tháng trước"
              />
            ) : (
              <StatusCardDashBoard
                color="red"
                icon="event"
                title="Sự kiện"
                amount={newEvent[Object.keys(newEvent)[0]]}
                percentage={
                  newEvent[Object.keys(newEvent)[1]] -
                  newEvent[Object.keys(newEvent)[0]]
                }
                percentageIcon="arrow_lowward"
                percentageColor="red"
                date="So với tháng trước"
              />
            )}
            {newJob[Object.keys(newJob)[0]] > newJob[Object.keys(newJob)[1]] ? (
              <StatusCardDashBoard
                color="blue"
                icon="work"
                title="Tuyển dụng"
                amount={newJob[Object.keys(newJob)[0]]}
                percentage={
                  newJob[Object.keys(newJob)[0]] -
                  newJob[Object.keys(newJob)[1]]
                }
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="So với tháng trước"
              />
            ) : (
              <StatusCardDashBoard
                color="blue"
                icon="work"
                title="Tuyển dụng"
                amount={newJob[Object.keys(newJob)[0]]}
                percentage={
                  newJob[Object.keys(newJob)[1]] -
                  newJob[Object.keys(newJob)[0]]
                }
                percentageIcon="arrow_lowward"
                percentageColor="red"
                date="So với tháng trước"
              />
            )}
            {newDoc[Object.keys(newDoc)[0]] > newDoc[Object.keys(newDoc)[1]] ? (
              <StatusCardDashBoard
                color="yellow"
                icon="source"
                title="Tài liệu"
                amount={newDoc[Object.keys(newDoc)[0]]}
                percentage={
                  newDoc[Object.keys(newDoc)[0]] -
                  newDoc[Object.keys(newDoc)[1]]
                }
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="So với tháng trước"
              />
            ) : (
              <StatusCardDashBoard
                color="yellow"
                icon="source"
                title="Tài liệu"
                amount={newDoc[Object.keys(newDoc)[0]]}
                percentage={
                  newDoc[Object.keys(newDoc)[1]] -
                  newDoc[Object.keys(newDoc)[0]]
                }
                percentageIcon="arrow_lowward"
                percentageColor="red"
                date="So với tháng trước"
              />
            )}
            {newReport[Object.keys(newReport)[0]] >
            newReport[Object.keys(newReport)[1]] ? (
              <StatusCardDashBoard
                color="green"
                icon="report"
                title="Báo cáo"
                amount={newReport[Object.keys(newReport)[0]]}
                percentage={
                  newReport[Object.keys(newReport)[0]] -
                  newReport[Object.keys(newReport)[1]]
                }
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="So với tháng trước"
              />
            ) : (
              <StatusCardDashBoard
                color="green"
                icon="report"
                title="Báo cáo"
                amount={newReport[Object.keys(newReport)[0]]}
                percentage={
                  newReport[Object.keys(newReport)[1]] -
                  newReport[Object.keys(newReport)[0]]
                }
                percentageIcon="arrow_lowward"
                percentageColor="red"
                date="So với tháng trước"
              />
            )}
          </div>
        </div>
      </div>

      {/* <div className="px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <PageVisitsCard />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <TrafficCard />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
