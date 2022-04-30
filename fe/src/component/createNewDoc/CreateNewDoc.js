import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { BsImage } from "react-icons/bs";
import { UserContext } from "../../context/userContext";
import "./CreateNewDoc.scss";
function CreateNewDoc({ setOpenCreateDoc }) {
  const [fileImg, setFileImg] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [user] = useContext(UserContext);
  const [desc, setDesc] = useState("");
  const [docName, setDocName] = useState("");
  const newDoc = () => {
    var formData = new FormData();
    formData.append("userId", user?._id);
    formData.append("docName", docName);
    formData.append("desc", desc);
    formData.append("docFile", file);
    formData.append("docFile", fileImg);
    axios
      .post(`http://localhost:5000/api/documents/createone`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Đăng tài liệu thành công! vui lòng chờ admin duyệt");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="show_create_doc"
        onClick={() => setOpenCreateDoc(false)}
      ></div>
      <div className="create_new_doc">
        <div className="exit">
          <button onClick={() => setOpenCreateDoc(false)}>X</button>
        </div>

        <div className="create_new_doc_image">
          {previewURL ? (
            <img src={previewURL} alt=""></img>
          ) : (
            <BsImage className="icon_img"></BsImage>
          )}
        </div>
        <div className="choose_file">
          <input
            type="file"
            accept="image/*"
            id="file_img"
            onChange={function (e) {
              if (e.target.files[0]) {
                setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                setFileImg(e.target.files[0]);
              }
            }}
          ></input>
          <div className="file_choose_img">
            <label htmlFor="file_img">Chọn ảnh</label>
          </div>
        </div>

        <div className="create_new_doc_body">
          <input
            className="create-new_doc_body_item_docName"
            type="text"
            placeholder="Tiêu đề tài liệu"
          ></input>

          <textarea
            className="create-new_doc_body_item_desc"
            type="text"
            placeholder="Nội dung"
          ></textarea>

          <div className="create-new_doc_body_item_file">
            <div className="file_content">
              {file ? <div className="file_doc_name">{file?.name}</div> : ""}
            </div>
            <div className="file_doc">
              <input
                type="file"
                id="file"
                accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                onChange={function (e) {
                  if (e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              ></input>
              <div className="file_choose">
                <label htmlFor="file">Chọn file</label>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_doc">
          <button
            onClick={() => {
              newDoc();
            }}
          >
            Đăng tài liệu
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateNewDoc;
