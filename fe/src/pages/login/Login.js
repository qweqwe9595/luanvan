import React, { useState } from "react";
import "./Login.scss";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FiKey, FiShare2, FiSmile } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data === "invalid") {
          console.log("sai tai khoan mat khau");
        } else {
          //dang nhap thanh cong chuyen huong den trang chu
          //luu du lieu vao cookies
          console.log(res.data);
          console.log("thanh cong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login_container">
      <div className="login_box">
        <div className="join_us">
          <p>Join us</p>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <FiShare2></FiShare2>
            </div>
            <div className="join_us_tag_right">
              <h3>Share your story</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BiMessage></BiMessage>
            </div>
            <div className="join_us_tag_right">
              <h3>Comment</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BsPeople></BsPeople>
            </div>
            <div className="join_us_tag_right">
              <h3>Connect</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>

          <div className="join_us_smile">
            <div className="join_us_icon">
              <FiSmile></FiSmile>
            </div>
            <div className="join_us_tag_right">
              <h3>Be better</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
        </div>

        <div className="login_tag">
          <div className="logo">
            <img
              src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
              alt="logo"
            ></img>
            <p>Đăng Nhập</p>
          </div>
          <div className="input">
            <div className="icon">
              <AiOutlineUser></AiOutlineUser>
            </div>
            <input
              type="email"
              placeholder="Email or username"
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
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="Remember_forget_pass">
            <div className="Remember_pass">
              <input type="checkbox"></input>
              <p>Remember</p>
            </div>
            <div className="forget_pass">
              <a href="#">Foget password?</a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              login();
            }}
          >
            Log in to your account
          </button>
          <a href="#">Don't have a account?</a>
        </div>
      </div>
    </div>
  );
}
export default Login;
