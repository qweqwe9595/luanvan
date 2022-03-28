import React, { useState } from "react";
import "./Event.scss";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import Nav from "../../component/nav/Nav";

function Event() {
  const [join, setJoin] = useState(false);
  return (
    <div className="event_container">
      <Nav></Nav>
      <div className="left_event">
        <span>SỰ KIỆN SẮP DIỄN RA</span>
        <hr></hr>
      </div>
      <div className="center_event">
        <div className="event_tag">
          <img
            src="https://i.vietgiaitri.com/2020/5/27/hon-son---dao-nho-it-nguoi-biet-o-kien-giang-b5e-4964599.jpg"
            className="cover"
          ></img>
          <div className="time">
            <span>Thứ 7, 2 Tháng 5 vào lúc 14:30</span>
          </div>
          <div className="title">
            <span>hội chợ việc làm cho sinh viên đợt 1 2022</span>
          </div>
          <div className="button_join">
        <button onClick={() => {
                  setJoin(!join);          
            }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default Event;
