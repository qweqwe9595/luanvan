import StatusCard from "../../component/admin/StatusCard";
import ChartLine from "../../component/admin/ChartLine";
import ChartBar from "../../component/admin/ChartBar";
import PageVisitsCard from "../../component/admin/PageVisitsCard";
import TrafficCard from "../../component/admin/TrafficCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [newUser, setNewUser] = useState({});
  const [newPost, setNewPost] = useState({});
  const [newEvent, setNewEvent] = useState({});
  const [newJob, setNewJob] = useState({});
  const [newDoc, setNewDoc] = useState({});
  const [newReport, setNewReport] = useState({});

  useEffect(() => {
    const countNewUser = () => {
      axios
        .get("http://localhost:5000/api/statistic/newposts?query=month")
        .then((res) => {
          setNewUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewUser();
    const countNewPost = () => {
      axios
        .get("http://localhost:5000/api/statistic/newposts?query=month")
        .then((res) => {
          setNewPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countNewPost();
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
  }, []);

  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <ChartLine newUser={newUser} />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <ChartBar newPost={newPost} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
            <StatusCard
              color="pink"
              icon="event"
              title="Sự kiện"
              amount={newEvent[`thang 4`]}
              percentage={newEvent[`thang 3`]}
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="So với tháng trước"
            />
            <StatusCard
              color="orange"
              icon="groups"
              title="Tuyển dụng"
              amount={newJob[`thang 4`]}
              percentage={newJob[`thang 3`]}
              percentageIcon="arrow_upward"
              percentageColor="red"
              date="So với tháng trước"
            />
            <StatusCard
              color="purple"
              icon="paid"
              title="Tài liệu"
              amount={newDoc[`thang 4`]}
              percentage={newDoc[`thang 3`]}
              percentageIcon="arrow_upward"
              percentageColor="orange"
              date="So với tháng trước"
            />
            <StatusCard
              color="blue"
              icon="poll"
              title="Báo cáo"
              amount={newReport[`thang 4`]}
              percentage={newReport[`thang 4`]}
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="So với tháng trước"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto">
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
      </div>
    </>
  );
}
