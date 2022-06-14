import React from 'react';
import Button from "react-bootstrap/Button"
import VideoPlayer from './VideoPlayer';
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import VideoRate from "./VideoRate";

class VideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayVideoRate: false,
            rateValueChecked : [],
            isStopWatchingVideo: false, 
            videoLetter : null,
            classifiedSequence : [], 
        };
    }
    componentDidMount() { 
        this.props.getVideoToLoad()
    }
    handleEnded = () => {
        const {
            displayVideoRate,
            rateValueChecked,
            isStopWatchingVideo, 
            videoLetter
        } = this.state;

        let totalViews = 0
        for (let seq in this.props.sequence){

            console.log(this.props.sequence[seq])
            totalViews = this.props.sequence[seq].numberOfViews + totalViews
        }
        console.log(totalViews)
        if (totalViews < 4) {
            this.props.handleEnd(this.state.videoLetter)
        }
        else{
            this.setState({
                displayVideoRate: true,
                isStopWatchingVideo : rateValueChecked.length === 4 ? true : false
            })
        }

        /*
        if (this.props.numberOfView === 0){

            this.props.handleEnded(isStopWatchingVideo)
        }
        else if (this.props.numberOfView > 0) {
            this.setState({
                displayVideoRate: true,
                isStopWatchingVideo : rateValueChecked.length === 4 ? true : false
            })
        }*/
        
    }
    handleSubmit = (rateValue) => {
        const {
            displayVideoRate,
            rateValueChecked,
            isStopWatchingVideo,
            videoLetter, 
            classifiedSequence
        } = this.state;
        this.setState({
            rateValueChecked: [...this.state.rateValueChecked, parseInt(rateValue)],
            displayVideoRate: false,
            isStopWatchingVideo : this.state.rateValueChecked.length === 3 ? true : false

        })
        const isStopWatchingVideoUpdate = this.state.isStopWatchingVideo
        classifiedSequence.push(videoLetter)
        this.props.handleEnd(videoLetter, isStopWatchingVideoUpdate)
    }
    handleNextVideo = () => {
        const {
            displayVideoRate,
            rateValueChecked,
            isStopWatchingVideo, 
            videoLetter,
            classifiedSequence
        } = this.state;
        this.setState({ displayVideoRate : false }, () =>{
        this.props.handleEnd(videoLetter, isStopWatchingVideo)

        })
    }
    handleLaunchVideo = (letter) => {
        const this_contexte = this
        
        this.setState({videoLetter : letter}, ()=>{
            this_contexte.props.handlePlay()
        })
    }
    manageButton = (videoLetter) => {
        let isSequenceIsViewedOneTime = this.props.sequence[videoLetter].numberOfViews == 1 ? true : false
        let totalViews = 0
        
        for (let seq in this.props.sequence){

            console.log(this.props.sequence[seq])
            totalViews = this.props.sequence[seq].numberOfViews + totalViews
        }
        console.log(totalViews)
        if (totalViews >= 4) {
            isSequenceIsViewedOneTime = false
        }
        if(this.state.classifiedSequence.includes(videoLetter)){
            isSequenceIsViewedOneTime = true
          }
        return isSequenceIsViewedOneTime
    }


    render() { 
        const  { displayVideoRate, rateValueChecked, isStopWatchingVideo, videoLetter, classifiedSequence } = this.state;
        const url =   this.props.videoFolder + '_'+videoLetter+'-converted.mp4'
        const videoName = this.props.videoFolder.split("/").at(-1)
        return(
            <div>
            <Card 
            style={{
                textAlign: 'center',
                borderLeftStyle:"none",
                 paddingLeft: "15em",
                 paddingRight: "15em"
            }}
            >
            <Card.Title
                style={{
                    textAlign: 'center',
                    fontSize: "1.50rem",
                }}
            >
                        Section 2 <div>4 séquences vidéos de 10 secondes chacune</div> 
            </Card.Title>
                {   this.props.playing === false /* && 
                    displayVideoRate === false */ ?
                <div >
                    
                    <Card.Title>
                        Règles de classement
                    </Card.Title>
                    <Card.Body >
                    L’objectif de cette étude est de vous demandé de classer dans l'ordre chronologique 4 séquences 
                    vidéos de 10 secondes (A, B, C, D), qui correspondent à 4 moments dans une tâche fatigante : 
                    <div style={{fontWeight: "bold"}}>
                    0 min, 15 min, 30 min, 45 min

                    </div>
                      Les 4 sequences vidéos durent 10 secondes chacune. 
                      Il vous est demander de visionner une fois les 4 séquences vidéos
                        avant de commencer à les classer. 
                        
                    A l'issue du premier visionnage des 4 séquences vous pouvez commencer à les classer
                        ou bien décider de revisionner les 4 séquences.
                    <div style={{fontWeight: "bold"}}>
                        
                        Attention : une fois que vous avez classé une vidéo , il ne vous sera pas possible de revenir en arrière !
                    </div>
             
                    
                    </Card.Body> 
                    <Container>
                        <Row style={{paddingTop : "5px"}}> 
                            <Col >
                            <Button disabled={ this.manageButton("A")} variant="secondary" onClick={() => this.handleLaunchVideo("A")}> Lancer la sequence video "A"</Button>
                            </Col>
                            </Row>
                        <Row style={{paddingTop : "5px"}}>
                            <Col>
                            <Button disabled={ this.manageButton("B")} variant="secondary" onClick={() => this.handleLaunchVideo("B")}> Lancer la sequence video "B"</Button>
                            </Col>
                        </Row>
                        <Row style={{paddingTop : "5px"}}>
                            <Col>
                            <Button disabled={ this.manageButton("C")} variant="secondary" onClick={() => this.handleLaunchVideo("C")}> Lancer la sequence video "C"</Button>
                        </Col>
                        </Row>
                        <Row style={{paddingTop : "5px"}}>
                        <Col>
                            <Button disabled={ this.manageButton("D")} variant="secondary" onClick={() => this.handleLaunchVideo("D")}> Lancer la sequence video "D"</Button>
                            </Col>
                        </Row>
                    </Container>
                
                </div> : null
                }                 
                {this.props.playing ?  
                <VideoPlayer 
                    url={url}
                    playing={this.props.playing}
                    videoLetter={videoLetter}
                    handlePlay={this.props.handlePlay}
                    handleEnded={this.handleEnded}
                /> 
                
                : null}
                       

                {   
                    ( (displayVideoRate === true)  ) ? 
                    <VideoRate
                    sequence = {this.props.sequence}
                    videoName = {videoName}
                    videoLetter = {videoLetter}
                    rateValueChecked = {rateValueChecked}
                    handleSubmit = {this.handleSubmit}
                    handleNextVideo = {this.handleNextVideo}
                    documentID = {this.props.documentID}
                    /> : null
                } 

                </Card>
            </div>
      ) 
    }
  }

export default VideoForm;