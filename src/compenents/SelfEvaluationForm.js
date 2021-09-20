import React from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TagInput from './TagInput';
import { itemListGender } from './formItems';

class SelfEvaluationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        confianceDegree: null, 
        selfIndcator: null,
        commonIndicator: [
            {id: 1, value: "Yeux plus ou moins ouverts", isChecked: false},
            {id: 2, value: "Muscles du visage plus ou moins relâchés Tête plus ou moins baissée", isChecked: false},
            {id: 3, value: "Clignement des yeux", isChecked: false},
            {id: 4, value: "Bouche plus ou moins ouverte", isChecked: false}
          ]
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
      console.log(itemListGender) 
      const target = event.target;
      console.log(target)
      const value = target.type === 'radio' ? target.id : target.value;
      const name = target.name;
      this.setState({[name]: value});  
    }
    handleTag = (tag) => {
      this.setState({selfIndcator:tag})
    }
    handleSubmit = (event) => {
      const axios = require('axios').default;
      const { confianceDegree, commonIndicator, selfIndcator} = this.state
      const this_contexte = this
      axios.post('http://127.0.0.1:5000/output/subject/information/', {
        _confianceDegree: confianceDegree,
        _commonIndicator: commonIndicator,
        _selfIndcator: selfIndcator,
        _pathToCsv: this_contexte.props.pathToCsv,
      })
      .then(function (response) {
        const status_code = response.status
        if (parseInt(status_code) === 204){
          // display alert
          console.log("form empty")
        }
        else if(parseInt(status_code) === 200) {
          this_contexte.props.handleSubmit(response.data)
        }
        else {
          console.log("Error")
        }

      })
      .catch(function (error) {
        console.log(error);
      });
      event.preventDefault()
    }
    render() {
        const { confianceDegree, commonIndicator, selfIndcator} = this.state
       
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
                  <Form.Group>
                    <Form.Label>
                    Quels indicateurs du visage avez vous utilisé pour classer les videos (Plusierus indeicateurs possible a classer dasn l'orde d'importance de gauche a droite) ?
                    </Form.Label>
                    <TagInput handleTag={this.handleTag} />  
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicCommonIndicator">
                    <Form.Label>
                        Vos indicateurs utilisés se trouvent-ils parmi cette liste ?
                        (Plusieurs items possibles à cocher ):
                    </Form.Label>
                    {commonIndicator.map(({ id, value, isChecked }) => (  
                    <Form.Check 
                        value={value} 
                        onChange={this.handleCheckedElement}
                        inline
                        checked={isChecked}
                        label={value}
                        name="commonIndicator"
                        type="checkbox"
                        id={id} />
                    ))}

                  </Form.Group> 
                  </Row>
                  <Row className="mb-3">             
                  <Form.Group as={Col} controlId="formBasicConfianceDegree">
                    <Form.Label>
                        Votre degré de confiance sur le classement que vous venez d’effectuer 
                        (EVA allant de 1 à 5 de «Très peu confiant» à «Très confiant»)  
                    </Form.Label>
                    {[1, 2, 3, 4, 5].map((type) => (  
                    <Form.Check 
                        value={confianceDegree} 
                        onChange={this.handleChange}
                        inline
                        label={type}
                        name="confianceDegree"
                        type="radio"
                        id={`level-${type}`} />
                    ))}
                  </Form.Group>
              <Button onClick={this.handleSubmit}>Passer a la suite</Button>

              </Row>
            </Form>
          </Card>        

      ) 
    } 
}

export default SelfEvaluationForm;