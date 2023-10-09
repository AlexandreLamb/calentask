import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import api from "../axiosConfig";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function defineColor(key) {
  var color = 0;
  if (key === 0) color = 1;
  else if (key === 15) color = 2;
  else if (key === 30) color = 3;
  else if (key === 45) color = 4;
  return color;
}
export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: {},
      backColor: [
        "white",
        "rgba(49,70,107,1)",
        "rgba(106,129,158,1)",
        "rgba(238,235,224,1)",
        "rgba(162, 72, 80, 1)",
      ],
    };
  }
  onChangeHandler = (event) => {
    let fileKey = event.target.name;
    console.log(fileKey);
    let fileContent = event.target.files[0];
    let newSelectedFiles = this.state.selectedFiles;
    newSelectedFiles[fileKey] = fileContent;
    this.setState({ selectedFiles: newSelectedFiles });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const selectedFiles = this.state.selectedFiles;

    for (let key in selectedFiles) {
      console.log(key + " " + selectedFiles[key]);
      formData.append(key, selectedFiles[key]);
    }
    formData.append("test", "test");
    api
      .post("/configuration/post/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          // display alert
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          console.log(response);
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  displayVideoFolder = () => {
    const selectedFiles = this.state.selectedFiles;
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
    let folderNameArray = [];
    for (let file in selectedFiles) {
      let folderName = selectedFiles[file].name.split(".")[0].split("_");
      folderName.pop();
      folderNameArray.push(folderName.join("_"));
    }
    let folderName = folderNameArray[0];
    if (allEqual(folderNameArray)) {
      if (folderNameArray.length === 4) {
        return (
          <div>
            Confirmez vous l'ordre des video suivant (du début a la fin) ?
            <div>
              <ListGroup as="ol" numbered={true}>
                {Object.keys(selectedFiles).map((key, index) => (
                  <ListGroup.Item key={index} as="li">
                    <Badge bg="primary" pill>
                      {index + 1}
                    </Badge>
                    {selectedFiles[key].name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        );
      } else {
        return <div>Le nom du dossier est : {folderName}</div>;
      }
    } else {
      return (
        <div>
          Veuillez renseigner les 4 fichiers d'une même video (format :
          EXPERIENCE_SUJET_JOUR)
        </div>
      );
    }
  };

  render() {
    return (
      <Form classname="shadow" style={{}}>
        <Row>
          <Form className="col-1"></Form>
          {[0, 15].map((key) => (
            <Form
              key={key}
              className="col-5"
              style={{
                border: "solid black 2px",
                margin: "0.5rem",
                borderRadius: "5px",
                fontSize: "0.9rem",
                backgroundColor: this.state.backColor[defineColor(key)],
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <label>
                <br></br>
                <Form style={{ fontSize: "1.25rem" }}>
                 <strong> VIDEO {key} MIN</strong>
                </Form>
                <Form style={{ fontSize: "0.75rem" }}>
                  Importer la video depuis votre ordinateur
                </Form>
                <br></br>
                <input
                  style={{ fontSize: "0.75rem" }}
                  type="file"
                  name={"file_" + key}
                  onChange={this.onChangeHandler}
                />
                <br></br>
                <br></br>
              </label>

              <br />
            </Form>
          ))}
        </Row>
        <Row>
          <Form className="col-1"></Form>
          {[30, 45].map((key) => (
            <Form
              key={key}
              className="col-5"
              style={{
                border: "solid black 2px",
                margin: "0.5rem",
                borderRadius: "5px",
                fontSize: "0.9rem",
                backgroundColor: this.state.backColor[defineColor(key)],
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <label>
                <br></br>
                <Form style={{ fontSize: "1.25rem" }}>
                 <strong> VIDEO {key} MIN</strong>
                </Form>
                <Form style={{ fontSize: "0.75rem" }}>
                  Importer la video depuis votre ordinateur
                </Form>
                <br></br>
                <input
                  style={{ fontSize: "0.75rem" }}
                  type="file"
                  name={"file_" + key}
                  onChange={this.onChangeHandler}
                />
                <br></br>
                <br></br>
              </label>
              <br />
            </Form>
          ))}
        </Row>
        {Object.keys(this.state.selectedFiles).length >= 1
          ? this.displayVideoFolder()
          : ""}
        <Button onClick={this.handleSubmit}>Upload</Button>
      </Form>
    );
  }
}
