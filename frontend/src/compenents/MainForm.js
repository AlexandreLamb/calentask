import React from "react";
import InformationForm from "./InformationForm";
import VideoForm from "./VideoForm";
import SelfEvaluationForm from "./SelfEvaluationForm";
import Card from "react-bootstrap/Card";
import Button from "@restart/ui/esm/Button";
import api from "../axiosConfig";
import Image from 'react-bootstrap/Image'
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          this_contexte.setState({
            videosToPlay: response.data,
          });
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
    console.log(process.env.REACT_APP_FLASK_URL )
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

  render() {
    const {
      playing,
      displayInformationForm,
      displayVideoForm,
      displaySelfEvaluationForm,
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
          width: "75%",
          margin: "auto",
          marginTop: "1%",
        }}
      >
        {playing === false ? (
          <Card.Title
            style={{
              textAlign: "center",
              fontSize: "2.25rem",
            }}
          >
            Questionnaire permettant le Classement (évaluation) de Visages
            Fatigués (Etude CLAVIF) grâce au visionnage de séquences vidéos
            <div>
              <Image fluid={true}
                src="logo-fatigue-et-vigilance.png"
                width="10%"
                alt="logo ufv"
              ></Image>{" "}
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
        displaySelfEvaluationForm === false ? (
          <Card.Title
            style={{
              textAlign: "center",
              fontSize: "2.25rem",
              padding: "25%",
            }}
          >
            Merci pour vos réponses,
            {videosToPlay.length - 1 == currentVideoIndex ? null : (
              <div>
                Avez-vous encore du temps pour une nouvelle session ?
                <div></div>
                <Button onClick={this.handleNextVideo}> Video Suivante </Button>
              </div>
            )}
            sinon,
            <Button onClick={this.handleBackToMenue}>
              {" "}
              Quitter la session{" "}
            </Button>
          </Card.Title>
        ) : null}

        <Card style={{
           textAlign: "center",
          }}>Contact : Alexandre Lambert (alambert@ece.fr)</Card>
      </Card>
    );
  }
}

export default MainForm;
