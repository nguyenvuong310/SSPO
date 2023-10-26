import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderId: "",
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.folderId !== prevProps.folderId) {
      this.setState({ folderId: this.props.folderId });
    }
  }
  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleUpload = async () => {
    console.log("File:", this.state.file); // Check if this.state.file is not null
    const formData = new FormData();
    await formData.append("file", this.state.file); // No 'await' needed here

    const url = `${process.env.REACT_APP_API_URL}/drive/uploadFile?folderId=${this.state.folderId}`;

    const { data } = await axios({
      url: url,
      method: "POST",
      data: formData,
      withCredentials: true,
    });

    alert('tHANH CONG ROI')
  };

  render() {
    return (
      <div>
        <input type="file" onChange={(event) => this.handleFileChange(event)} />
        <button onClick={() => this.handleUpload()}>Upload</button>
      </div>
    );
  }
}

export default FileUpload;
