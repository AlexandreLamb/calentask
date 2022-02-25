import React from 'react';
import Button from "react-bootstrap/Button"
import VideoPlayer from './VideoPlayer';
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import VideoRate from "./VideoRate";

class VideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayVideoRate: false,
            rateValueChecked : [],
            isStopWatchingVideo: false
        };
    }

    handleEnded = () => {
        const {
            displayVideoRate,
            rateValueChecked,
            isStopWatchingVideo
        } = this.state;
        if (this.props.numberOfView === 0){
            this.props.handleEnded(isStopWatchingVideo)
        }
        else if (this.props.numberOfView > 1) {
            this.setState({
                displayVideoRate: true,
                isStopWatchingVideo : rateValueChecked.length === 4 ? true : false
            })
        }
        
    }
    handleSubmit = (rateValue) => {
        const {
            displayVideoRate,
            rateValueChecked,
            isStopWatchingVideo
        } = this.state;
        this.setState({
            rateValueChecked: [...this.state.rateValueChecked, parseInt(rateValue)],
            displayVideoRate: false,
            isStopWatchingVideo : this.state.rateValueChecked.length === 3 ? true : false

        })
        const isStopWatchingVideoUpdate = this.state.isStopWatchingVideo
        this.props.handleEnded(isStopWatchingVideoUpdate, true)
    }
    handleNextVideo = () => {
        const {
            displayVideoRate,
            rateValueChecked,
            isStopWatchingVideo
        } = this.state;
        this.setState({ displayVideoRate : false })
        this.props.handleEnded(isStopWatchingVideo)
    }
    render() { 
        const  { displayVideoRate, rateValueChecked } = this.state;
        const url =   this.props.videoFolder + '_'+this.props.videoLetter+'-converted.mp4'
        const videoName = this.props.videoFolder.split("/").at(-1)
        return(
            <div>
            <Card 
            style={{
                textAlign: 'center',
                borderLeftStyle:"none",
            }}
            >
            <Card.Title
                style={{
                    textAlign: 'center',
                    fontSize: "1.50rem",
                }}
            >
                        Section 2: Séquences des 4 vidéos
            </Card.Title>
                {   this.props.playing === false /* && 
                    displayVideoRate === false */ ?
                <div>
                    
                    <Card.Title>
                        Règles de classement
                    </Card.Title>
                    <Card.Body>
                    L’objectif de ce questionnaire est de classer dans l'ordre chronologique 4 séquences 
                    vidéos (A, B, C, D), qui correspondent à 4 moments dans une tâche fatigante : 
                    {[0, 15, 30, 45].map((type) => (  
                        <Form.Check 
                          key = {type}
                          inline
                          label={type + " min"}
                          name="rateValue"
                          type="radio"
                          id={type} />
                      ))}
                      Les 4 sequences vidéos durent 10 secondes chacune. 
                      Il vous est demandé de visionner une fois les 4 séquences vidéos
                        avant de commencer à les classer. 
                        A l'issue du premier visionnage des 4 séquences vous pouvez commencer à les classer
                        ou bien décider de revisionner les 4 séquences.
                        
                        
                        Attention : une fois que vous avez classé une vidéo , pas de retour en arrière ! (a mettre en gras)

             
                    
                    </Card.Body> 
                <Button variant="secondary" onClick={this.props.handlePlay}> Lancer la sequence video "{this.props.videoLetter}"</Button>

                </div> : null
                }                 
                <VideoPlayer 
                    url={url}
                    playing={this.props.playing}
                    handlePlay={this.props.handlePlay}
                    handleEnded={this.handleEnded}
                />        

                {   
                    ( (displayVideoRate === true)  ) ? 
                    <VideoRate
                    sequence = {this.props.sequence}
                    videoName = {videoName}
                    videoLetter = {this.props.videoLetter}
                    rateValueChecked = {rateValueChecked}
                    handleSubmit = {this.handleSubmit}
                    handleNextvideo = {this.handleNextVideo}
                    documentID = {this.props.documentID}
                    handleNextVideo = {this.handleNextVideo}
                    /> : null
                } 

                </Card>
            </div>
      ) 
    }
  }

export default VideoForm;