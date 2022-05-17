import React, { useState } from "react";
import "./Login.scss";
import { AiOutlineUser } from "react-icons/ai";
import { FiKey, FiShare2, FiBookOpen } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const login = () => {
    if (email === "" || password === "") {
      return alert("vui lòng nhập đầy đủ thông tin");
    }
    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data === "sai tai khoan") {
          alert("sai tài khoản mật khẩu!");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userID", res.data.userInfo._id);
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          console.log(JSON.parse(localStorage.getItem("userInfo")));
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="login_container">
      <div className="login_box">
        <div className="join_us">
          <p>Tham gia ngay</p>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <FiShare2></FiShare2>
            </div>
            <div>
              <h3>Chia sẻ câu chuyện của bạn.</h3>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BiMessage></BiMessage>
            </div>
            <div>
              <h3>Tương tác với mọi người.</h3>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BsPeople></BsPeople>
            </div>
            <div>
              <h3>Kết bạn và trò chuyện.</h3>
            </div>
          </div>

          <div className="join_us_tag">
            <div className="join_us_icon">
              <FiBookOpen></FiBookOpen>
            </div>
            <div>
              <h3>Hỗ trợ học tập</h3>
            </div>
          </div>
        </div>

        <div className="login_tag">
          <div className="logo">
            <img
              src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
              alt="logo"
            ></img>
            <p>Đăng nhập</p>
          </div>
          <div className="input">
            <div className="icon">
              <AiOutlineUser></AiOutlineUser>
            </div>
            <input
              type="email"
              placeholder="Tên đăng nhập"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input">
            <div className="icon">
              <FiKey></FiKey>
            </div>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="Remember_forget_pass">
            <div className="Remember_pass">
              <input type="checkbox"></input>
              <p>Nhớ tài khoản</p>
            </div>
            <div className="forget_pass">
              <a href="#">Quên mật khẩu?</a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              login();
            }}
          >
            <p>Đăng nhập</p>
          </button>
          <Link to="/signup">
            <p class="link-register">Bạn không có tài khoản?<b> Tạo ngay.</b></p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
