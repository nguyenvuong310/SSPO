import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UpLoadFile from "./upLoadFIle";
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";

class HomePageStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderId: "",
    };
  }
  componentDidMount() {}
  createFolder = async () => {
    const url = `${process.env.REACT_APP_API_URL}/drive/createFolder`;
    const { data } = await axios.get(url, { withCredentials: true });
    console.log(data);
    if (data && data.errCode === 0) {
      alert("success");
      this.setState({ folderId: data.folderId });
    }
  };
  render() {
    return (
      <>
        <div> toi la student</div>
        <button onClick={() => this.createFolder()}>Create Folder</button>
        <UpLoadFile folderId={this.state.folderId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageStudent);
