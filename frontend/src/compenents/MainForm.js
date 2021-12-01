import React from 'react';
import InformationForm from './InformationForm';
import VideoForm from './VideoForm';
import SelfEvaluationForm from './SelfEvaluationForm'
import Card from "react-bootstrap/Card"
import Button from '@restart/ui/esm/Button';

const FLASK_URL = "http://127.0.0.1:5000/"
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
        numberOfView: 1,
        sequence: {
          A : {
            numberOfViews : 1
          },
          B : {
            numberOfViews : 1
          },
          C : {
            numberOfViews : 1
          },
          D : {
            numberOfViews : 1
          }
        },
        videosToPlay : [],
        currentVideoIndex : 0
      };
    }
    getVideoToLoad = () => {
      const axios = require('axios').default
      const this_contexte = this
      axios.get(FLASK_URL+"configuration/get/video/list")
        .then(function (response) {
          const status_code = response.status
          if (parseInt(status_code) === 204){
            console.log("form empty")
          }
          else if(parseInt(status_code) === 200) {
            this_contexte.setState({videosToPlay : response.data})
          }
          else {
            console.log("Error")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    componentDidMount = () => {
      this.getVideoToLoad()
      if(this.state.displayVideoForm){
        setInterval(this.getVideoToLoad, 3000)
      }
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
      if ((videoLetter !== "D") && (isStopWatchingVideo === false)){
        console.log("enter in if")
        const sequence = this.state.sequence
        sequence[videoLetter] = {numberOfViews : sequence[videoLetter].numberOfViews + 1}
        this.setState({
          sequence: sequence
        })
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
        console.log(this.state.videoLetter)
        console.log(isStopWatchingVideo)
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
        const sequence = this.state.sequence
        sequence[videoLetter] = {numberOfViews : sequence[videoLetter].numberOfViews + 1}
        this.setState({
          playing: false,
          videoLetter: newVideoLetter, 
          numberOfView: this.state.numberOfView + 1,
          sequence : sequence
        })
      }
      
    }
    handleNextVideo = (event) => {
      this.setState({
        currentVideoIndex : this.state.currentVideoIndex + 1,
        sequence: {
          A : {
            numberOfViews : 1
          },
          B : {
            numberOfViews : 1
          },
          C : {
            numberOfViews : 1
          },
          D : {
            numberOfViews : 1
          },
          
        },
        videoLetter : "A",
        displayInformationForm : false,
        displayVideoForm : true,
        displaySelfEvaluationForm: false,
      
      })

      event.preventDefault()
    }
  
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
        currentVideoIndex
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
                sequence  = {sequence}
                videoLetter = {videoLetter}
                numberOfView = {numberOfView}
                playing = {playing}
                videoFolder = {this.props.videoFolder + videosToPlay[currentVideoIndex]+ "/" + videosToPlay[currentVideoIndex]}
                handleEnded = {this.handleEnded}
                handlePlay = {this.handlePlay}
                documentID = {documentID}
              /> : null
              }
              {
                displaySelfEvaluationForm ? 
                <SelfEvaluationForm
                videoFolder = {this.props.videoFolder + videosToPlay[currentVideoIndex]+ "/" + videosToPlay[currentVideoIndex]}
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
            <Button onClick={this.handleNextVideo}> Video Suivante </Button>
            </Card.Title> : null
              }

            
         </Card>
      ) 
    }
  }

export default MainForm;