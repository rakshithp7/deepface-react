import React, { Component } from "react";
import axios from "axios";

class Analyze extends Component {
  state = {
    result: "false",
    selectedFile: null,
    uploadedImageSrc: null,
    data: null,
    emotion: null,
  };

  onFileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });

    var reader = new FileReader();

    reader.onload = () => {
      this.setState({
        uploadedImageSrc: reader.result,
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  analyzedData = () => {
    if (this.state.result == "completed") {
      return (
        <div>
          <h2>Analysis Complete</h2>
          <p>Age: {parseInt(this.state.data["age"])}</p>
          <p>Gender: {this.state.data["gender"]}</p>
          <p>Emotion: {this.state.data["dominant_emotion"]}</p>
          <p>Race: {this.state.data["dominant_race"]}</p>
        </div>
      );
    } else if (this.state.result == "analyzing") {
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
          }}
        >
          <h2>Analyzing</h2>
          <div className="ml-2 loader"></div>
        </div>
      );
    }
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>
            File Size:{" "}
            {parseFloat(this.state.selectedFile.size / 1024).toFixed(2)} kb
          </p>
          <img
            src={this.state.uploadedImageSrc}
            alt=""
            style={{
              maxWidth: "400px",
              maxHeight: "400px",
            }}
          ></img>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Please upload an image to analyze</h4>
        </div>
      );
    }
  };

  analyzeImage = () => {
    const data = {
      img: [`${this.state.uploadedImageSrc}`],
    };

    this.setState({
      result: "analyzing",
    });

    axios
      .post("http://127.0.0.1:5000/analyze", data)
      .then((res) => {
        this.setState({
          result: "completed",
          data: res.data["instance_1"],
          emotion: res.data["instance_1"]["dominant_emotion"],
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          result: "false",
        });
      });
  };

  displayEmotion = () => {
    if (this.state.emotion) {
      return <h1>{this.state.emotion}</h1>;
    } else {
      return;
    }
  };

  render() {
    return (
      <div
        className="container row"
        style={{
          margin: "auto",
        }}
      >
        <div className="col-6" style={{ marginTop: "30px" }}>
          <label htmlFor="analyzeImage">Upload an Image</label>
          <br />
          <input
            type="file"
            id="analyzeImage"
            accept="image/*"
            onChange={this.onFileChange}
          />
          <button
            className="btn btn-primary"
            onClick={this.analyzeImage}
            disabled={
              !this.state.selectedFile || this.state.result === "analyzing"
                ? 1
                : 0
            }
          >
            Analyze Image
          </button>

          {this.fileData()}
          {this.analyzedData()}
        </div>
        <div className="col-6">{this.displayEmotion()}</div>
      </div>
    );
  }
}

export default Analyze;
