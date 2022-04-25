import StatusCard from "../../../component/admin/StatusCard";
import "./DocManager.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ChartLineDoc from "../../../component/admin/ChartLineDoc";
import { Link } from "react-router-dom";
export default function DocManager() {
  const [alldocument, setAllDocument] = useState([]);
  const [reload, setReLoad] = useState(false);
  const [data, setData] = useState("");
  
  const [del, setDel] = useState(false);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/statistic/newDocs?query=month",
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
  }, [del,reload]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/documents/getall?token=Bearer ${localStorage.getItem(
          "token"
        )}`,
        {}
      )
      .then((res) => {
        setAllDocument(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [reload]);

  const sentApprose = (Doc_id) => {
    axios
      .patch(
        `http://localhost:5000/api/documents/approveone/${Doc_id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert("đã duyệt thành công");
         setReLoad(!reload);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sentUnApprose = (Doc_id) => {
    axios
      .delete(`http://localhost:5000/api/documents/delete/${Doc_id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {},
      })
      .then((res) => {
        alert("đã từ chối");
         setReLoad(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <StatusCard
          color="pink"
          icon="DocumentStore"
          title="Tất cả tài liệu"
          amount={alldocument?.length}
          percentage="3.48"
          percentageIcon="arrow_upward"
          percentageColor="green"
          date="Since last month"
        />
        <StatusCard
          color="yellow"
          icon="DocumentVerified"
          title="Tài liệu đã được duyệt"
          amount="2,356"
          percentage="3.48"
          percentageIcon="arrow_downward"
          percentageColor="red"
          date="Since last week"
        />
        <StatusCard
          color="purple"
          icon="DocumentTime"
          title="Tài liệu chờ duyệt"
          amount="924"
          percentage="1.10"
          percentageIcon="arrow_downward"
          percentageColor="orange"
          date="Since yesterday"
        />
      </div>
      <div className="docChart">
        {data ? (
          <div className="charline">
            <ChartLineDoc data={data} />
          </div>
        ) : (
          ""
        )}

        <div className="approve_container">
          <div className="approve_header">
            <span>Sự kiện chờ duyệt</span>
          </div>
          <div className="approve_content">
            {alldocument?.map((document, index) => {
              if (document.isApproved === true) {
                return;
              }
              return (
                <div className="document_tag" key={index}>
                  <img
                    src={`http://localhost:5000/images/${document?.img}`}
                    className="document_tag_cover"
                  />
                  <p>
                    <Link to={`/docContent/${document._id}`}>
                      {document?.docName}
                    </Link>
                  </p>
                  <div className="author">
                    <b>Tác giả:</b>
                    <span>{document?.userId?.userName}</span>
                  </div>
                  <div className="button_approve_unapprove">
                    <button
                      className="approve"
                      onClick={() => {
                        sentApprose(document?._id);
                      }}
                    >
                      Duyệt
                    </button>
                    <button
                      className="unapprove"
                      onClick={() => {
                        sentUnApprose(document?._id);
                      }}
                    >
                      Từ chuối
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
