import React from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {itemListGender, iemListStudieLevel, itemListFatigueLevel, iemListHeadquarters} from "./formItems"

const FLASK_URL = "http://127.0.0.1:5000/"
class InformationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initialValues: "ML", 
        age: "1",
        gender: "M",
        studieLevel: "1",
        studieArea: "dza",
        fatigueLevel: "3",
        armyLengthOfService: "", 
        typeOfJob: "reze",
        peopleCommand: "3",
        headquarters: "azda",
        jobLengthOfService: "1",
        grade: "dzad"

      };
    }
    handleChange = (event) => {  
      const target = event.target;
      console.log(target)
      const value = target.type === 'radio' ? target.id : target.value;
      const name = target.name;
      this.setState({[name]: value});  
    }
    createDateFormat = () => {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1; 
      let yyyy = today.getFullYear();
      if(dd<10){
          dd='0'+dd;
      } 
      if(mm<10){
          mm='0'+mm;
      } 
     return mm+'/'+dd+'/'+yyyy;
    }
    handleSubmit = (event) => {
      const axios = require('axios').default;
      const {
        initialValues, 
        age,
        gender,
        studieLevel,
        studieArea,
        fatigueLevel,
        armyLengthOfService, 
        typeOfJob,
        peopleCommand,
        headquarters,
        jobLengthOfService,
        grade
      } = this.state
      const this_contexte = this
      axios.post(FLASK_URL+'output/subject/information/', {
        _initialValues: initialValues, 
        _age: age,
        _gender: gender,
        _studieLevel: studieLevel,
        _sutdieArea: studieArea,
        _fatigueLevel: fatigueLevel,
        _armyLengthOfService: armyLengthOfService, 
        _typeOfJob: typeOfJob,
        _peopleCommand: peopleCommand,
        _headquarters: headquarters,
        _jobLengthOfService: jobLengthOfService,
        _grade : grade,
        _date : this_contexte.createDateFormat()
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
      const {
        initialValues, 
        age,
        gender,
        studieLevel,
        studieArea,
        fatigueLevel,
        armyLengthOfService, 
        typeOfJob,
        peopleCommand,
        headquarters,
        jobLengthOfService,
        grade
      } = this.state
      
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
              Secion 1 : Information personelle
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
                  <Form.Group as={Col} controlId="formBasicInitial">
                    <Form.Label> Initial de votre prenom et nom (Format Prenom Nom)</Form.Label>
                    <Form.Control name="initialValues" value={initialValues} onChange={this.handleChange} type="text" placeholder="Ex : ML (Martin Latouche)" />
                    <Form.Text className="text-muted">
                      Les initial seront conservé de manière anonyme
                    </Form.Text>

                  </Form.Group>    
                  <Form.Group as={Col} controlId="formBasicGender">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select name="gender" defaultValue="default"  onChange={this.handleChange} >
                      {
                        itemListGender.map(({id, key, value, text, disabled})=>(
                          <option id={id} key ={key} value={value} disabled={disabled}>{text} </option> 
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicAge">
                      <Form.Label>Age</Form.Label>
                      <Form.Control name="age" value={age} onChange={this.handleChange} type="number" placeholder="Age" />
                  </Form.Group> 
                  </Row>
                  <Row className="mb-3">             
                  <Form.Group as={Col} controlId="formBasicStudiesLevel">
                    <Form.Label>Quelle est votre niveau d'étude ?</Form.Label>
                    <Form.Select name="studieLevel" defaultValue="default" onChange={this.handleChange} >
                      {
                        iemListStudieLevel.map(({id, key, value, text, disabled})=>(
                          <option id={id} key ={key} value={value} disabled={disabled}>{text} </option> 
                        ))
                      }
                    </Form.Select>
                  </Form.Group>            
                  <Form.Group as={Col} controlId="formBasicStudieArea">
                    <Form.Label>Quelle est votre domaine d'etude ?</Form.Label>
                    <Form.Control name="studieArea" value={studieArea} onChange={this.handleChange} type="text" placeholder="Etudes" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicFatigueEva">
                    <Form.Label>
                      Comment estimé vous votre connaissance sur la thematique Fatigue 
                      (EVA ou echelle allant de 1 à 10 de «Ignorant» à «Expert»)
                    </Form.Label>
                      {
                        itemListFatigueLevel.map(({id, key, label}) => (  
                          <Form.Check 
                            value={fatigueLevel} 
                            onChange={this.handleChange}
                            inline
                            key={key}
                            label={label}
                            name="fatigueLevel"
                            type="radio"
                            id={id} />
                        ))
                      }
                  </Form.Group>
                  </Row>
              <Row>
              <Form.Group as={Col} controlId="formBasicHeadquarters">
                    <Form.Label>
                      A quelle état major appartenait vous ? 
                    </Form.Label>
                    <Form.Select name="headquarters" defaultValue="default" onChange={this.handleChange} >
                      {
                        iemListHeadquarters.map(({id, key, value, text, disabled})=>(
                          <option id={id} key ={key} value={value} disabled={disabled}>{text} </option> 
                        ))
                      }
                      </Form.Select>

                </Form.Group>      
                <Form.Group as={Col} controlId="formBasicarmyLengthOfService">
                    <Form.Label>
                      Depuis combien de temps êtes vous millitaire (en années) ? 
                    </Form.Label>
                    <Form.Control name="armyLengthOfService" value={armyLengthOfService} onChange={this.handleChange} type="number" placeholder="Année de service" />
                </Form.Group> 
                <Form.Group as={Col} controlId="formBasicPeopleCommand">
                    <Form.Label>
                      Combien de personnes avez vous sous votre comandement ? 
                    </Form.Label>
                    <Form.Control name="peopleCommand" value={peopleCommand} onChange={this.handleChange} type="number" placeholder="Nombre de personne sous votre comandement" />
                </Form.Group>    
                </Row>  
                <Row>
                <Form.Group as={Col} controlId="formBasicTypeOfJob">
                    <Form.Label>
                      Quelle est l'initulé de votre poste ?
                    </Form.Label>
                    <Form.Control name="typeOfJob" value={typeOfJob} onChange={this.handleChange} type="text" placeholder="Intitulé de votre poste" />
                </Form.Group> 
                <Form.Group as={Col} controlId="formBasicArmyJobLengthOfService">
                    <Form.Label>
                      Depuis combien de temps êtes vous dans votre poste (en années) ? 
                    </Form.Label>
                    <Form.Control name="jobLengthOfService" value={jobLengthOfService} onChange={this.handleChange} type="number" placeholder="Année dans le poste" />
                </Form.Group> 
                <Form.Group as={Col} controlId="formBasicGrade">
                    <Form.Label>
                      Quelle est votre grade ? 
                    </Form.Label>
                    <Form.Control name="grade" value={grade} onChange={this.handleChange} type="number" placeholder="Entrez votre grade" />
                </Form.Group> 
              <Button onClick={this.handleSubmit}>Passer a la suite</Button>
              </Row>
            </Form>
          </Card>        
      ) 
    }
  }

export default InformationForm;