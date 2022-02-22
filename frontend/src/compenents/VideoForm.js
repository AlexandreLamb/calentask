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
                    L’objectif de ce questionnaire est de nous aider à recenser si et comment vous arrivez à « BIEN » classer 4 séquences 
                    vidéos de 10 secondes qui correspondent à 4 moments dans la réalisation d’une tâche fatigante à savoir au début (0 min.),
                    après 15 (15 min.), après 30 minutes (30 min.) et à la fin du test (45 min.)
                    Vous allez vous apprêter a visionner 4 sequences de vidéos (A, B, C, D) consécutivement.
                    Les sequences durent 10 secondes, l'objectf est de trouver l'ordre des sequences (0 min, 15 min, 30 min, 45 min).
                    A la suite du visionnage des 4 sequences vous allez pouvoir revisionner les sequences dans l'odre A, B, C, D.
                    A la fin de chaque visonnage de sequences votre objectif sera de « retrouver » l’ordre de ces 4 séquences qui correspondent
                    à 4 moments (0 min ,etc.) des 45 minutes de la tâche fatigante. 
                    Une fois que vous avez fait ce choix, vous ne pourrez pas le changer !
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