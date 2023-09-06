import React from 'react';
import Button from "react-bootstrap/Button"
import VideoPlayer from './VideoPlayer';
import UseRef from 'react';
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import VideoRate from "./VideoRate"
import './css/VideoForm.css'

class VideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayVideoRate: false,
            rateValueChecked: [],
            isStopWatchingVideo: false,
            videoLetter: null,
            classifiedSequence: [],
            backColor: ""
        };
        this.testRef = React.createRef();
        this.refSequence2 = React.createRef();
        this.refSequence3 = React.createRef();
    }
    
    componentDidMount() {
        this.props.getVideoToLoad()
        this.refSequence2.current.scrollIntoView();
    }

    handleClick = event => {
        event.currentTarget.disabled = true;
        console.log('button clicked');
    }

    handleEnded = () => {
        const {
            displayVideoRate,
            rateValueChecked,
            isStopWatchingVideo,
            videoLetter
        } = this.state;

        let totalViews = 0
        for (let seq in this.props.sequence) {

            console.log(this.props.sequence[seq])
            totalViews = this.props.sequence[seq].numberOfViews + totalViews
        }
        console.log(totalViews)
        if (totalViews < 4) {
            this.props.handleEnd(this.state.videoLetter)
            this.testRef.current.scrollIntoView();
        }
        else {
            this.setState({
                displayVideoRate: true,
                isStopWatchingVideo: rateValueChecked.length === 4 ? true : false
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
            isStopWatchingVideo: this.state.rateValueChecked.length === 3 ? true : false

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
        this.setState({ displayVideoRate: false }, () => {
            this.props.handleEnd(videoLetter, isStopWatchingVideo)

        })
    }
    handleLaunchVideo = (letter) => {
       
        const this_contexte = this
        if (letter == 'A') {
            this.state.backColor = "rgba(49,70,107,1)"
        }
        if (letter == 'B') {
            this.state.backColor = "rgba(106,129,158,1)"
        }
        if (letter == 'C') {
            this.state.backColor = "rgba(238,235,224,1)"
        }
        if (letter == 'D') {
            this.state.backColor = "rgba(162, 72, 80, 1)"
        }
        this.setState({ videoLetter: letter }, () => {
            this_contexte.props.handlePlay()
        })
    }

    manageTextButton = (videoLetter) => {
        let isSequenceIsClassified = "Button disabled"

        if (this.state.classifiedSequence.includes(videoLetter)) {
            isSequenceIsClassified = "Sequence " + videoLetter + " validée"
        } else {
            isSequenceIsClassified = "Lancer la sequence " + videoLetter
        }

        return isSequenceIsClassified
    }

    manageButton = (videoLetter) => {

        let isSequenceIsViewedOneTime = this.props.sequence[videoLetter].numberOfViews == 1 ? true : false
        let totalViews = 0



        for (let seq in this.props.sequence) {

            console.log(this.props.sequence[seq])
            totalViews = this.props.sequence[seq].numberOfViews + totalViews
        }
        console.log(totalViews)
        if (totalViews >= 4) {
            isSequenceIsViewedOneTime = false
        }
        if (this.state.classifiedSequence.includes(videoLetter)) {
            isSequenceIsViewedOneTime = true

        }
        // Ordre des buttons
        if (this.props.sequence['A'].numberOfViews == 0 && (videoLetter == 'B' || videoLetter == 'C' || videoLetter == 'D'))
            isSequenceIsViewedOneTime = true

        if (this.props.sequence['A'].numberOfViews == 1 && this.props.sequence['B'].numberOfViews == 0 && (videoLetter == 'C' || videoLetter == 'D'))
            isSequenceIsViewedOneTime = true

        if (this.props.sequence['A'].numberOfViews == 1 && this.props.sequence['B'].numberOfViews == 1 && this.props.sequence['C'].numberOfViews == 0 && videoLetter == 'D')
            isSequenceIsViewedOneTime = true
                
            return isSequenceIsViewedOneTime


        /*   let isSequenceIsViewedOneTime = this.props.sequence[videoLetter].numberOfViews == 1 ? true : false
           let totalViews = 0
   
          // document.getElementById('sequenceButtonB').style.backgroundColor = '#e8a8a8';
           
           for (let seq in this.props.sequence) {
   
               console.log(this.props.sequence[seq])
               totalViews = this.props.sequence[seq].numberOfViews + totalViews
           }
           console.log(totalViews)
           if (totalViews >= 4) {
               isSequenceIsViewedOneTime = false
           }
           if (this.state.classifiedSequence.includes(videoLetter)) {
               isSequenceIsViewedOneTime = true
           }
           return isSequenceIsViewedOneTime
           */
    }

    render() {
        const { displayVideoRate, rateValueChecked, isStopWatchingVideo, videoLetter, classifiedSequence } = this.state;
        
        const url = this.props.videoFolder + '_' + videoLetter + '-converted.mp4'
        
        
        const videoName = this.props.videoFolder.split("/").at(-1)
       
        return (
            <div>
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
                        ref={this.refSequence2}
                    >
                        <strong>SECTION 2 | VISIONNAGE</strong>
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

                    {this.props.playing === false /* && 
                    displayVideoRate === false */ ?
                        <div >

                            <Card.Title
                                style={{
                                    marginTop: "2%",
                                    marginBottom: "2%",
                                    fontSize: "1.5rem"
                                }}>
                                <strong>RÈGLES DE CLASSEMENTS</strong>
                            </Card.Title>
                            <Form className='rounded shadow lead' style={{
                                backgroundColor: "rgba(41, 128, 185, 0.1)",
                                padding: "1em",
                            }}>
                                <Card.Body >
                                <div className='rounded SequenceTime'
                                        style={{ fontWeight: "bold", textAlign: "left", fontSize: "1.2rem", marginLeft: "0%" }}>
                                    L’objectif de cette étude est de vous demander de classer dans l'ordre chronologique 4 séquences
                                    vidéos de 10 secondes (A, B, C, D), qui correspondent à 4 moments dans une tâche fatigante :
                                    <br></br> <br></br>
                                
                                        {/*<div className='rounded SequenceTime'
                                            style={{ padding: "1'rem", marginTop: "1%", marginbottom: "1%", backgroundColor: "white", width: "50%" }}>
                                            0 min
                                        </div>
                                        <div className='rounded SequenceTime'
                                            style={{ padding: "1'rem", marginTop: "1%", marginbottom: "1%", backgroundColor: "white", width: "50%" }}>
                                            15 min
                                        </div>
                                        <div className='rounded SequenceTime'
                                            style={{ padding: "1'rem", marginTop: "1%", marginbottom: "1%", backgroundColor: "white", width: "50%" }}>
                                            30 min
                                        </div>
                                        <div className='rounded SequenceTime'
                                            style={{ padding: "1'rem", marginTop: "1%", marginbottom: "1%", backgroundColor: "white", width: "50%" }}>
                                            45 min
                                        </div> */}
                                        <Image fluid={true}
                                            src="explication_clavif.png"
                                            width="100%"
                                            alt="logo ufv"
                                    ></Image>{" "}

                                    <br></br>
                                    Les 4 séquences vidéo durent 10 secondes chacune.
                                    Il vous est demandé: <br></br>
                                    1) Visionner une fois les 4 séquences vidéo dans l'ordre suivant : A,B,C puis D.
                                    <br></br> 
                                    2) Sélectionner une des 4 séquences vidéo (A,B,C,D)
                                    <br></br>
                                    3) Classer le moment (0 min, 15 min, 30 min ou 45 min) de la séquence vidéo selectionnée ou bien décider de la revisionner.
                                    <br></br>
                                    4) Recommencer à l'étape 2) pour les séquences restantes
                                    <br></br> <br></br>
                                    </div>

                                </Card.Body>
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
                            <Form.Group>
                                <Form
                                ref={this.testRef}
                                    style={{
                                        marginTop: "2%",
                                        marginBottom: "2%",
                                        fontSize: "1.5rem"
                                    }}>
                                    <strong>VIDEOS</strong>
                                </Form>
                                <Form style={{
                                    marginBottom: "2%",
                                    fontWeight: "bold",
                                    fontSize: "1.4rem",
                                    color: "#32486E"
                                }} className='lead'>
                                    Attention : une fois que vous avez classé une vidéo , il ne vous sera pas possible de revenir en arrière !
                                </Form>
                            </Form.Group>
                            <Container className='rounded shadow' style={{
                                alignItems: "center",
                                padding: "1em",
                                backgroundColor: "rgba(41, 128, 185, 0.1)",
                            }}>
                                <Row style={{ paddingTop: "15px", textAlign: "center" }}>
                                    <Form className="col-3"></Form>
                                    <Form className="col-1"style={{
                                    }}>
                                        <Image
                                            style={{ display: this.manageButton("A") ? "none" : "block"}}
                                            fluid={true}
                                            src="Picture3.png"
                                            height="100%"
                                            alt="logo ufv"
                                        ></Image>{" "}
                                    </Form>
                                    <Form className="col-4" style={{ alignItems: "center" }}>
                                        <Button disabled={this.manageButton("A")} variant="secondary"
                                            style={{ width: "80%", marginBottom: "1%", backgroundColor: this.manageButton("A") ? "rgba(49,70,107,0.5)" : "rgba(49,70,107,1)" }}
                                            onClick={() => this.handleLaunchVideo("A")}>
                                            {this.manageTextButton("A")}
                                        </Button>
                                    </Form >
                                    <Form className="col-4">
                                    </Form >
                                </Row>
                                <Row style={{ paddingTop: "5px", textAlign: "center" }}>
                                    <Form className="col-3"></Form>
                                    <Form className="col-1" style={{
                                       
                                    }}>
                                        <Image
                                            style={{ display: this.manageButton("B") ? "none" : "block"}}
                                            fluid={true}
                                            src="Picture3.png"
                                            height="100%"
                                            alt="logo ufv"
                                        ></Image>{" "}
                                    </Form>
                                    <Form className="col-4" style={{ alignItems: "center" }}>
                                        <div id="sequenceButtonB">
                                            <Button disabled={this.manageButton("B")} variant="secondary"
                                                style={{ width: "80%", marginBottom: "1%", backgroundColor: this.manageButton("B") ? "rgba(106,129,158,0.5)" : "rgba(106,129,158,1)" }}
                                                onClick={() => this.handleLaunchVideo("B")}>
                                                {this.manageTextButton("B")}
                                            </Button>
                                        </div>
                                    </Form>
                                    <Form className="col-4"> </Form >
                                </Row>
                                <Row style={{ paddingTop: "5px", textAlign: "center" }}>
                                    <Form className="col-3"></Form>
                                    <Form className="col-1"
                                        >
                                        <Image
                                            style={{ display: this.manageButton("C") ? "none" : "block" }}
                                            fluid={true}
                                            src="Picture3.png"
                                            height="100%"
                                            alt="logo ufv"
                                        ></Image>{" "}
                                    </Form>
                                    <Form className="col-4" style={{ alignItems: "center" }}>
                                        <Button disabled={this.manageButton("C")} variant="secondary"
                                            style={{ width: "80%", marginBottom: "1%", backgroundColor: this.manageButton("C") ? "rgba(238,235,224,0.5)" : "rgba(238,235,224,1)", color: this.manageButton("C") ? "white" : "black" }}
                                            onClick={() => this.handleLaunchVideo("C")}>
                                            {this.manageTextButton("C")}
                                        </Button>
                                    </Form>
                                    <Form className="col-4"></Form>
                                </Row>
                                <Row style={{ paddingTop: "5px", textAlign: "center" }}>
                                    <Form className="col-3"></Form>
                                    <Form className="col-1"
                                        >
                                        <Image
                                            style={{ display: this.manageButton("D") ? "none" : "block" }}
                                            fluid={true}
                                            src="Picture3.png"
                                            height="100%"
                                            alt="logo ufv"
                                        ></Image>{" "}
                                    </Form>
                                    <Form className="col-4" style={{ alignItems: "center" }}>
                                        <Button disabled={this.manageButton("D")} variant="secondary"
                                            style={{ width: "80%", marginBottom: "1%", backgroundColor: this.manageButton("D") ? "rgba(162, 72, 80, 0.5)" : "rgba(162, 72, 80, 1)" }}
                                            onClick={() => this.handleLaunchVideo("D")}>
                                            {this.manageTextButton("D")}
                                        </Button>
                                    </Form>
                                    <Form className="col-4"></Form>
                                </Row>
                            </Container>

                        </div> : null
                    }
                    {
                        this.props.playing ?
                            <Form>
                                <Row style={{
                                    marginTop: "2%",
                                    fontSize: "0.75rem",
                                    marginLeft: "0%",
                                    marginRight: "0%",
                                    textAlign: "center",
                                }}>
                                    <Form.Label className="col-2 rounded shadow"
                                    
                                        style={{
                                            padding: "0.25rem",
                                            backgroundColor: this.state.backColor,
                                            color: videoLetter === "C" ? "black":"white"
                                        }}>
                                          <strong>SEQUENCE {videoLetter}</strong>
                                    </Form.Label>
                                    {/*<Form.Label className="col-1 rounded shadow"
                                        style={{
                                            display: (this.props.sequence[videoLetter].numberOfViews>0) ? "block" : "none",
                                            padding: "0.25rem",
                                            marginLeft: "2%",
                                            textAlign: "center",
                                            backgroundColor: this.state.backColor,
                                            color: "white"
                                        }}>
                                        <strong>{this.props.sequence[videoLetter].numberOfViews + 1} vue</strong>
                                    </Form.Label>*/}
                                </Row>
                                <VideoPlayer
                                   
                                    url={url}
                                    playing={this.props.playing}
                                    videoLetter={videoLetter}
                                    handlePlay={this.props.handlePlay}
                                    handleEnded={this.handleEnded}
                                />
                            </Form> : null
                    }

                    {
                        ((displayVideoRate === true)) ?
                            <VideoRate
                                sequence={this.props.sequence}
                                videoName={videoName}
                                videoLetter={videoLetter}
                                rateValueChecked={rateValueChecked}
                                handleSubmit={this.handleSubmit}
                                handleNextVideo={this.handleNextVideo}
                                documentID={this.props.documentID}
                            /> : null
                    }
                </Card >
            </div >
        )
    }
}

export default VideoForm;