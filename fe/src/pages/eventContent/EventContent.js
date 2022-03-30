import React, { useEffect, useState } from "react";
import "./EventContent.scss";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BsPeopleFill, BsSearch } from "react-icons/bs";
import Nav from "../../component/nav/Nav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function EventContent() {
  const param = useParams();
  const [join, setJoin] = useState(false);
  const [events, setEvents] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      // setResult("");
      return;
    }
    axios
      .get(`http://localhost:5000/api/users/search?name=${searchTerm}`)
      .then((res) => {
        setResult(res.data.data);
      })
      .catch((err) => {});
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/events/getOne/${param.id} `,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setEvents(res.data.eventsQuery);
      })
      .catch((err) => {});
  }, []);
  console.log(result);
  return (
    <div className="eventcontent">
      <Nav></Nav>
      <div className="event_header">
        <img
          src={`http://localhost:5000/images/${events.img}`}
          className="cover"
        ></img>
        <div className="time">
          {events?.startTime ? <span>{events.startTime}</span> : "không có"}
        </div>
        <div className="title">
          {events?._id ? <span>{events._id}</span> : "không có"}
        </div>
        <div className="button_event">
          <button
            className="join_event"
            onClick={() => {
              setJoin(!join);
            }}
          >
            {!join ? (
              <div className="join">
                <AiOutlineStar className="icon_join" />
                <span>Tham gia</span>
              </div>
            ) : (
              <div className="join">
                <AiTwotoneStar className="icon_join" />
                <span>Đã tham gia</span>
              </div>
            )}
          </button>
          <button className="invite">
            <span>Mời</span>
          </button>
        </div>
      </div>

      <div className="event_details">
        <div className="details_header">
          <span>Chi tiết sự kiện</span>
        </div>
        <div className="details_people">
          <BsPeopleFill className="icon_event" />
          <span> 1,1k người tham gia sự kiện</span>
        </div>
        <div className="details">
          {events?.desc ? (
            <span>{events.desc}</span>
          ) : (
            <span>chưa thêm nội dung sự kiện nhe bạn</span>
          )}

          {events?.startTime ? (
            <span>{events.startTime}</span>
          ) : (
            <span>chưa thêm thời gian sự kiện nhe bạn ê</span>
          )}
          {events?.location ? <span>Địa điểm: {events.location}</span> : ""}
          {events?.participants ? (
            <span>
              Đối tượng tham gia: {""}
              {events.participants}
            </span>
          ) : (
            ""
          )}
          {/* <span>
            Đối tượng tham gia: Sinh viên chuẩn bị tốt nghiệp và đã tốt nghiệp
            của trường Đại học Cần Thơ và các đối tượng sinh viên khác có nhu
            cầu Xem chi tiết tại:
            <a href="https://scs.ctu.edu.vn/quan-he-doanh-nghiep/hoi-cho-viec-lam/303-hoi-cho-viec-lam-truong-dai-hoc-can-tho-dot-1-nam-2022">
              https://scs.ctu.edu.vn/quan-he-doanh-nghiep/hoi-cho-viec-lam/303-hoi-cho-viec-lam-truong-dai-hoc-can-tho-dot-1-nam-2022
            </a>
          </span> */}
        </div>
      </div>

      <div className="invite_event">
        <span>Khách mời</span>
        <div className="search">
          <BsSearch></BsSearch>
          <input
            type="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
        </div>
        <div className="peoples">
          {result?.map((results, index) => {
            return (
              <div key={index} className="peoples_event_tag ">
                {results?.photos?.avatar?.length === 0 ? (
                  <img
                    className="peoples_avt"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  ></img>
                ) : (
                  <img
                    className="peoples_avt"
                    src={`http://localhost:5000/images/${
                      results?.photos?.avatar[
                        results?.photos?.avatar?.length - 1
                      ]
                    }`}
                  />
                )}
                <span>
                  <Link to={`/profile/${results._id}`}>
                    <span>{results.userName}</span>
                  </Link>
                </span>

                <button>Mời</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default EventContent;
