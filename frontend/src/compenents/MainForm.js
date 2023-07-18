import React from "react";
import InformationForm from "./InformationForm";
import VideoForm from "./VideoForm";
import VideoScreen from "./VideoScreen";
import SelfEvaluationForm from "./SelfEvaluationForm";
import Card from "react-bootstrap/Card";
import Button from "@restart/ui/esm/Button";
import api from "../axiosConfig";
import Image from 'react-bootstrap/Image'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ReactPlayer from 'react-player';
import Spinner from 'react-bootstrap/Spinner';

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      displayInformationForm: true,
      displayVideoForm: false,
      displaySelfEvaluationForm: false,
      displayScreenNoVideo: false,
      documentID: null,
      videoLetter: "A",
      videoNotAvailable: [],
      numberOfView: 0,
      sequence: {
        A: {
          numberOfViews: 0,
        },
        B: {
          numberOfViews: 0,
        },
        C: {
          numberOfViews: 0,
        },
        D: {
          numberOfViews: 0,
        },
      },
      videosToPlay: [],
      currentVideoIndex: 0,
      clearLocalStorage: false,
      studentMode: false,

    };
  }
  getStudentMode = () => {
    const this_contexte = this;
    api
      .get("configuration/get/student")
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          this_contexte.setState({
            studentMode: response.data,
          });
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getVideoToLoad = () => {
    const this_contexte = this;
    api
      .get("configuration/get/video/list")
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("No video in list");
        } else if (parseInt(status_code) === 200) {
          this_contexte.setState({
            videosToPlay: response.data
          });
          if (response.data.length == 0){
            this_contexte.setState({
              displayInformationForm : false,
              displayScreenNoVideo : true
            })
          }
          console.log("Video to play:" + response.data)

        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount = () => {
    this.getVideoToLoad();
    this.getStudentMode();
 
    console.log(process.env.REACT_APP_FLASK_URL)
  };
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleSubmitInformationForm = (_documentID) => {
    this.setState({
      documentID: _documentID,
      displayInformationForm: false,
      displayVideoForm: true,
    });
  };
  handleSubmitSelfEvaluationForm = () => {
    this.setState({
      displaySelfEvaluationForm: false,
    });
  };
  handlePlay = () => {
    this.setState({
      playing: true,
    });
  };
  handleEnd = (videoLetter, isStopWatchingVideo) => {
    const sequence = this.state.sequence;
    sequence[videoLetter] = {
      numberOfViews: sequence[videoLetter].numberOfViews + 1,
    };
    this.setState({
      sequence: sequence,
      playing: false,
    });
    if (isStopWatchingVideo) {
      this.setState({
        displayVideoForm: false,
        displaySelfEvaluationForm: true,
      });
    }
  };
  handleEnded = (isStopWatchingVideo, popVideo) => {
    const videoLetter = this.state.videoLetter;
    const videoNotAvailable = this.state.videoNotAvailable;
    if (popVideo == true) {
      this.setState({
        videoNotAvailable: [...videoNotAvailable, videoLetter],
      });
    }
    if (videoLetter !== "D" && isStopWatchingVideo === false) {
      console.log("enter in if");
      const sequence = this.state.sequence;
      sequence[videoLetter] = {
        numberOfViews: sequence[videoLetter].numberOfViews + 1,
      };
      this.setState({
        sequence: sequence,
      });
      let newVideoLetter = String.fromCharCode(videoLetter.charCodeAt() + 1);
      while (this.state.videoNotAvailable.includes(newVideoLetter)) {
        if (newVideoLetter === "D") {
          newVideoLetter = "A";
        } else {
          newVideoLetter = String.fromCharCode(newVideoLetter.charCodeAt() + 1);
        }
      }
      this.setState({
        playing: false,
        videoLetter: newVideoLetter,
      });
      console.log(this.state.videoLetter);
      console.log(isStopWatchingVideo);
    } else if (isStopWatchingVideo) {
      this.setState({
        displayVideoForm: false,
        displaySelfEvaluationForm: true,
      });
    } else if (videoLetter === "D" && isStopWatchingVideo === false) {
      let newVideoLetter = "A";
      while (this.state.videoNotAvailable.includes(newVideoLetter)) {
        newVideoLetter = String.fromCharCode(newVideoLetter.charCodeAt() + 1);
      }
      const sequence = this.state.sequence;
      sequence[videoLetter] = {
        numberOfViews: sequence[videoLetter].numberOfViews + 1,
      };
      this.setState({
        playing: false,
        videoLetter: newVideoLetter,
        numberOfView: this.state.numberOfView + 1,
        sequence: sequence,
      });
    }
  };
  handleNextVideo = (event) => {
    this.setState({
      currentVideoIndex: this.state.currentVideoIndex + 1,
      sequence: {
        A: {
          numberOfViews: 0,
        },
        B: {
          numberOfViews: 0,
        },
        C: {
          numberOfViews: 0,
        },
        D: {
          numberOfViews: 0,
        },
      },
      videoNotAvailable: [],
      videoLetter: "A",
      displayInformationForm: false,
      displayVideoForm: true,
      displaySelfEvaluationForm: false,
    });

    event.preventDefault();
  };
  handleBackToMenue = () => {
    localStorage.setItem("state", JSON.stringify({}));
    const state = {
      playing: false,
      displayInformationForm: true,
      displayVideoForm: false,
      displaySelfEvaluationForm: false,
      documentID: null,
      videoLetter: "A",
      videoNotAvailable: [],
      numberOfView: 0,
      sequence: {
        A: {
          numberOfViews: 0,
        },
        B: {
          numberOfViews: 0,
        },
        C: {
          numberOfViews: 0,
        },
        D: {
          numberOfViews: 0,
        },
      },
      videosToPlay: [],
      currentVideoIndex: 0,
      clearLocalStorage: true,
    };
    this.setState(state);
  };

  checkVideoList = () => {
  this.getVideoToLoad()
  };


  render() {
    const {
      playing,
      displayInformationForm,
      displayVideoForm,
      displaySelfEvaluationForm,
      displayScreenNoVideo,
      documentID,
      videoLetter,
      numberOfView,
      sequence,
      videosToPlay,
      currentVideoIndex,
      clearLocalStorage,
    } = this.state;
    return (
      <Card
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#e7edf6",
        }}>

        <Card
          className="shadow align-items-center"
          style={{
            width: "70%",
            margin: "auto",
            marginTop: "2%",
            marginBottom: "2%",
            padding: "0.2rem",
            border: "black solid 0px",
          }}
        >
          {playing === false ? (
            <Card.Title
              className="rounded-lg"
              style={{
                textAlign: "center",
                fontSize: "1rem",
                padding: "1rem",
                border: "black solid 0px",
                margin: "3%"
              }}
            >
              <div>
              <Image fluid={true}
                  src="logo_esco.png"
                  width="16%"
                  alt="logo ufv"
                ></Image>{" "}
              </div>
              <div style={{
                fontSize: "3rem",
                padding: "0.5rem"
              }}>
                <strong>ETUDE CLAVIF</strong>
              </div>
              <div className="lead text-justify" style={{
                padding: "0.5rem",
                marginLeft: "10%",
                marginRight: "10%",
              }}>
                L'étude <strong>CLAVIF</strong> a pour objectif de créer un outil efficace et fiable pour évaluer le degré de fatigue
                des individus à partir de leurs expressions faciales en mouvement.
                <br></br>Vous participez au questionnaire permettant d'évaluer et de classer les visages
                fatigués à l'aide du visionnage de séquences vidéos.
              </div>
            </Card.Title>
          ) : null}

          {displayInformationForm ? (
            <InformationForm
              studentMode={this.state.studentMode}
              handleSubmit={this.handleSubmitInformationForm}
              clearLocalStorage={clearLocalStorage}
            />
          ) : null}
          {displayVideoForm ? (
            <VideoForm
              sequence={sequence}
              videoLetter={videoLetter}
              numberOfView={numberOfView}
              playing={playing}
              getVideoToLoad={this.getVideoToLoad}
              videoFolder={
                this.props.videoFolder +
                videosToPlay[currentVideoIndex] +
                "/" +
                videosToPlay[currentVideoIndex]
              }
              handleEnded={this.handleEnded}
              handlePlay={this.handlePlay}
              documentID={documentID}
              handleEnd={this.handleEnd}
            />
          ) : null}
          {displaySelfEvaluationForm ? (
            <SelfEvaluationForm
              videoFolder={
                this.props.videoFolder +
                videosToPlay[currentVideoIndex] +
                "/" +
                videosToPlay[currentVideoIndex]
              }
              handleSubmit={this.handleSubmitSelfEvaluationForm}
              documentID={documentID}
            />
          ) : null}
          {displayVideoForm === false &&
            displayInformationForm === false &&
            displaySelfEvaluationForm === false &&
            displayScreenNoVideo === false
            ? (

            <Card.Title className="rounded shadow"
              style={{
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: "1rem",
                padding: "1rem",
                backgroundColor: "rgba(41, 128, 185, 0.1)",
              }}
            ><Form.Label
              style={{
                fontSize: "2rem",
                marginTop: "2%",
              }}>
                <strong>FIN DE SESSION</strong>
              </Form.Label>
              <div
                style={{
                }}>
                <Image fluid={true}
                  src="Picture1.png"
                  width="100%"
                  alt="logo ufv"
                ></Image>{" "}
              </div>

              <Form.Label
                style={{
                  fontSize: "1.5rem",
                  marginTop: "2%",
                }}>
                <strong>Sessions validées</strong>
              </Form.Label>

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

              <Row style={{
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}>
                <Form className="col-3">
                  <VideoScreen alreadySeen="true" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_A-converted.mp4" />
                </Form>
                <Form className="col-3">
                  <VideoScreen alreadySeen="true" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_B-converted.mp4" />
                </Form>
                <Form className="col-3">
                  <VideoScreen alreadySeen="true" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_C-converted.mp4" />
                </Form>
                <Form className="col-3">
                  <VideoScreen alreadySeen="true" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_D-converted.mp4" />
                </Form>
              </Row>
              <Form.Label
                style={{
                  fontSize: "1.5rem",
                  marginTop: "2%",
                }}>
                <strong>Nouvelles sessions</strong>
              </Form.Label>
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
              {videosToPlay.length - 1 == currentVideoIndex ? null : (
                <div className="lead text-justify" style={{
                  padding: "0.5rem",
                }}>
                  Avez-vous encore du temps pour une nouvelle session ?
                  <div></div>
                  <Button onClick={this.handleNextVideo}>
                    <Row style={{
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                    }}>
                      <Form className="col-3">
                        <VideoScreen alreadySeen="false" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_D-converted.mp4" />
                      </Form>
                      <Form className="col-3">
                        <VideoScreen alreadySeen="false" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_D-converted.mp4" />
                      </Form>
                      <Form className="col-3">
                        <VideoScreen alreadySeen="false" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_D-converted.mp4" />
                      </Form>
                      <Form className="col-3">
                        <VideoScreen alreadySeen="false" url="videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_D-converted.mp4" />
                      </Form>
                    </Row>
                  </Button>
                </div>
              )}
              <br></br>

              {videosToPlay}
              <Button onClick={this.handleBackToMenue}>
                {" "}
                Quitter la session{" "}
              </Button>
            </Card.Title>
          ) : null}

         {displayScreenNoVideo ?  <Card.Title className="rounded shadow"
              style={{
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: "1rem",
                padding: "1rem",
                backgroundColor: "rgba(41, 128, 185, 0.1)",
              }}
            ><Form.Label
              style={{
                fontSize: "2rem",
                marginTop: "2%",
              }}>
                <strong>En attente de video pour votre session ... 
                  <br></br>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </strong>
              </Form.Label>
              </Card.Title>: null}

          <Card style={{
            fontSize: "1rem",
            margin: "7%",
            padding: "1rem",
            width: "85%",
            textAlign: "center",
          }}>
            Contact : Alexandre Lambert (alambert@ece.fr)
          </Card>
        </Card>
      </Card>
    );
  }
}

export default MainForm;
