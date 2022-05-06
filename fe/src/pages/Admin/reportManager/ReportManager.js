import StatusCard from "../../../component/admin/StatusCard";
import "./reportManager.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChartLineReport from "../../../component/admin/ChartLineReport";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Post from "../../../component/post/Post";

function ReportManager() {
  const [reportDetails, setReportDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [del, setDel] = useState(false);
  const [post, setPost] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/statistic/newReports?query=month",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, [open, del]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reports/getall?token=Bearer `+ localStorage.getItem("token"))
      .then((res) => {
        setReportDetails(res.data.reverse());
      })
      .catch((err) => {});
  }, [open, data]);

  const xoaReport = (reportI) => {
    axios
      .delete(`http://localhost:5000/api/reports/delete/${reportI}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },      
      })
      .then((res) => {
        alert("đã xóa thành công");
        setData((prev) => !prev);
        setDel(!del);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPost = (postId) =>{
    axios.get(`http://localhost:5000/api/posts/${postId}`)
    .then((res) => {
      setPost(res.data.post);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  console.log(reportDetails);
  return (
    <>
      <div className="report_manager">
        <div className="report_manager_left">
          <div className="grid grid-cols-1">
            <StatusCard
              color="pink"
              icon="reports"
              title="Tất cả báo cáo"
              amount={reportDetails?.length}
            />
          </div>
          {data ? (
            <div className="charline">
              <ChartLineReport data={data} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="report_manager_content">
          <div className="report_manager_content_header">
            <span>Danh sách các báo cáo</span>
          </div>
          <div className="center_reports">
          {reportDetails?.map((reportI, index) => {
            return (              
              <div className="report_tags" key={index}>
                <Link to={`/profile/${reportI?.userId?._id}`}>
                  <div className="report-avatar">
                    <img src={`http://localhost:5000/images/${reportI?.userId?.photos?.avatar[0]}`}></img>
                  </div>
                </Link>
                <div className="report-content">
                  <div className="report-meta">
                  <Link to={`/profile/${reportI?.userId?._id}`}>
                  <p className="report-username">{reportI.userId.userName}</p>
                  </Link>
                  <p className="report-time">{new Date(reportI.createdAt).toLocaleDateString("vi-VN")}</p>  
                  </div>
                  
                <div className="report-text">
                <div className="report-message">
                    <p>{reportI.reportMessage}--<span onClick={() => {getPost(reportI.link);setShowModal(!showModal)}}>Xem chi tiết</span></p>                    
                  </div>     
                  <div className="report-delete">
                  <p
                        onClick={() => {
                          xoaReport(reportI._id);
                        }}
                      >
                        Xóa báo cáo
                    </p>    
                  </div>       
                    
                </div>
                </div>     
                
                <Modal size="regular" active={showModal} toggler={() => setShowModal(false)}>
                  <ModalHeader toggler={() => setShowModal(false)}>
                      Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <Post
                      postInfo={post}
                      setRefreshPosts={setRefreshPosts}
                    ></Post>
                  </ModalBody>
                  <ModalFooter>
                      <Button 
                          color="red"
                          buttonType="link"
                          onClick={(e) => setShowModal(false)}
                          ripple="dark"
                      >
                          Close
                      </Button>

                      <Button
                          color="green"
                          onClick={(e) => setShowModal(false)}
                          ripple="light"
                      >
                          Save Changes
                      </Button>
                  </ModalFooter>
                </Modal>
                
              </div>
            );
          })}
        </div>
        </div>
        
      </div>
    </>
  );
}
export default ReportManager;
