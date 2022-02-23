import React from "react";
import "./Login.scss";
import { AiOutlineMail,AiOutlineUser } from 'react-icons/ai';
import { FiKey,FiShare2,FiSmile } from 'react-icons/fi';
import { BiMessage } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
function Login() {
    return (
        <div className="login_container">
            <div className="login-mobile">
                <div className="logo">
                        <img src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
                                alt="logo" width={'80px'}></img>
                        <p>Log In</p>
                    </div>
                    <div className="input_email">
                        <div className="email_icon">
                            <AiOutlineMail></AiOutlineMail>
                        </div>
                        <input type="email" placeholder="Email or username"></input>
                    </div>
                    <div className="input_password">
                        <div className="password_icon">
                            <FiKey ></FiKey>
                        </div>
                        <input type="password" placeholder="Password"></input>
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
                    <button type="button">Sign in your account</button>
                    <a href="#">Already have an account?</a>
            </div>
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
                        <img src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
                                alt="logo" width={'80px'}></img>
                        <p>Welcome</p>
                    </div>
                    <div className="input_email">
                        <div className="email_icon">
                            <AiOutlineUser></AiOutlineUser>
                        </div>
                        <input type="email" placeholder="Email or username"></input>
                    </div>
                    <div className="input_password">
                        <div className="password_icon">
                            <FiKey ></FiKey>
                        </div>
                        <input type="password" placeholder="Password"></input>
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
                    <button type="button">Log in to  your account</button>
                    <a href="#">Don't have a account?</a>
                   
                </div>
            </div>


        </div>
    );
}
export default Login;