import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  returnToHome = () => {
    this.props.history.push(`/home`);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        {/* {console.log("props", this.props)} */}
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="Header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-center-content">
                <div>
                  <b>text</b>
                </div>
                <div>text</div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div>Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-center-content">
                <div>
                  <b> text</b>
                </div>
                <div>text</div>
              </div>
              <div className="child-center-content">
                <div>
                  <b>text</b>
                </div>
                <div> text</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle">text</i>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  //props
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (languageInput) =>
      dispatch(changeLanguageApp(languageInput)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
