import React from 'react';
import InformationForm from './InformationForm';
import VideoForm from './VideoForm';
import SelfEvaluationForm from './SelfEvaluationForm'
import Card from "react-bootstrap/Card"

class MainForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        playing: false,
        displayInformationForm : true,
        displayVideoForm : false,
        displaySelfEvaluationForm: false,
        documentID: null,        
        videoLetter: "A",
        videoNotAvailable: [],
        numberOfView: 1
    };
    }
    handleChange = (event) => {    
      this.setState({value: event.target.value});  
    }
    handleSubmitInformationForm = (_documentID) => {
      this.setState({ 
        documentID: _documentID,
        displayInformationForm: false, 
        displayVideoForm: true
      })
    }
    handleSubmitSelfEvaluationForm = () => {
      this.setState({ 
        displaySelfEvaluationForm: false
      })
    }
    handlePlay = () =>{
      this.setState({playing: true})
    }
    
    handleEnded = (isStopWatchingVideo, popVideo) => {
      const videoLetter = this.state.videoLetter
      const videoNotAvailable = this.state.videoNotAvailable

      if (popVideo == true){
        this.setState({videoNotAvailable : [...videoNotAvailable, videoLetter]})
      }
      if (videoLetter !== "D"){
        let newVideoLetter = String.fromCharCode(videoLetter.charCodeAt()+1)
        while(this.state.videoNotAvailable.includes(newVideoLetter)){
          if (newVideoLetter === "D"){
            newVideoLetter = "A"
          } else{
            newVideoLetter = String.fromCharCode(newVideoLetter.charCodeAt()+1)
          }
        }
        this.setState({
          playing: false,
          videoLetter: newVideoLetter
        })
      } else if (isStopWatchingVideo) {
        this.setState({
          displayVideoForm: false,
          displaySelfEvaluationForm: true
        })
      } else if ((videoLetter === "D") && (isStopWatchingVideo === false)){
        let newVideoLetter = "A"
        while(this.state.videoNotAvailable.includes(newVideoLetter)){
          newVideoLetter = String.fromCharCode(newVideoLetter.charCodeAt()+1)
        }
        this.setState({
          playing: false,
          videoLetter: newVideoLetter, 
          numberOfView: this.state.numberOfView + 1
        })
      }
      
    }
  
    render() {
      const {
        playing, 
        displayInformationForm, 
        displayVideoForm, 
        displaySelfEvaluationForm, 
        documentID, 
        videoLetter,
        numberOfView
      } = this.state
      return(
        <Card 
            style={{
              width: '75%',
              margin: 'auto',
              marginTop: "1%"
            }}
          >
            {playing  === false ? 
              <Card.Title 
                style={{
                  textAlign: 'center',
                  fontSize: "2.25rem"
                }}
              >
                Questionnaire evaluation de niveau de fatigue grace a des sequences videos 
              </Card.Title> : null
            }
            {
              displayInformationForm ? 
              <InformationForm 
                handleSubmit={this.handleSubmitInformationForm}
              /> : null
            }
            {
              displayVideoForm ? 
              <VideoForm 
                videoLetter = {videoLetter}
                numberOfView = {numberOfView}
                playing = {playing}
                videoFolder = {this.props.videoFolder}
                handleEnded = {this.handleEnded}
                handlePlay = {this.handlePlay}
                documentID = {documentID}
              /> : null
              }
              {
                displaySelfEvaluationForm ? 
                <SelfEvaluationForm
                handleSubmit={this.handleSubmitSelfEvaluationForm}
                documentID = {documentID}
                /> : null
              }
              {
              displayVideoForm  === false &&  
              displayInformationForm === false &&
              displaySelfEvaluationForm === false  ?
              <Card.Title 
              style={{
                textAlign: 'center',
                fontSize: "2.25rem",
                padding : "25%"
              }}
            >
             Merci pour vos reponses 
            </Card.Title> : null
              }

            
         </Card>
      ) 
    }
  }

export default MainForm;