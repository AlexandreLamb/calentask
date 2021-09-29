import React from 'react';
import Button from "react-bootstrap/Button"
import VideoPlayer from './VideoPlayer';
import Card from "react-bootstrap/Card"
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
        else if (this.props.numberOfView > 0) {
            this.setState({
                displayVideoRate: true,
                isStopWatchingVideo : rateValueChecked.length === 3 ? true : false
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
            displayVideoRate: false
        })
        this.props.handleEnded(isStopWatchingVideo, true)
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
        const url =  this.props.videoFolder + this.props.videoFolder + '_'+this.props.videoLetter+'-converted.mp4'
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
                        Section 2: Sequences videos {this.props.videoLetter}
            </Card.Title>
                {   this.props.playing === false /* && 
                    displayVideoRate === false */ ?
                <div>
                    
                    <Card.Title>
                        Explication
                    </Card.Title>
                    <Card.Body>
                    Vous allez vous appreter a visionner 4 sequences de vidéos (A, B, C, D) d'afillé.
                    Les sequences font 10 secondes, l'objectf est de trouver l'ordre des sequences (0 min, 15 min, 30 min, 45 min).
                    A la suite du visionnage des 4 sequences vous allez pouvoir revisonner les sequences dans l'odre A, B, C, D.
                    A la fin de chaque visonnage de sequences vous allez pouvoir choisir si cette sequence provient des 0 min, 15 min, 30 min ou 45 min. 
                    Une fois une fois le choix fait, impossible de revenir en arriere.
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
                    ( displayVideoRate === true ) ? 
                    <VideoRate
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