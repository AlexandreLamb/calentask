import React from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TagInput from './TagInput';
import { commonIndicator } from './formItems';
import api from "../axiosConfig"


class SelfEvaluationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        confianceDegree: "", 
        selfIndcator: [],
        commonIndicator : commonIndicator,
        displayCommonIndicator : false,
        displayConfianceDegree : false,
        displaySelfIndicator : true
      };
    }
    handleCheckedElement = (event) => {
        const commonIndicator = this.state.commonIndicator
        const target = event.target
        commonIndicator.forEach(commonIndicator => {
           if (commonIndicator.value === target.value)
           commonIndicator.isChecked =  target.checked
        })
        this.setState({commonIndicator: commonIndicator})
      }
    handleChange = (event) => {   
      const target = event.target;
      const value =  target.value;
      const name = target.name;
      this.setState({[name]: value});  
    }
    handleTag = (tag) => {
      this.setState({selfIndcator:tag})
    }
    handleSubmit = (event) => {
      if ((this.state.displaySelfIndicator ==true) && (this.state.selfIndcator.length != 0)) {
        this.setState({
          displaySelfIndicator : false,
          displayCommonIndicator : true
        })
      }
      if (this.state.displayCommonIndicator == true){
        this.setState({
          displayCommonIndicator : false, 
          displayConfianceDegree : true
        })
      }
      if( this.state.displayConfianceDegree == true) {
        const axios = require('axios').default;
        const { confianceDegree, selfIndcator, commonIndicator} = this.state
        const this_contexte = this
        const videoName = "_"+this.props.videoFolder.split("/").at(-1)
        const data = {}
        var commonIndicatorChecked = []
        var selfIndcatorText = []
        commonIndicator.forEach(element => {
          if(element.isChecked){
            commonIndicatorChecked.push(element.value)
          }
        })
        selfIndcator.forEach(element => {
          selfIndcatorText.push(element.text)
        })

        data["_id"] = this_contexte.props.documentID
        data[videoName] = {}
        data[videoName+"_evaluation"] = {
          _confianceDegree: confianceDegree,
          _commonIndicator: commonIndicatorChecked,
          _selfIndcator: selfIndcatorText,
        }
        axios.post('output/subject/evaluation/', data)
        .then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204){
            // display alert
            console.log("form empty")
          }
          else if(parseInt(status_code) === 200) {
            this_contexte.props.handleSubmit()
          }
          else {
            console.log("Error")
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }
      event.preventDefault()
    }
    render() {
      const { confianceDegree, selfIndcator, commonIndicator, displayCommonIndicator, displayConfianceDegree, displaySelfIndicator} = this.state 
      return(
            <Card
              style={{
                borderLeftStyle:"none",
                
              }}
            >
            <Card.Title 
              style={{
                textAlign: 'center',
                fontSize: "1.50rem",
              }}
            >
              Secion 3 : Auto évaluation
            </Card.Title>
              <Form
                style={{
                  width: '95%',
                  margin: "auto",
                  textAlign: 'center',
                  marginTop: "10%"
                }}
              >
                <Row className="mb-3">
                  { displaySelfIndicator  ?
                    <Form.Group>
                    <Form.Label>
                    Quels indicateurs du visage avez vous utilisé pour classer les videos (Plusieurs indicateurs possible a classer dans l'orde d'importance de gauche a droite) ?
                    </Form.Label>
                    <TagInput handleTag={this.handleTag} />  
                  </Form.Group> : null
                  }
                  {
                      displayCommonIndicator ?
                    <Form.Group as={Col} controlId="formBasicCommonIndicator">
                      
                    <Form.Label>
                        Vos indicateurs utilisés se trouvent-ils parmi cette liste ?
                        (Plusieurs items possibles à cocher ):
                    </Form.Label>

                   
                     { commonIndicator.map(({ id, value, isChecked }) => (  
                      <Form.Check 
                          value={value} 
                          onChange={this.handleCheckedElement}
                          inline
                          checked={isChecked}
                          label={value}
                          name="commonIndicator"
                          type="checkbox"
                          key={id} /> 
                      )) }
                    

                  </Form.Group>  : null
                  } 
                  </Row>
                  <Row className="mb-3">

                  {displayConfianceDegree ? <Form.Group as={Col} controlId="formBasicConfianceDegree">
                    <Form.Label>
                        Votre degré de confiance sur le classement que vous venez d’effectuer 
                        (EVA allant de 1 à 5 de «Très peu confiant» à «Très confiant»)  
                    </Form.Label>
                    {[1, 2, 3, 4, 5].map((type) => (  
                    <Form.Check 
                        value={`level-${type}`} 
                        onChange={this.handleChange}
                        inline
                        label={type}
                        name="confianceDegree"
                        type="radio"
                        key={`level-${type}`} />
                    ))}
                  </Form.Group> : null}
              <Button onClick={this.handleSubmit}>Passer a la suite</Button>

              </Row>
            </Form>
          </Card>        

      ) 
    } 
}

export default SelfEvaluationForm;