import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import api from "../axiosConfig";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: {},
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
                  <ListGroup.Item key={index}  as="li">
                      <Badge bg="primary" pill>
                  {index+1}
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
          Veuillez renseigner les 4 fichiers d'une meme video (format :
          EXPERIENCE_SUJET_JOUR)
        </div>
      );
    }
  };

  render() {
    return (
      <div>
          {[0, 15, 30, 45].map((key) => (
            <div key={key}>
              <label>
                Video {key} min: <br />
                <br />
                <input
                  type="file"
                  name={"file_" + key}
                  onChange={this.onChangeHandler}
                />
              </label>
              <br />
              <br />
            </div>
          ))}
          {Object.keys(this.state.selectedFiles).length >= 1
            ? this.displayVideoFolder()
            : ""}
          <Button onClick={this.handleSubmit}>Upload</Button>
      </div>
    );
  }
}
