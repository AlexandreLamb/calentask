import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'

import '../App.css';

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
      bgColor: "#f8f3f3",
      check: ""
    };
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.ref3 = React.createRef();
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
    var ref1 =0;
    var ref2 =0;
    var ref3 =0;
  
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

    if (this.state.initialValues == null || this.state.initialValues === "") {
      document.getElementById('initialValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorInitiale").style.display = "block";
      ref1=1;
    } else {
      document.getElementById('initialValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorInitiale").style.display = "none";
    }

    if ((this.state.age === "") || (this.state.age < 0)) {
      document.getElementById('ageValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorAge").style.display = "block";
      ref1=1;
    } else {
      document.getElementById('ageValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorAge").style.display = "none";
    }

    if (this.state.gender === "default") {
      document.getElementById('genderValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorGender").style.display = "block";
      ref1=1;
    } else {
      document.getElementById('genderValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorGender").style.display = "none";
    }

    if (this.state.studieLevel === "default") {
      document.getElementById('studieLevelValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorStudieLevel").style.display = "block";
      ref2=1;
    } else {
      document.getElementById('studieLevelValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorStudieLevel").style.display = "none";
    }
    if (this.state.studieArea === "") {
      document.getElementById('studieAreaValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorStudieArea").style.display = "block";
      ref2=1;
    } else {
      document.getElementById('studieAreaValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorStudieArea").style.display = "none";
    }

    if (this.state.typeOfJob === "" && this.props.studentMode === true ) {
      document.getElementById('typeOfJobValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorTypeOfJob").style.display = "block";
      ref2=1;
    } else if (this.props.studentMode === true){
      document.getElementById('typeOfJobValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorTypeOfJob").style.display = "none";
    }

    if (this.state.peopleCommand === "" && this.props.studentMode === true ) {
      document.getElementById('peopleCommandValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorPeopleCommand").style.display = "block";
      ref2=1;
    } else if (this.props.studentMode === true){
      document.getElementById('peopleCommandValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorPeopleCommand").style.display = "none";
    }

    if (this.state.grade === "default" && this.props.studentMode === true ) {
      document.getElementById('gradeValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorGrade").style.display = "block";
      ref2=1;
    } else if (this.props.studentMode === true){
      document.getElementById('gradeValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorGrade").style.display = "none";
    }

    if (this.state.jobLengthOfService === "" && this.props.studentMode === true) {
      document.getElementById('jobLengthOfServiceValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorJobLengthOfService").style.display = "block";
      ref2=1;
    } else if (this.props.studentMode === true){
      document.getElementById('jobLengthOfServiceValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorJobLengthOfService").style.display = "none";
    }

    if (this.state.headquarters === "default"  && this.props.studentMode === true )  {
      document.getElementById('headquartersValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorHeadquarters").style.display = "block";
      ref2=1;
    } else if (this.props.studentMode === true){
      document.getElementById('headquartersValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorHeadquarters").style.display = "none";
    }

    if (this.state.armyLengthOfService === "" && this.props.studentMode === true ) {
      document.getElementById('armyLengthOfServiceValues').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorArmyLengthOfService").style.display = "block";
      ref2=1;
    } else if (this.props.studentMode === true){
      document.getElementById('armyLengthOfServiceValues').style.backgroundColor = '#f8f3f3';
      document.getElementById("errorArmyLengthOfService").style.display = "none";
    }
    if (this.state.fatigueLevelTheorical === "" )  {
      document.getElementById('testest').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorfatigueLevelTheorical").style.display = "block";
      ref3 = 1;
    } else  {
      document.getElementById('testest').style.backgroundColor = 'rgba(41, 128, 185, 0)';
      document.getElementById("errorfatigueLevelTheorical").style.display = "none";
    } 

    if (this.state.fatigueLevelPratical === "" )  {

      document.getElementById('test').style.backgroundColor = '#e8a8a8';
      document.getElementById("errorFatigueLevel").style.display = "block";
      ref3 = 1;
    } else  {
      document.getElementById('test').style.backgroundColor = 'rgba(41, 128, 185, 0)';
      document.getElementById("errorFatigueLevel").style.display = "none";
    } 

    if (ref1 == 1) {
      this.ref1.current.scrollIntoView();
    } 
    if (ref2 == 1 && ref1 == 0) {
      this.ref2.current.scrollIntoView();
    } 
    if (ref3 == 1 && ref1 == 0 && ref2 == 0) {
      this.ref3.current.scrollIntoView();
    } 

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
          borderStyle: "none",
        }}
      >
        <Card.Title
          style={{
            marginLeft: "5%",
            fontSize: "2rem",
          }}
        >
          <strong>SECTION 1 | RENSEIGNEMENT</strong>
        </Card.Title>

        <div
          style={{
            marginLeft: "5%",
            marginRight: "5%",
          }}>
          <Image fluid={true}
            src="Picture1.png"
            width="100%"
            alt="logo ufv"
          ></Image>{" "}
        </div>

        <Form
          style={{
            width: "100%",
            margin: "auto",
            fontSize: "1 rem",
          }}
        >
          <Form  ref={this.ref1}>
            <Form.Label
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "2%",
                marginBottom: "2%",
                fontSize: "1.5rem"
              }}
            >
              <strong>INFORMATIONS PERSONNELLES</strong>
            </Form.Label>
          </Form>
         
          <Form
            className="mb-3 rounded shadow"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              padding: "1rem",
              backgroundColor: "rgba(41, 128, 185, 0.1)",
            }}
           
          >

            <Row
              className="mb-3 rounded"
              style={{
                marginLeft: "3%",
                marginRight: "3%",
              }}
            >
              <Form.Group as={Col} controlId="formBasicInitial"
                style={{
                  width: "97%",
                  margin: "auto",
                  fontSize: "1rem",
                  margin: "0.1rem",
                }}
              >
                <Form.Label
                  style={{
                    marginTop: "3%"
                  }}
                >

                  <strong>Initiales</strong>
                </Form.Label>
                <Form.Control
                  name="initialValues"
                  id="initialValues"
                  value={initialValues}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Ex : ML (Martin Latouche)"
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                />
                <Form.Text className="text-muted"
                  style={{
                    fontSize: "0.75rem",
                  }}>
                  Les initiales seront conservées de manière anonyme
                </Form.Text>
                <Form.Label
                  id="errorInitiale"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicGender"
                style={{
                  width: "100%",
                  margin: "auto",
                  fontSize: "1rem",
                  margin: "0.1rem",
                }}
              >
                <Form.Label
                  style={{
                    marginTop: "3%"
                  }}
                >
                  <strong>Genre</strong>
                </Form.Label>
                <Form.Select
                  id="genderValues"
                  name="gender"
                  value={gender}
                  onChange={this.handleChange}
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                >
                  {itemListGender.map(({ id, key, value, text, disabled }) => (
                    <option id={id} key={key} value={value} disabled={disabled}>
                      {text}{" "}
                    </option>
                  ))}
                </Form.Select>
                <Form.Label
                  id="errorGender"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicAge"
                style={{
                  width: "100%",
                  margin: "auto",
                  fontSize: "1em",
                  margin: "0.1rem",
                }}
              >
                <Form.Label
                  className="MarianneBold"
                  style={{
                    marginTop: "3%"
                  }}
                >
                  <strong>Age</strong>
                </Form.Label>
                <Form.Control
                  name="age"
                  id="ageValues"
                  value={age}
                  onChange={this.handleChange}
                  type="number"
                  placeholder="Age"
                  min="0"
                  max="110"
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                />
                <Form.Label
                  id="errorAge"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de renseigner un age valide.</strong>
                </Form.Label>
              </Form.Group>
            </Row>
          </Form>

          <Form className="align-items-center"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              textAlign: "center",
              marginTop: "4%",
              marginBottom: "1%",
            }}>
            <Row>
              <Form className="col-5"></Form>
              <Form className="col-2">
                <Image fluid={true}
                  src="Picture2.png"
                  width="100%"
                  alt="logo ufv"
                ></Image>{" "}
              </Form>
              <Form className="col-5"></Form>
            </Row>
          </Form>

          <Form  ref={this.ref2}>
            <Form.Label
              style={{
                marginTop: "2%",
                marginBottom: "1%",
                marginLeft: "5%",
                marginRight: "5%",
                fontSize: "1.5rem"
              }}

            >
              <strong>PARCOURS PROFESSIONNEL</strong>
            </Form.Label>
          </Form>

          <Form className="rounded shadow"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              border: "solid black 0px",
              padding: "1rem",
              backgroundColor: "rgba(41, 128, 185, 0.1)",
            }}
          >
            <Row
              className="mb-3"
              style={{
                margin: "0.1rem",
              }}
            >
              {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicHeadquarters"
                style={{
                  width: "100%",
                  margin: "auto",
                  fontSize: "1rem",
                }}>
                <Form.Label
                  style={{
                  
                  }}>
                  <strong>Etat-major</strong>
                </Form.Label>
                <Form.Select
                  name="headquarters"
                  id="headquartersValues"
                  value={headquarters}
                  onChange={this.handleChange}
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                >
                  {iemListHeadquarters.map(
                    ({ id, key, value, text, disabled }) => (
                      <option id={id} key={key} value={value} disabled={disabled}>
                        {text}{" "}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Label
                  id="errorHeadquarters"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group> : null}

              {this.props.studentMode ?
                <Form.Group as={Col} controlId="formBasicGrade"
                  style={{
                    width: "100%",
                    margin: "auto",
                    fontSize: "1rem",
                  }}>
                  <Form.Label
                    style={{
                      
                    }}>
                    <strong>Grade</strong>
                  </Form.Label>
                  <Form.Select
                    name="grade"
                    id="gradeValues"
                    value={grade}
                    onChange={this.handleChange}
                    style={{
                      border: "solid black 2px",
                      background: this.state.bgColor
                    }}
                  >
                    {iemListGrade.map(
                      ({ id, key, value, text, disabled }) => (
                        <option id={id} key={key} value={value} disabled={disabled}>
                          {text}{" "}
                        </option>
                      )
                    )}
                  </Form.Select>
                  <Form.Label
                    id="errorGrade"
                    style={{
                      display: "none",
                      color: "#aa4646",
                      fontSize: "0.75rem",
                    }}>
                    <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                  </Form.Label>
                </Form.Group> : null}

              {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicPeopleCommand">
                <Form.Label
                  style={{
                  
                  }}>
                  <strong>Commandement</strong>
                </Form.Label>
                <Form.Control
                  name="peopleCommand"
                  id="peopleCommandValues"
                  value={peopleCommand}
                  onChange={this.handleChange}
                  type="number"
                  min="0"
                  placeholder="Nombre de personne sous votre commandement"
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                />
                <Form.Label
                  id="errorPeopleCommand"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group> : null}
            </Row>

            <Row
              className="mb-3"
              style={{
                margin: "0.1rem",
              }}
            >
              <Form.Group as={Col} controlId="formBasicStudieArea">
                <Form.Label
                  style={{
                    fontSize: "1rem",
                  }}>
                  <strong>Spécialité</strong></Form.Label>
                <Form.Control
                  name="studieArea"
                  id="studieAreaValues"
                  value={studieArea}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Etudes"
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                />
                <Form.Label
                  id="errorStudieArea"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group>

              {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicTypeOfJob"
                style={{
                  fontSize: "1rem",
                }}>
                <Form.Label
                  style={{
                   
                  }}>
                  <strong>Intitulé de spécialité</strong></Form.Label>
                <Form.Control
                  name="typeOfJob"
                  id="typeOfJobValues"
                  value={typeOfJob}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Intitulé de votre spécialité"
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                />
                <Form.Label
                  id="errorTypeOfJob"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group> : null}

              <Form.Group as={Col} controlId="formBasicStudiesLevel">
                <Form.Label
                  style={{
                   
                  }}>
                  <strong>Niveau d'étude</strong>
                </Form.Label>
                <Form.Select
                  name="studieLevel"
                  id="studieLevelValues"
                  value={studieLevel}
                  onChange={this.handleChange}
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
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
                <Form.Label
                  id="errorStudieLevel"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row
              className="mb-3"
              style={{
                margin: "0.1rem",
              }}>

              {this.props.studentMode ? <Form.Group as={Col} controlId="formBasicarmyLengthOfService">
                <Form.Label>
                  <strong>Année de service</strong>
                </Form.Label>
                <Form.Control
                  name="armyLengthOfService"
                  id="armyLengthOfServiceValues"
                  value={armyLengthOfService}
                  onChange={this.handleChange}
                  type="number"
                  min="0"
                  placeholder="Année de service"
                  style={{
                    border: "solid black 2px",
                    background: this.state.bgColor
                  }}
                />
                <Form.Label
                  id="errorArmyLengthOfService"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group> : null}

              {this.props.studentMode ?
                <Form.Group as={Col} controlId="formBasicArmyJobLengthOfService">
                  <Form.Label>
                    <strong>Année dans votre poste</strong>
                  </Form.Label>
                  <Form.Control
                    name="jobLengthOfService"
                    id="jobLengthOfServiceValues"
                    value={jobLengthOfService}
                    onChange={this.handleChange}
                    type="number"
                    min="0"
                    placeholder="Année dans votre poste"
                    style={{
                      border: "solid black 2px",
                      background: this.state.bgColor
                    }}
                  />
                  <Form.Label
                    id="errorJobLengthOfService"
                    style={{
                      display: "none",
                      color: "#aa4646",
                      fontSize: "0.75rem",
                    }}>
                    <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                  </Form.Label>
                </Form.Group> : null}
            </Row>
          </Form>

          <Form className="align-items-center"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              textAlign: "center",
              marginTop: "4%",
              marginBottom: "1%",
            }}>
            <Row>
              <Form className="col-5"></Form>
              <Form className="col-2">
                <Image fluid={true}
                  src="Picture2.png"
                  width="100%"
                  alt="logo ufv"
                ></Image>{" "}
              </Form>
              <Form className="col-5"></Form>
            </Row>
          </Form>

          <Form.Label
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "2%",
              marginBottom: "2%",
              fontSize: "1.5rem",
            }}
            ref={this.ref3}
          >
            <strong>QUESTIONS PRELIMINAIRES</strong>
          </Form.Label>


          <Form className="rounded shadow"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              fontSize: "1rem",
              padding: "1rem",
              backgroundColor: "rgba(41, 128, 185, 0.1)",
              textAlign: "center"
            }}
          >
            <Row>
              <Form.Group as={Col} class = "rounded" controlId="formBasicFatigueTheoricalEva" id="testest">
                <Form.Label>
                  <strong>Comment estimez-vous votre connaissance théorique de la fatigue mentale ?</strong>
                  <div>
                    (EVA ou echelle allant de 1 à 10 de «Ignorant» à «Expert»)
                  </div>
                </Form.Label>
                <div>&nbsp;</div>
                <Form.Group style={{ textAlign: "center" }}>
                  <Row style={{ marginLeft: "10%", marginRight: "10%" }}>
                    <Form className="col">Ignorant</Form>
                    {itemListFatigueLevelTheorical.map(({ id, key, label }) => (
                      <Form.Check className="col">
                        <Form.Check.Label><strong>{label}</strong></Form.Check.Label>
                        <br></br>
                        <Form.Check.Input
                          value={fatigueLevelTheorical}
                          onChange={this.handleChange}
                          inline
                          checked={parseInt(fatigueLevelTheorical) === id}
                          key={key}
                          name="fatigueLevelTheorical"
                          type="radio"
                          id={id}>
                        </Form.Check.Input>
                      </Form.Check>
                    ))}
                    <Form className="col">Expert</Form>
                  </Row>
                </Form.Group>
                <Form.Label
                  id="errorfatigueLevelTheorical"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group>
              <div>&nbsp;</div>

              <Form.Group as={Col} controlId="formBasicFatiguePraticalEva"
              id = "test"
                style={{
                  fontSize: "1rem",
                }}>
                <Form.Label>
                  <strong>Comment estimez-vous votre connaissance pratique de la fatigue mentale ?</strong>
                  <div>
                    (EVA ou echelle allant de 1 à 10 de «Ignorant» à «Expert»)
                  </div>
                </Form.Label>
                <div>&nbsp;</div>
                <Form.Group style={{ textAlign: "center" }}>
                  <Row style={{ marginLeft: "10%", marginRight: "10%" }}>
                    <Form className="col">Ignorant</Form>
                    {itemListFatigueLevelPratical.map(({ id, key, label }) => (
                      <Form.Check className="col">
                        <Form.Check.Label><strong>{label}</strong></Form.Check.Label>
                        <br></br>
                        <Form.Check.Input
                          type="radio"
                          id={id}
                          value={fatigueLevelPratical}
                          onChange={this.handleChange}
                          checked={parseInt(fatigueLevelPratical) === id}
                          key={key}
                          name="fatigueLevelPratical"
                          inline
                        >
                        </Form.Check.Input>
                      </Form.Check>
                    ))}
                    <Form className="col">Expert</Form>
                  </Row>
                </Form.Group>
                <Form.Label
                  id="errorFatigueLevel"
                  style={{
                    display: "none",
                    color: "#aa4646",
                    fontSize: "0.75rem",
                  }}>
                  <strong>Nous avons besoin de cette information. Merci de la renseigner.</strong>
                </Form.Label>
              </Form.Group>
            </Row>
          </Form>

          <Form.Group style={{
            width: "auto",
            marginLeft: "5%",
            marginTop: "4%",
            marginRight: "5%",
            textAlign: "center"
          }}>
            <Form
              id="ContainerConditions"
              className="rounded"
              style={{ textAlign: "center", fontSize: "1rem", marginTop: "2%", width: "100%" }}>
              <Form.Check
                type="checkbox"
                inline
                value="1"
                label="J'accepte les termes et les conditions d'utilisations."
                id="invalidCheck"
                key="invalidCheck"
                required
              />
              <Form.Label
                id="conditions"
                style={{
                  display: "none",
                  color: "#aa4646",
                }}>
                <strong>Vous devez accepter les conditions d'utilisations. Merci.</strong>
              </Form.Label>
            </Form >
          </Form.Group>

          <Form
            style={{
              width: "auto",
              marginLeft: "5%",
              marginTop: "3%",
              marginRight: "5%",
              textAlign: "center"
            }}>

            <Button
              style={{
                backgroundColor: "white",
                border: "solid 0px black",
                width: "8rem",
              }}
              onClick={this.handleSubmit}>
              <Image fluid={true}
                src="Picture3.png"
                width="100%"
                alt="logo ufv"
              ></Image>{" "}
            
            </Button>
            Page suivante
          </Form>
        </Form>
      </Card >
    );
  }
}
export default InformationForm;
