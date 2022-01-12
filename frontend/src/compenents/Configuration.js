import React, {
  useState
} from 'react';
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import styled from 'styled-components';
import {
  CSVLink,
  CSVDownload
} from "react-csv";
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd';
import {
  configurationData
} from "./formItems"
import Column from "./column"
import api from "../axiosConfig"
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
const {
  Parser
} = require('json2csv');

const filtreTexte = (arr, requete) => {
  return arr.filter(el => (el.toLowerCase().indexOf(requete.toLowerCase()) !== -1) && (el.toLowerCase().indexOf("_evaluation") == -1));
}
const Container = styled.div `
  display: flex;
  margin: auto
`;
class Configuration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initiate: "",
        subject_data: [],
        subject_data_csv: []
      }
    }

    getSubjectData = () => {
      const this_contexte = this
      const filtreTexte = (arr, requete) => {
        return arr.filter(el => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
      }

      api.get('output/export/data')
        .then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204) {
            console.log("form empty")
          } else if (parseInt(status_code) === 200) {
            this_contexte.setState({
              subject_data: response.data
            })

            try {
              const parser = new Parser();
              const csv = parser.parse(this_contexte.state.subject_data);
              this_contexte.setState({
                subject_data_csv: csv
              })
            } catch (err) {
              console.error(err);
            }
          } else {
            console.log("Error")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    componentDidMount = () => {

      const this_contexte = this
      api.get('configuration/create/video')
        .then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204) {
            console.log("form empty")
          } else if (parseInt(status_code) === 200) {
            this_contexte.setState(response.data)
            this_contexte.setState({
              initiate: "initiate"
            })
          } else {
            console.log("Error")
          }
        })
        .catch(function (error) {
          console.log(error);
        });;
      this.getSubjectData()

      //setInterval(this.getSubjectData, 3000)
    }
    handleChange = (event) => {
      const target = event.target;
      const value = target.type === 'radio' ? target.id : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
    handleOnDragEnd = (result) => {
      const filtreTexte = (arr, requete) => {
        return arr.filter(el => (el.toLowerCase().indexOf(requete.toLowerCase()) !== -1) && (el.toLowerCase().indexOf("_evaluation") == -1));
      }
      console.log(this.state.subject_data)
      console.log(this.state.subject_data.map(subject => filtreTexte(Object.keys(subject), "DESFAM")))


      const {
        destination,
        source,
        draggableId
      } = result;
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
      this.setState(newState);
      api.post("configuration/udpate/video", {
          "video_use": newState
        }).then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204) {
            console.log("form empty")
          } else if (parseInt(status_code) === 200) {

          } else {
            console.log("Error")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    render() {
      const date = new Date()
        return (
            <Card style={{
            width: '75%',
            margin: 'auto',
            marginTop: "1%"
            }}>
              <Card.Title style={{
            textAlign: 'center',
            fontSize: "2.25rem"
            }}>
                Interface de configuration du Questionnaire

              </Card.Title>

              <Container>
                <Row>

                  <Col>
                  <DragDropContext onDragEnd={this.handleOnDragEnd}>   
            
                  { this.state.initiate == "" ? "":            
                  <Container>
                      {this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(
                          taskId => this.state.tasks_list[taskId],
                        );
                        return <Column key={column.id} column={column} tasks={tasks} />;
                      })}
                </Container>
                }
      </DragDropContext>
                  </Col>
                  <Col>
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
                  </Col>
                  <Col>
                  <Form.Group style={{
          margin: 'auto',
          marginTop: '50%',
          marginRight: '2%',
        }} controlId="formBasicInitial">
                    <CSVLink data={ typeof(this.state.subject_data)=="object" ? this.state.subject_data_csv : [ ] }
                      filename={"video_fatigue_"+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}>
                      <Button> Telecharger fichier de reponses </Button>
                    </CSVLink>
                  </Form.Group>
                  </Col>
                </Row>
              </Container>
            </Card>
        );
    }
}

export default Configuration