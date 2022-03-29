import React from "react";
import "./EventContent.scss";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BsPeopleFill, BsSearch } from "react-icons/bs";
import Nav from "../../component/nav/Nav";
function EventContent() {
  return (
    <div className="eventcontent">
      <Nav></Nav>
      <div className="event_header">
        <img
          src="https://wecheckin.vn/wp-content/uploads/2019/12/dia-chi-chua-tam-chuc-wecheckin-1.jpg"
          className="cover"
        ></img>
        <div className="time">
          <span>Hôm nay vào 19:30</span>
        </div>
        <div className="title">
          <span>hội chợ việc làm cho sinh viên đợt 1 2022</span>
        </div>
        <div className="button_event">
          <button className="join_event">
            <div className="join">
              <AiOutlineStar />
              <span>Tham gia</span>
            </div>
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
          <span>
            Nhằm giúp các em sinh viên có nhiều cơ hội tìm được việc làm phù
            hợp, Trung tâm Tư vấn Hỗ trợ Khởi nghiệp sinh viên tổ chức phiên hội
            chợ việc làm đợt 1 năm 2022:
          </span>

          <span>-Thời gian: từ 7g30 đến 12g00 Chủ nhật, ngày 27/3/2022.</span>

          <span>
            Địa điểm: Khu vực Đoàn Thanh niên trường Đại học Cần Thơ, Khu 2,
            Đường 3/2, Phường Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.
          </span>

          <span>
            Đối tượng tham gia: Sinh viên chuẩn bị tốt nghiệp và đã tốt nghiệp
            của trường Đại học Cần Thơ và các đối tượng sinh viên khác có nhu
            cầu Xem chi tiết tại:
            <a href="https://scs.ctu.edu.vn/quan-he-doanh-nghiep/hoi-cho-viec-lam/303-hoi-cho-viec-lam-truong-dai-hoc-can-tho-dot-1-nam-2022">
              https://scs.ctu.edu.vn/quan-he-doanh-nghiep/hoi-cho-viec-lam/303-hoi-cho-viec-lam-truong-dai-hoc-can-tho-dot-1-nam-2022
            </a>
          </span>
        </div>
      </div>

      <div className="invite_event">
        <span>Khách mời</span>
        <div className="search">
          <BsSearch></BsSearch>
          <input type="search"></input>
        </div>
        <div className="peoples">
          <div className="peoples_event_tag ">
            <img
              className="peoples_avt"
              src="https://img.wattpad.com/b06c50cf344a91d0ec5085ecb3804265966c49a1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f2d32765553516349596e477572773d3d2d3937353033343232342e313634333533613432613935613237633438353930303737323033332e706e67?s=fit&w=720&h=720"
            ></img>
            <span>Nguyễn Văn A</span>
            <button>Mời</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventContent;
