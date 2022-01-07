import React, { useState }  from 'react';
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import styled from 'styled-components';
import { CSVLink, CSVDownload } from "react-csv";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { configurationData } from "./formItems"
import Column from "./column"
const { Parser } = require('json2csv');

const FLASK_URL = "http://127.0.0.1:5000/"

const Container = styled.div`
  display: flex;
`;
class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          initiate :"",
          subject_data : [],
          subject_data_csv : []
        }
    }
    componentDidMount = () => {
      
        const axios = require('axios').default
        const this_contexte = this
        const tasks = {}
        axios.get(FLASK_URL+'configuration/create/video')
        .then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204){
            console.log("form empty")
          }
          else if(parseInt(status_code) === 200) {
            this_contexte.setState(response.data)
            this_contexte.setState({initiate : "initiate"})
          }
          else {
            console.log("Error")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get(FLASK_URL+'output/export/data')
        .then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204){
            console.log("form empty")
          }
          else if(parseInt(status_code) === 200) {
            console.log(Object.entries(response.data))
            this_contexte.setState({subject_data  : response.data})

          try {
            const parser = new Parser();
            const csv = parser.parse(this_contexte.state.subject_data );
            this_contexte.setState({subject_data_csv : csv})
          } catch (err) {
            console.error(err);
}
          }
          else {
            console.log("Error")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }
    handleChange = (event) => {
        const target = event.target;
        console.log(target)
        const value = target.type === 'radio' ? target.id : target.value;
        const name = target.name;
        this.setState({[name]: value});  
    }
    handleOnDragEnd = (result) => {
        const axios = require('axios').default
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
        axios.post(FLASK_URL+"configuration/udpate/video",{ 
          "video_use" : newState
        }).then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204){
            console.log("form empty")
          }
          else if(parseInt(status_code) === 200) {
           
          }
          else {
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
            <Card 
            style={{
            width: '75%',
            margin: 'auto',
            marginTop: "1%"
            }}
        >
        <Card.Title 
            style={{
            textAlign: 'center',
            fontSize: "2.25rem"
            }}
        >
        Interface de configuration du Questionnaire

        </Card.Title>
        <Form.Group  controlId="formBasicInitial">  
                 <CSVLink 
                  data={ typeof(this.state.subject_data) == "object" ? this.state.subject_data_csv : [  ] }
                  filename={"video_fatigue_"+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}
                  > 
                  <Button> Telecharger fichier de reponses </Button> 
                </CSVLink> 
        </Form.Group> 
        
        <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                {this.state.subject_data.map((_subject, index) => (
                  <th key={index}>{_subject._id}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {this.state.subject_data.map((_subject, index) => (
                  <th key={index}>{_subject._age}</th>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {this.state.subject_data.map((_subject, index) => (
                  <th key={index}>{_subject._initialValues}</th>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {this.state.subject_data.map((_subject, index) => (
                  <th key={index}>{_subject._date}</th>
                ))}
              </tr>
            </tbody>
        </Table>





              <DragDropContext onDragEnd={this.handleOnDragEnd}>
            
            
           { this.state.initiate == "" ? "":            
           <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            console.log(this.state)
            const tasks = column.taskIds.map(
              taskId => this.state.tasks_list[taskId],
            );
            console.log(tasks)
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>}
      </DragDropContext>

        </Card>
        );
      }
    
}

export default Configuration