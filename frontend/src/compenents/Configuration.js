import React from "react";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import Upload from "./Upload";
import Image from "react-bootstrap/Image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { configurationData } from "./formItems";
import Column from "./column";
import api from "../axiosConfig";
import TagGestionIndic from "./TagGestionIndic";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { commonIndicator } from "./formItems";
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
      user_sequence: [],
      subject_data_csv: [],
      wifi_name: "",
      password: "",
      user_online: [],
      studentMode: "",
      commonIndicator: commonIndicator,
    };
    
  }

  getUserOnline = () => {
    const this_contexte = this;
    api
      .get("/output/get/users")
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          this_contexte.setState({
            user_online: response.data,
          });
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
    //this.getUserOnline();
    //setInterval(this.getSubjectData, 3000)

    api.get("/configuration/get/student").then(function (response) {
      this_contexte.setState({ studentMode: response.data });
    });
  };

  handleIndic = (tag) => {
    this.setState({ selfIndicfromSuggestions: tag });
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
        password: state.password,
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
    console.log(target);
    const value = target.type === "radio" ? target.id : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  toggleStates = () => {
    const this_contexte = this;
    api
      .get("/configuration/toggle/student")
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("Request error");
        } else if (parseInt(status_code) === 200) {
          console.log(response.data);
          this_contexte.setState({ studentMode: response.data });
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
          width: "100%",
          height: "100%",
          backgroundColor: "#e7edf6",
        }}
      >
        <Card
          className="shadow align-items-center"
          style={{
            width: "70%",
            margin: "auto",
            marginTop: "2%",
            marginBottom: "2%",
            padding: "0.2rem",
            border: "black solid 0px",
          }}
        >
          <Card.Title
            className="rounded-lg"
            style={{
              textAlign: "center",
              fontSize: "1rem",
              padding: "1rem",
              border: "black solid 0px",
              margin: "3%",
            }}
          >
            <div>
              <Image
                fluid={true}
                src="logo_esco.png"
                width="16%"
                alt="logo ufv"
              ></Image>{" "}
            </div>
            <div
              style={{
                fontSize: "3rem",
                padding: "0.5rem",
              }}
            >
              <strong>CONFIGURATION</strong>
            </div>
            <div
              className="lead text-justify"
              style={{
                padding: "0.5rem",
              }}
            >
              Interface de configuration du Questionnaire
            </div>
          </Card.Title>

          <Tabs>
            {/*<Tab eventKey="Online" title="En cours">
            <Form.Group style={{
                        marginLeft: "15%",
                        marginRight: "15%",
                        marginTop: "2%",
                        marginBottom: "2%",
                        fontSize: "1.5rem",
                      }}
                      controlId="formBasicInitial_1">
                    <Form.Label
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      <strong>UTILISATEURS</strong>
                    </Form.Label>
                      <Row>
                        <Form className="col-5"></Form>
                        <Form className="col-2">
                          <Image
                            fluid={true}
                            src="Picture2.png"
                            width="100%"
                            alt="logo ufv"
                          ></Image>{" "}
                          </Form>
                          <Form className="col-5"></Form>
                      </Row>
                   <Form.Label style={{
                        fontSize: "1rem",
                      }}>
                    Dans cette section, ajoutez une nouvelle séquence de vidéo. A partir de votre ordinateur, sélectionner une séance de 
                    4 vidéos, puis valider. 
                    <br></br> La nouvelle vidéo sera ajouté dans la bibliothèque de données immédiatement. 
                   </Form.Label>
                  </Form.Group>
                 
              {this.state.user_online.map((value, index) => (
                <Form.Group style = {{
                  marginLeft: "15%",
                        marginRight: "15%",
                        marginTop: "2%",
                        marginBottom: "2%",
                }} key={index}>
                  <Row
                    style={{
                      background: "rgba(12,12,12,0.1)",
                      padding: "0.5rem",
                      margin: "0.5rem",
                      borderRadius: "0.25rem",
                      width: "100%",
                    }}
                  >
                    <Form.Label className="Col">
                      User : <strong>{value}</strong>
                      <br></br>
                      Status : Connecté
                      <br></br>
                      Sequence :
                    </Form.Label>

                    <Button
                      className="Col"
                      href={api.defaults.baseURL + "/output/export/data"}
                    >
                      {" "}
                      Reponses
                    </Button>
                  </Row>
                </Form.Group>
              ))}
                  </Tab>*/}

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

            <Tab eventKey="indicateurs" title="Indicateurs">
              <Form.Group
                style={{
                  marginLeft: "15%",
                  marginRight: "15%",
                  marginTop: "2%",
                  marginBottom: "2%",
                  fontSize: "1rem",
                }}
                controlId="formBasicInitial_1"
              >
                <Form.Label
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  <strong>LISTE DES INDICATEUR</strong>
                </Form.Label>
                <Row>
                  <Form className="col-5"></Form>
                  <Form className="col-2">
                    <Image
                      fluid={true}
                      src="Picture2.png"
                      width="100%"
                      alt="logo ufv"
                    ></Image>{" "}
                  </Form>
                  <Form className="col-5"></Form>
                </Row>

                <TagGestionIndic
                    className="rounded"
                    handleIndic={this.handleIndic}
                    commonIndicator={commonIndicator}
                  />

               


              </Form.Group>
            </Tab>

            {/*<Tab eventKey="createSession" title="Créer">
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
                  </Tab>*/}

            <Tab eventKey="upload" title="Upload">
              <Form.Group
                style={{
                  marginLeft: "15%",
                  marginRight: "15%",
                  marginTop: "2%",
                  marginBottom: "2%",
                  fontSize: "1.5rem",
                }}
                controlId="formBasicInitial_1"
              >
                <Form.Label
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  <strong>AJOUT DE VIDEO</strong>
                </Form.Label>
                <Row>
                  <Form className="col-5"></Form>
                  <Form className="col-2">
                    <Image
                      fluid={true}
                      src="Picture2.png"
                      width="100%"
                      alt="logo ufv"
                    ></Image>{" "}
                  </Form>
                  <Form className="col-5"></Form>
                </Row>
                <Form.Label
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  Dans cette section, ajoutez une nouvelle séquence de vidéo. A
                  partir de votre ordinateur, sélectionner une séance de 4
                  vidéos, puis valider.
                  <br></br> La nouvelle vidéo sera ajouté dans la bibliothèque
                  de données immédiatement.
                </Form.Label>
                <Form style={{ textAlign: "center" }}>
                  <Upload></Upload>
                </Form>
              </Form.Group>
            </Tab>

            <Tab eventKey="download" title="Téléchargements">
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Form.Group
                    style={{
                      marginLeft: "15%",
                      marginRight: "15%",
                      marginTop: "2%",
                      marginBottom: "2%",
                      fontSize: "1.5rem",
                    }}
                    controlId="formBasicInitial_1"
                  >
                    <Form.Label
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      <strong>1. REPONSE DE LA SEANCE</strong>
                    </Form.Label>
                    <Row>
                      <Form className="col-5"></Form>
                      <Form className="col-2">
                        <Image
                          fluid={true}
                          src="Picture2.png"
                          width="100%"
                          alt="logo ufv"
                        ></Image>{" "}
                      </Form>
                      <Form className="col-5"></Form>
                    </Row>
                    <Form.Label
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      Télécharger les réponses des utilisateurs de la séance
                      réalisées. Vous vous retrouvez avec un fichier Excel
                      (format CSV).
                    </Form.Label>
                    <Form style={{ textAlign: "center" }}>
                      <Button
                        style={{ background: "rgba(49,70,107,1)" }}
                        href={api.defaults.baseURL + "/output/export/data"}
                      >
                        {" "}
                        Télécharger
                      </Button>
                    </Form>
                  </Form.Group>

                  <Form.Group
                    style={{
                      marginLeft: "15%",
                      marginRight: "15%",
                      marginTop: "2%",
                      marginBottom: "2%",
                      fontSize: "1.5rem",
                    }}
                    controlId="formBasicInitial_2"
                  >
                    <Form.Label
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      <strong>2. 0RDRE DES REPONSES</strong>
                    </Form.Label>
                    <Row>
                      <Form className="col-5"></Form>
                      <Form className="col-2">
                        <Image
                          fluid={true}
                          src="Picture2.png"
                          width="100%"
                          alt="logo ufv"
                        ></Image>{" "}
                      </Form>
                      <Form className="col-5"></Form>
                    </Row>
                    <Form.Label
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      Télécharger l'ordre des réponpes des utilisateurs de la
                      séance réalisées. Vous vous retrouvez avec un fichier
                      Excel (format CSV).
                    </Form.Label>
                    <Form style={{ textAlign: "center" }}>
                      <Button
                        style={{ background: "rgba(162, 72, 80, 1)" }}
                        href={api.defaults.baseURL + "/output/sequence/order"}
                      >
                        {" "}
                        Télécharger
                      </Button>
                    </Form>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="mode" title="Mode">
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Form.Group
                    style={{
                      marginLeft: "15%",
                      marginRight: "15%",
                      marginTop: "2%",
                      marginBottom: "2%",
                      fontSize: "1.5rem",
                    }}
                    controlId="formBasicInitial_1"
                  >
                    <Form.Label
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      <strong> MODE DE LA SEANCE</strong>
                    </Form.Label>
                    <Row>
                      <Form className="col-5"></Form>
                      <Form className="col-2">
                        <Image
                          fluid={true}
                          src="Picture2.png"
                          width="100%"
                          alt="logo ufv"
                        ></Image>{" "}
                      </Form>
                      <Form className="col-5"></Form>
                    </Row>
                    <Form.Label
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      Definisez le mode de la séance voulue en fonction de la
                      population de vos utlisateurs pour la séance en cours.
                      Vous avez le choix entre le mode militaire et le mode
                      civil.
                      <br></br>La différence se situe dans la définition des
                      informations personnelles demandées en cours de séance.
                      <br></br>Appuyez sur le bouton pour activer / désactiver
                      les modes.
                    </Form.Label>
                    <Form style={{ textAlign: "center" }}>
                      {this.state.studentMode == true ? (
                        <Button
                          style={{ background: "rgba(49,70,107,1)" }}
                          onClick={this.toggleStates}
                        >
                          Activer le mode civil{" "}
                        </Button>
                      ) : (
                        <Button
                          style={{ background: "rgba(162, 72, 80, 1)" }}
                          onClick={this.toggleStates}
                        >
                          Activer le mode militaire{" "}
                        </Button>
                      )}
                    </Form>
                  </Form.Group>
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
      </Card>
    );
  }
}

export default Configuration;
