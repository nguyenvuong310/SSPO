import React, { Component } from "react";
import { connect } from "react-redux";
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import "./Login.scss";
import axios from "axios";
import bk_logo from "../../assets/bk_logo.png";
// import adminService from "../services/adminService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  async componentDidMount() {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      const user = data.user._json;
      this.setState({
        userName: user.email,
        password: user.name,
      });
    } catch (err) {
      console.log(err);
    }
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  handleAuth = (role) => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google?role=${role}`,
      "_self"
    );
  };

  render() {
    return (
      <>
        <div className="home-background">
          <div className="home-container">
            <div className="home-content">
              <div className="logoBK">
                <img src={bk_logo} className="logobk"></img>
              </div>
              <div class="login-divider"></div>
              <div className="login-iden">
                <h2 class="login-heading">Log in for</h2>
                <div
                  className="btn btn-block login-with"
                  onClick={() => this.handleAuth("student")}
                >
                  Student Of HCMUT
                </div>
                <div
                  className="btn btn-block login-with"
                  onClick={() => this.handleAuth("officer")}
                >
                  Smart Printing Officer
                </div>
              </div>
              <div class="login-divider"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),
    // // userLoginFail: () => dispatch(actions.adminLoginFail()),
    // userLoginSuccess: (userInfor) => dispatch(userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
