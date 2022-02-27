import React, { useState } from "react";
import "./SignUp.scss";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FiKey, FiShare2, FiSmile, FiUser } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { BsPeople, BsGenderAmbiguous } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [sex, getSex] = useState("");
  const [error, setError] = useState("");

  const SignUp = () => {
    if (!email.includes("@ctu.edu.vn")) {
      setError("email phai la cua truong dh can tho");
    }
    if (!password === passwordConfirm) {
      setError("password phai giong nhau");
    }
    axios
      .post("http://localhost:5000/api/auth/register", {
        email,
        password,
        sex,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const kiemtra = (e) => {
    if (passwordConfirm !== password) {
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_box">
        {error ? <ErrorBox error={error} /> : ""}
        <div className="signup_tag">
          <div className="logo">
            <img
              src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
              alt="logo"
            ></img>
            <p>Đăng Ký</p>
          </div>
          <div className="input">
            <div className="icon">
              <FiUser></FiUser>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="input">
            <div className="icon">
              <AiOutlineMail></AiOutlineMail>
            </div>
            <input
              type="email"
              placeholder="Email"
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
          <div className="input">
            <div className="icon">
              <FiKey></FiKey>
            </div>
            <input
              type="password"
              placeholder="Password Comfirm"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              onChange={(e) => {
                kiemtra(e);
              }}
            ></input>
          </div>
          <div className="gender_major">
            <div className="input_gender">
              <div className="icon">
                <BsGenderAmbiguous></BsGenderAmbiguous>
              </div>
              <select
                value={sex}
                onChange={(e) => {
                  getSex(e.target.value);
                }}
              >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </div>
            <div className="input_major">
              <div className="icon">
                <VscBook></VscBook>
              </div>
            </div>
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
              SignUp();
            }}
          >
            Log in to your account
          </button>
          <a href="#">Don't have a account?</a>
        </div>

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
      </div>
    </div>
  );
}

const ErrorBox = ({ error }) => {
  return (
    <div style={{ position: "absolute" }}>
      <p style={{ color: "#FF3232" }}>{error}</p>
    </div>
  );
};
export default SignUp;
