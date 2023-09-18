import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from "./ReactTagsIndicateur.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { commonIndicator } from "./formItems";
import api from "../axiosConfig";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class TagGestionIndic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [], 
            inputIndicator : "", 
            indicators  : []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    componentDidMount = () => {
        const this_contexte = this;
        api
          .get("/configuration/get/indicators")
          .then(function (response) {
            const status_code = response.status;
            if (parseInt(status_code) === 204) {
              console.log("error");
            } else if (parseInt(status_code) === 200) {
              this_contexte.setState({indicators:response.data});
             
            } else {
              console.log("Error");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        }, function(){
            this.props.handleIndic(this.state.tags)
        });

    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }), function(){
            this.props.handleIndic(this.state.tags)
        });
    }
    addIncator = () => {


      const newIndicators = {"id" : this.state.indicators.length,"value" :this.state.inputIndicator}
      const this_contexte = this
      api
      .post("/configuration/add/indicators", {
       newIndicators,
      })
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          console.log(response)
          this_contexte.setState({indicators:response.data});
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === "radio" ? target.id : target.value;
        const name = target.name;
        console.log(name, value)
        this.setState({ [name]: value });

      };
    

    render() {
       
        const {tags, inputIndicator, indicators} = this.state;
    
        return (
            <div>
                <Form.Group>
                <Form.Label>Ajouter un indcateur</Form.Label>
                <Form.Control
                    name="inputIndicator"
                    type="text"
                    id="inputIndicator"
                    value={inputIndicator}
                    onChange={this.handleChange}

                />
                <Button onClick={this.addIncator}>Ajouter</Button>
                </Form.Group>
                <br></br>
                <br></br>
                {
                indicators.map(({ id, value }) => (
                    <Form
                        style={{
                                fontSize: "1rem",
                                textAlign: "initial",
                                backgroundColor: "white",
                                border : "solid"
                        }}>
                        <Form.Label id={id}> {id} {value}</Form.Label>
                        <Button> X </Button>
                    </Form>
                                ))}


       {/* <div className={styles.ReactTags}>

                <ReactTags tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    inputFieldPosition="bottom"
                />
        </div>*/}
            </div>

        )
    }
};

export default TagGestionIndic;