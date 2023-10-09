import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 400px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
  margin: auto
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 1000px;
  margin: auto
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container style = {{
      fontSize: "1rem", 
      marginTop: "2%",
      marginBottom: "2%",
      }}>

        <Title style = {{fontSize: "1rem"}}><strong>{this.props.column.id.split("column-")}. {this.props.column.title}</strong></Title>
        
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task style = {{
                  backgroundColor: this.props.column.color,
                }}
                key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      
      </Container>
    );
  }
}
