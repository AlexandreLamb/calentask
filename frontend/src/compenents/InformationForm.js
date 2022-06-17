import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  itemListGender,
  iemListStudieLevel,
  itemListFatigueLevelTheorical,
  itemListFatigueLevelPratical,
  iemListGrade,
  iemListHeadquarters,
  iemListStudieLevelStudent,
} from "./formItems";
import { getLocalState } from "../utils";
import api from "../axiosConfig";

class InformationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: getLocalState("initialValues", ""),
      age: getLocalState("age", ""),
      gender: getLocalState("gender", "default"),
      studieLevel: getLocalState("studieLevel", "default"),
      studieArea: getLocalState("studieArea", ""),
      fatigueLevelTheorical: getLocalState("fatigueLevelTheorical", ""),
      fatigueLevelPratical: getLocalState("fatigueLevelPratical", ""),
      armyLengthOfService: getLocalState("armyLengthOfService", ""),
      typeOfJob: getLocalState("typeOfJob", ""),
      peopleCommand: getLocalState("peopleCommand", ""),
      headquarters: getLocalState("headquarters", "default"),
      jobLengthOfService: getLocalState("jobLengthOfService", ""),
      grade: getLocalState("grade", "default"),
    };
  }
  componentDidMount = () => {
    if (this.props.clearLocalStorage) {
      const state = {
        initialValues: getLocalState("initialValues", ""),
        age: getLocalState("age", ""),
        gender: getLocalState("gender", "default"),
        studieLevel: getLocalState("studieLevel", "default"),
        studieArea: getLocalState("studieArea", ""),
        fatigueLevelTheorical: getLocalState("fatigueLevelTheorical", ""),
        fatigueLevelPratical: getLocalState("fatigueLevelPratical", ""),  
        armyLengthOfService: getLocalState("armyLengthOfService", ""),
        typeOfJob: getLocalState("typeOfJob", ""),
        peopleCommand: getLocalState("peopleCommand", ""),
        headquarters: getLocalState("headquarters", "default"),
        jobLengthOfService: getLocalState("jobLengthOfService", ""),
        grade: getLocalState("grade", ""),
      };
      this.setState(state);
    }
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "radio" ? target.id : target.value;
    const name = target.name;
    this.setState({ [name]: value }, () => {
      localStorage.setItem("state", JSON.stringify(this.state));
    });
  };
  createDateFormat = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return mm + "/" + dd + "/" + yyyy;
  };
  handleSubmit = (event) => {
    const {
      initialValues,
      age,
      gender,
      studieLevel,
      studieArea,
      fatigueLevelTheorical,
      fatigueLevelPratical,
      armyLengthOfService,
      typeOfJob,
      peopleCommand,
      headquarters,
      jobLengthOfService,
      grade,
    } = this.state;
    const this_contexte = this;
    api
      .post("output/subject/information/", {
        _initialValues: initialValues,
        _age: age,
        _gender: gender,
        _studieLevel: studieLevel,
        _sutdieArea: studieArea,
        _fatigueLevelTheorical: fatigueLevelTheorical,
        _fatigueLevelPratical: fatigueLevelPratical,
        _armyLengthOfService: armyLengthOfService,
        _typeOfJob: typeOfJob,
        _peopleCommand: peopleCommand,
        _headquarters: headquarters,
        _jobLengthOfService: jobLengthOfService,
        _grade: grade,
        _date: this_contexte.createDateFormat(),
      })
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          // display alert
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          this_contexte.props.handleSubmit(response.data);
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  };
  render() {
    const {
      initialValues,
      age,
      gender,
      studieLevel,
      studieArea,
      fatigueLevelTheorical,
      fatigueLevelPratical,
      armyLengthOfService,
      typeOfJob,
      peopleCommand,
      headquarters,
      jobLengthOfService,
      grade,
    } = this.state;

    return (
      <Card
        style={{
          borderLeftStyle: "none",
        }}
      >
        <Card.Title
          style={{
            textAlign: "center",
            fontSize: "1.50rem",
          }}
        >
          Section 1 : Informations personnelles
        </Card.Title>
        <Form
          style={{
            width: "100%",
            margin: "auto",
            textAlign: "center",
            fontSize: "1.25rem",
          }}
        >
          <Row
            className="mb-3"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            <Form.Group as={Col} controlId="formBasicInitial">
              <Form.Label>
                Initiales de votre prénom et nom ? <div>&nbsp;</div>
              </Form.Label>
              <Form.Control
                name="initialValues"
                value={initialValues}
                onChange={this.handleChange}
                type="text"
                placeholder="Ex : ML (Martin Latouche)"
              />
              <Form.Text className="text-muted">
                Les initiales seront conservées de manière anonyme
              </Form.Text>
            </Form.Group>
            {this.props.studentMode ?
            <Form.Group as={Col} controlId="formBasicGrade">
              <Form.Label>
                Quel est votre grade ? <div>&nbsp;</div>
              </Form.Label>
              <Form.Select
                name="grade"
                value={grade}
                onChange={this.handleChange}
              >
                {iemListGrade.map(
                  ({ id, key, value, text, disabled }) => (
                    <option id={id} key={key} value={value} disabled={disabled}>
                      {text}{" "}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group> : null}
            {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicHeadquarters">
              <Form.Label>
                A quel Etat-major appartenez-vous ? <div>&nbsp;</div>
              </Form.Label>
              <Form.Select
                name="headquarters"
                value={headquarters}
                onChange={this.handleChange}
              >
                {iemListHeadquarters.map(
                  ({ id, key, value, text, disabled }) => (
                    <option id={id} key={key} value={value} disabled={disabled}>
                      {text}{" "}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group> : null}
            
          </Row>
          <Row
            className="mb-3"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicTypeOfJob">
              <Form.Label>Quel est votre intutilé de spécialité ?</Form.Label>
               <Form.Control
                name="typeOfJob"
                value={typeOfJob}
                onChange={this.handleChange}
                type="text"
                placeholder="Intitulé de votre poste"
              />  
            </Form.Group> : null}
            <Form.Group as={Col} controlId="formBasicGender">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                name="gender"
                value={gender}
                onChange={this.handleChange}
              >
                {itemListGender.map(({ id, key, value, text, disabled }) => (
                  <option id={id} key={key} value={value} disabled={disabled}>
                    {text}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                name="age"
                value={age}
                onChange={this.handleChange}
                type="number"
                placeholder="Age"
              />
            </Form.Group>
          </Row>
          <Row
            className="mb-3"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            <Form.Group as={Col} controlId="formBasicStudiesLevel">
              <Form.Label>
                Quel est votre niveau d'étude ? <div>&nbsp;</div>
              </Form.Label>
              <br />
              <Form.Select
                name="studieLevel"
                value={studieLevel}
                onChange={this.handleChange}
              >
                {this.props.studentMode ? iemListStudieLevel.map(
                  ({ id, key, value, text, disabled }) => (
                    <option id={id} key={key} value={value} disabled={disabled}>
                      {text}{" "}
                    </option>
                  )
                ) : iemListStudieLevelStudent.map(
                  ({ id, key, value, text, disabled }) => (
                    <option id={id} key={key} value={value} disabled={disabled}>
                      {text}{" "}
                    </option>
                  )
                )
                }
              </Form.Select>
            </Form.Group>
            {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicarmyLengthOfService">
              <Form.Label>
                Depuis combien de temps êtes vous millitaire (en années) ?
              </Form.Label>
              <Form.Control
                name="armyLengthOfService"
                value={armyLengthOfService}
                onChange={this.handleChange}
                type="number"
                placeholder="Année de service"
              />
            </Form.Group> : null}
            {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicPeopleCommand">
              <Form.Label>
                Combien de personnes avez-vous sous votre commandement ?
              </Form.Label>
              <Form.Control
                name="peopleCommand"
                value={peopleCommand}
                onChange={this.handleChange}
                type="number"
                placeholder="Nombre de personne sous votre commandement"
              />
            </Form.Group> : null}
          </Row>
          <Row
            className="mb-3"
            style={{
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >{this.props.studentMode ?
            <Form.Group as={Col} controlId="formBasicArmyJobLengthOfService">
              <Form.Label>
                Depuis combien de temps êtes-vous dans votre poste (en années) ? <div>&nbsp;</div>
              </Form.Label>
              <Form.Control
                name="jobLengthOfService"
                value={jobLengthOfService}
                onChange={this.handleChange}
                type="number"
                placeholder="Année dans le poste"
              />
            </Form.Group> : null }
            <Form.Group as={Col} controlId="formBasicStudieArea">
              <Form.Label>Quel est votre domaine d'étude ? <div>&nbsp;</div></Form.Label>
              <Form.Control
                name="studieArea"
                value={studieArea}
                onChange={this.handleChange}
                type="text"
                placeholder="Etudes"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formBasicFatigueTheoricalEva">
              <Form.Label>
              Comment estimez-vous votre connaissance théorique de la fatigue mentale ?
                <div>
                  (EVA ou echelle allant de 1 à 10 de «Ignorant» à «Expert»)
                </div>
              </Form.Label>
              <div>&nbsp;</div>
              {itemListFatigueLevelTheorical.map(({ id, key, label }) => (
                <Form.Check
                  value={fatigueLevelTheorical}
                  onChange={this.handleChange}
                  inline
                  checked={parseInt(fatigueLevelTheorical) === id}
                  key={key}
                  label={label}
                  name="fatigueLevelTheorical"
                  type="radio"
                  id={id}
                />
              ))}
            </Form.Group>
            <div>&nbsp;</div>
            <Form.Group as={Col} controlId="formBasicFatiguePraticalEva">
              <Form.Label>
              Comment estimez-vous votre connaissance pratique de la fatigue mentale ?
                <div>
                  (EVA ou echelle allant de 1 à 10 de «Ignorant» à «Expert»)
                </div>
              </Form.Label>
              <div>&nbsp;</div>
              {itemListFatigueLevelPratical.map(({ id, key, label }) => (
                <Form.Check
                  value={fatigueLevelPratical}
                  onChange={this.handleChange}
                  inline
                  checked={parseInt(fatigueLevelPratical) === id}
                  key={key}
                  label={label}
                  name="fatigueLevelPratical"
                  type="radio"
                  id={id}
                />
              ))}
            </Form.Group>
            <div>&nbsp;</div>
            <Form.Group>
              <Button onClick={this.handleSubmit}>Passer à la suite</Button>
            </Form.Group>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default InformationForm;
