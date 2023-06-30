import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import Upload from "./Upload";
import { CSVLink, CSVDownload } from "react-csv";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { configurationData } from "./formItems";
import Column from "./column";
import api from "../axiosConfig";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
const { Parser } = require("json2csv");

const filtreTexte = (arr, requete) => {
  return arr.filter(
    (el) =>
      el.toLowerCase().indexOf(requete.toLowerCase()) !== -1 &&
      el.toLowerCase().indexOf("_evaluation") == -1
  );
};
const Container = styled.div`
  display: flex;
  margin: auto;
`;
class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initiate: "",
      subject_data: [],
      subject_data_csv: [],
      wifi_name:"", 
      password:"", 

    };
  }

  getSubjectData = () => {
    const this_contexte = this;
    const filtreTexte = (arr, requete) => {
      return arr.filter(
        (el) => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1
      );
    };

    api
      .get("output/export/data")
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          this_contexte.setState({
            subject_data: response.data,
          });

          try {
            const parser = new Parser();
            const csv = parser.parse(this_contexte.state.subject_data);
            this_contexte.setState({
              subject_data_csv: csv,
            });
          } catch (err) {
            console.error(err);
          }
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount = () => {
    const this_contexte = this;
    api
      .get("configuration/create/video")
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          this_contexte.setState(response.data);
          this_contexte.setState({
            initiate: "initiate",
          });
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //this.getSubjectData();

    //setInterval(this.getSubjectData, 3000)
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "radio" ? target.id : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  handleOnDragEnd = (result) => {
    const filtreTexte = (arr, requete) => {
      return arr.filter(
        (el) =>
          el.toLowerCase().indexOf(requete.toLowerCase()) !== -1 &&
          el.toLowerCase().indexOf("_evaluation") == -1
      );
    };

    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
      
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      api
        .post("configuration/udpate/video", {
          video_use: newState,
        })
        .then(function (response) {
          const status_code = response.status;
          if (parseInt(status_code) === 204) {
            console.log("form empty");
          } else if (parseInt(status_code) === 200) {
          } else {
            console.log("Error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    console.log(newState);
    this.setState(newState);
    api
      .post("configuration/udpate/video", {
        video_use: newState,
      })
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
        } else {
          console.log("Error");

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  connecitonWifi = () => {
    const state = this.state;
    api
      .post("/connection/wifi", {
        wifi_name: state.wifi_name,
        password: state.password
      })
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  handleChangeText = (event) => {
    const target = event.target;
    console.log(target)
    const value = target.type === "radio" ? target.id : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  toggleStates = () => {   
   const this_contexte = this
   api
   .get("/configuration/toggle/student")
   .then(function (response) {
     const status_code = response.status;
     if (parseInt(status_code) === 204) {
       console.log("Request error");
     } else if (parseInt(status_code) === 200) {
        console.log(response.data)
        this_contexte.setState({studentMode : response.data})
     } else {
       console.log("Error");

     }
   })
   .catch(function (error) {
     console.log(error);
   });
  };
  render() {
    const date = new Date();
    return (
      <Card
        style={{
          width: "75%",
          margin: "auto",
          marginTop: "1%",
        }}
      >
        <Card.Title
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
          }}
        >
         CONFIGURATION <br></br> 
         Interface de configuration du Questionnaire
        </Card.Title>

          <Tabs>
            <Tab eventKey="session" title="Session">
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
                {this.state.initiate == "" ? (
                  ""
                ) : (
                  <Container>
                    {this.state.columnOrder.map((columnId) => {
                      const column = this.state.columns[columnId];
                      const tasks = column.taskIds.map(
                        (taskId) => this.state.tasks_list[taskId]
                      );
                      return (
                        <Column key={column.id} column={column} tasks={tasks} />
                      );
                    })}
                  </Container>
                )}
              </DragDropContext>
            </Tab>
            <Tab  eventKey="upload" title="Upload">
              <Upload></Upload>
            </Tab>
            <Tab  eventKey="download" title="Téléchargements">
              <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Téléchargement</Card.Title>
                    <Form.Group controlId="formBasicInitial_1">
                      <Button
                        href={api.defaults.baseURL + "/output/export/data"}
                      >
                        {" "}
                        Telecharger les données de reponses
                      </Button>
                    </Form.Group>
                    <Form.Group controlId="formBasicInitial_2">
                      <Button
                        href={api.defaults.baseURL + "/output/sequence/order"}
                      >
                        {" "}
                        Telecharger l'ordre reponses
                      </Button>
                    </Form.Group>
                    
                  </Card.Body>
                </Card>
            </Tab>
            <Tab eventKey="mode" title="Mode">
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Mode Etudiant</Card.Title>
                  {this.state.studentMode ? 
                  <Button onClick={this.toggleStates}>Activer mode etudiant </Button> : 
                  <Button onClick={this.toggleStates}>Désactiver mode etudiant </Button>
                  }  

                </Card.Body>
              </Card>
            </Tab>
            {/*<Tab eventKey="visualisation" title="Visualisation">
            {this.state.subject_data.map((_subject, index) => (

            <Card key={index} style={{
              margin: 'auto',
              marginTop: "1%",
              width: '75%',
              textAlign: 'center'
              }}>
              <Card.Title>
                {_subject._initialValues + "_" + _subject._id}
              </Card.Title>
              { filtreTexte(Object.keys(_subject), "DESFAM").map((video, index) => (
              <ListGroup.Item key={index}>{video}</ListGroup.Item>
              ))}
            </Card>
            ))}
              </Tab>*/}
          </Tabs>

            
            {/* <Col>
                  
                    </Col>*/}
          
      </Card>
    );
  }
}

export default Configuration;
