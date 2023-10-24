import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";

class HomePageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <>
        <div> toi la admin</div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageAdmin);
