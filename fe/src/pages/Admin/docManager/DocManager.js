import StatusCard from "../../../component/admin/StatusCard";
import "./DocManager.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ChartLineDoc from "../../../component/admin/ChartLineDoc";
import { Link } from "react-router-dom";
export default function DocManager() {
  const [alldocument, setAllDocument] = useState([]);
  const [filterDocument, setFilterDocument] = useState([]);
  const [reload, setReLoad] = useState(false);
  const [data, setData] = useState("");
  const [del, setDel] = useState(false);
  const [approved, setApproved] = useState();
  const [pending, setPending] = useState();

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
  }, [del, reload]);

  //tài liệu đã được duyệt
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/statistic/approvedDocs?query=month",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setApproved(Object.values(res.data).reduce((a, b) => a + b, 0));
      })
      .catch((err) => {});
  }, [del, reload]);
  //tất cả tài liệu
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
        if (filterDocument.length !== 0) return;
        setFilterDocument(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [reload]);
  //tài liệu chưa được duyệt
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/statistic/pendingDocs?query=month",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setPending(Object.values(res.data).reduce((a, b) => a + b, 0));
      })
      .catch((err) => {});
  }, [del, reload]);
  //duyệt tài liệu
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
        setFilterDocument(filterDocument.filter((item) => item._id !== Doc_id));
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

  const filterDocs = (filterText) => {
    switch (filterText) {
      case `all`: {
        setFilterDocument(alldocument);
        break;
      }
      case `aprroved`: {
        setFilterDocument(
          alldocument.filter((item, index) => {
            return item.isApproved === true;
          })
        );
        break;
      }
      case `pending`: {
        setFilterDocument(
          alldocument.filter((item, index) => {
            console.log(item.isApproved);
            return item.isApproved === false;
          })
        );
        break;
      }
      default: {
        return setFilterDocument(alldocument);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <StatusCard
          color="pink"
          icon="assignment"
          title="Tất cả tài liệu"
          amount={alldocument?.length}
          percentage="3.48"
          percentageIcon="arrow_upward"
          percentageColor="green"
          date="Since last month"
        />
        <StatusCard
          color="yellow"
          icon="assignment_turned_in"
          title="Tài liệu đã được duyệt"
          amount={approved}
          percentage="3.48"
          percentageIcon="arrow_downward"
          percentageColor="red"
          date="Since last week"
        />
        <StatusCard
          color="purple"
          icon="pending_actions"
          title="Tài liệu chờ duyệt"
          amount={pending}
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
            <select
              onChange={(e) => {
                filterDocs(e.target.value);
              }}
            >
              <option value={`all`}>Tất cả tài liệu</option>
              <option value={`pending`}>Tài liệu chờ duyệt</option>
              <option value={`aprroved`}>Tài liệu đã được duyệt</option>
            </select>
          </div>
          <div className="approve_content">
            {filterDocument?.map((document, index) => {
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
                  {document.isApproved===true ? (
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
                  ) : (
                      <div className="button_approve_unapprove">
                    {/* <button
                      className="approve"
                      // onClick={() => {
                      //   sentApprose(document?._id);
                      // }}
                    >
                      
                    </button> */}
                    <button
                      className="approve"
                      onClick={() => {
                        sentUnApprose(document?._id);
                      }}
                    >
                      Xóa tài liệu
                    </button>
                  </div>
                  )}
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
