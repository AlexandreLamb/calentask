import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TagInput from "./TagInput";
import TagComments from "./TagComments";
import TagIndic from "./TagIndic";
import { commonIndicator } from "./formItems";
import api from "../axiosConfig";
import Image from 'react-bootstrap/Image'

class SelfEvaluationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confianceDegree: "",
      selfIndcator: [],
      selfIndcatorDifficulties: [],
      selfIndicfromSuggestions: [],
      commonIndicator: commonIndicator,
      videoDifficultyComment: "",
      videoDifficulty: "",
      displaySelfIndicator: true,
      displayCommonIndicator: false,
      displayConfianceDegree: false,
      displayDifficultyVideo: false,
    };
  }
  handleCheckedElement = (event) => {
    const commonIndicator = this.state.commonIndicator;
    const target = event.target;
    commonIndicator.forEach((commonIndicator) => {
      if (commonIndicator.value === target.value)
        commonIndicator.isChecked = target.checked;
    });
    this.setState({ commonIndicator: commonIndicator });
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleIndic = (tag) => {
    this.setState({ selfIndicfromSuggestions: tag });
  }

  hangleComments = (tag) => {
    this.setState({ selfIndcatorDifficulties: tag });
  }
  handleTag = (tag) => {
    this.setState({ selfIndcator: tag });
  };
  handleTagDifficulties = (tag) => {
    this.setState({ selfIndcatorDifficulties: tag });
  };
  handleSubmit = (event) => {
    /*
        if (this.state.selfIndcator.length == 0) {
          document.getElementById('selfIndcatorValues').style.backgroundColor = '#e8a8a8';
          document.getElementById("errorSelfIndcator").style.display = "block";
        }
    */
    if (
      this.state.displaySelfIndicator == true &&
      this.state.selfIndcator.length != 0
    ) {
      
      this.setState({
        displaySelfIndicator: false,
        displayCommonIndicator: true,
      });

    }
    if (this.state.displayCommonIndicator == true) {
      this.setState({
        displayCommonIndicator: false,
        displayConfianceDegree: true,
      });
    }
    if (this.state.displayConfianceDegree == true) {
      this.setState({
        displayConfianceDegree: false,
        displayDifficultyVideo: true, 
      });
    }
    if (this.state.displayDifficultyVideo == true) {

      const axios = require("axios").default;
      const { confianceDegree, selfIndcator, commonIndicator, videoDifficulty, videoDifficultyComment } = this.state;
      const this_contexte = this;
      const videoName = "_" + this.props.videoFolder.split("/").at(-1);
      const data = {};
      var commonIndicatorChecked = [];
      var selfIndcatorText = [];
      commonIndicator.forEach((element) => {
        if (element.isChecked) {
          commonIndicatorChecked.push(element.value);
        }
      });
      selfIndcator.forEach((element) => {
        selfIndcatorText.push(element.text);
      });

      data["_id"] = this_contexte.props.documentID;
      data[videoName] = {};
      data[videoName + "_evaluation"] = {
        _confianceDegree: confianceDegree,
        _commonIndicator: commonIndicatorChecked,
        _selfIndcator: selfIndcatorText,
        _videoDifficulty: videoDifficulty,
        _videoDifficultyComment: videoDifficultyComment
      };
      api
        .post("output/subject/evaluation/", data)
        .then(function (response) {
          const status_code = response.status;
          if (parseInt(status_code) === 204) {
            // display alert
            console.log("form empty");
          } else if (parseInt(status_code) === 200) {
            this_contexte.props.handleSubmit();
          } else {
            console.log("Error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    event.preventDefault();
  };
  render() {
    const {
      confianceDegree,
      selfIndcator,
      commonIndicator,
      displayCommonIndicator,
      displayConfianceDegree,
      displaySelfIndicator,
      displayDifficultyVideo,
      videoDifficultyComment,
    } = this.state;
    return (
      <Card
        style={{
          borderStyle: "none",
          marginLeft: "7%",
          marginRight: "7%",
          marginTop: "2%"

        }}
      >
        <Card.Title
          style={{
            fontSize: "2rem",
          }}
        >
          <strong>SECTION 3 | AUTO EVALUATION</strong>
        </Card.Title>

        <div
          style={{
          }}>
          <Image fluid={true}
            src="Picture1.png"
            width="100%"
            alt="logo ufv"
          ></Image>{" "}
        </div>

        <Form className='rounded shadow' style={{
          backgroundColor: "rgba(41, 128, 185, 0.1)",
          padding: "1em",
          marginTop: "2%",
        }}>
          <Form.Label
            style={{
              fontSize: "1.5rem"
            }}>
            <strong>INDICATEURS</strong>
          </Form.Label>
          <Row className="mb-3">
            {displaySelfIndicator ? (
              <Form.Group>
                <Form.Label>
                  Afin de mieux comprendre votre processus de classification des vidéos,
                  veuillez nous indiquer quels sont les indicateurs du visage que vous avez utilisés.
                  Vous pouvez lister l'ensemble des indicateurs que vous avez utilisé pour classer les 4 séquences.
                  <br></br>
                  Lister par ordre d'importance vos indicateurs, du plus important (gauche) au moins important (droite).
                  les indicateurs peuvent etre déplacés avec un "cliqué maintené glissé".
                </Form.Label>
                <Form.Label
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                  }}>
                  <strong> Quels indicateurs du visage avez-vous utilisés pour classer les
                    videos ?</strong>
                </Form.Label>
                <div
                  style={{
                  }}>
                  <Image fluid={true}
                    src="Picture4.png"
                    width="100%"
                    alt="logo ufv"
                  ></Image>{" "}
                </div>
                <Form.Group
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    marginTop: "3%"
                  }}>
                  <Form>
                    <TagInput id="selfIndcatorValues" className="rounded"
                      handleTag={this.handleTag}
                    />
                  </Form>
                  <Form className="rounded"
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      backgroundColor: "white"
                    }}>
                    <Form.Label>
                      <strong>Aide</strong>
                    </Form.Label>
                    <Form.Label style={{
                      padding: "0.5rem",
                    }}>
                      Validez avec la touche "Entrer ↵"
                    </Form.Label>
                  </Form>
                </Form.Group>
              </Form.Group>
            ) : null}

            {displayCommonIndicator ? (
              <Form.Group as={Col} controlId="formBasicCommonIndicator">
                <Form.Label>
                  <strong>Vos indicateurs utilisés se trouvent-ils parmi cette liste ?</strong>
                  <div style={{
                    color: "#7e0523",
                    paddingBottom: "1rem",
                  }}>(Plusieurs items possibles à cocher ):</div>
                </Form.Label>
                <div></div>
                {commonIndicator.map(({ id, value, isChecked }) => (
                  <Form.Check className="rounded"
                    style={{
                      padding: '0.5rem',
                      marginLeft: "5%",
                      marginBottom: "2%",
                      textAlign: "initial",
                      backgroundColor: "white",
                    }}>
                    <Form.Check.Input
                      value={value}
                      onChange={this.handleCheckedElement}
                      checked={isChecked}
                      name="commonIndicator"
                      type="checkbox"
                      key={id}
                      style={{ marginRight: "1rem" }}>
                    </Form.Check.Input>
                    <Form.Check.Label>
                      {"         "}{value}
                    </Form.Check.Label>
                  </Form.Check>
                ))}
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
                <Form.Label style={{
                  padding: '0.5rem',
                  marginLeft: "5%",
                  marginBottom: "1%",
                }}>
                  <strong>Vous pouvez ajouter des indicateur ne se trouvant pas la liste ce-dessus</strong>
                </Form.Label>
                <Form
                  style={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    padding: "0.5rem"
                  }}>
                  <TagIndic className="rounded"
                    handleIndic={this.handleIndic}
                    commonIndicator={selfIndcator}
                  />
                </Form>
                <Form className="rounded"
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      marginLeft: "10%",
                      marginRight:" 10%",
                      backgroundColor: "white"
                    }}>
                    <Form.Label>
                      <strong>Aide</strong>
                    </Form.Label>
                    <Form.Label style={{
                      padding: "0.5rem",
                    }}>
                      Validez avec la touche "Entrer ↵"
                    </Form.Label>
                  </Form>
              </Form.Group>
            ) : null}
          </Row>
          <Row className="mb-3">
            {displayConfianceDegree ? (
              <Form.Group as={Col} controlId="formBasicConfianceDegree"
                style={{
                  textAlign: "center",
                  padding: "1rem"
                }}>
                <Form.Label>
                  <strong>Quelle est votre avis sur le degré de confiance du classement
                    que vous venez d'effectuer ? </strong>
                  <div>
                    (EVA allant de 1 à 10 de «Pas du tout confiant» à «Très
                    confiant»)
                  </div>
                </Form.Label>
                <div></div>
                <Form className="rounded"
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    marginTop: "2%",
                    backgroundColor: "white"
                  }}>
                  <Row style={{ marginLeft: "0%", marginRight: "0%" }}>
                    <Form className="col" style={{ fontSize: "12px" }}>
                      <br></br><strong>Pas du tout confiant</strong></Form>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((type) => (
                      <Form.Check className="col">
                        <Form.Check.Label>
                          <strong>{type}</strong>
                        </Form.Check.Label>
                        <br></br>
                        <Form.Check.Input
                          value={type}
                          onChange={this.handleChange}
                          name="confianceDegree"
                          type="radio"
                          key={`level-${type}`}
                        >
                        </Form.Check.Input>
                      </Form.Check>
                    ))}
                    <Form className="col" style={{ fontSize: "12px" }}>
                      <br></br><strong>Très confiant</strong></Form>
                  </Row>
                </Form>
              </Form.Group>
            ) : null}

            {displayDifficultyVideo ? (
              <Form.Group as={Col} controlId="formBasicDifficultyVideo">
                <Form.Label>
                <strong> Comment estimez-vous la difficulté pour retrouver l'ordre des séquences de ce sujet</strong>
                </Form.Label>
                <div></div>
                <Row style={{ marginLeft: "0%", marginRight: "0%" }}>
                  <Form className="col-3"><strong></strong></Form>
                  {["Facile", "Intermédiaire", "Difficile"].map((type) => (
                    <Form.Check className="col-2" style={{ textAlign: "center" }}>
                      <Form.Check.Label>
                        <strong>{type}</strong>
                      </Form.Check.Label>
                      <br></br>
                      <Form.Check.Input
                        value={type}
                        onChange={this.handleChange}
                        name="videoDifficulty"
                        type="radio"
                        key={`level-${type}`}
                      >
                      </Form.Check.Input>
                    </Form.Check>
                  ))}
                  <Form className="col-3"><strong></strong></Form>
                </Row>

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

                <Form.Label>
                <strong>Pour quelle(s) raison(s) ?</strong>
                </Form.Label>
                <Form>
                  <TagComments className="rounded"
                    handleComments={this.hangleComments}
                  />
                </Form>

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

                <Form.Label>
                 <strong>Donnez-nous votre avis</strong>
                </Form.Label>
                <Form.Control
                  style={{
                    margin: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "solid 0px#165b0a",
                    with: "70%",
                  }}
                  name="videoDifficultyComment"
                  value={videoDifficultyComment}
                  onChange={this.handleChange}
                  as="textarea"
                  placeholder="Commentaire long"
                />
              </Form.Group>
            ) : null}
          </Row>
        </Form>
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
              width: "15%",
            }}
            onClick={this.handleSubmit}>
            <Image fluid={true}
              src="Picture3.png"
              width="100%"
              alt="logo ufv"
            ></Image>{" "}
          </Button>
        </Form>
      </Card>
    );
  }
}

export default SelfEvaluationForm;
