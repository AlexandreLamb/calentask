import React from 'react';
import Button from "react-bootstrap/Button"
import VideoPlayer from './VideoPlayer';
import ReactPlayer from 'react-player';
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import VideoRate from "./VideoRate"
import './css/VideoForm.css'

class VideoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }

    handleClick = event => {
    }


    render() {
        return (
            <Form>
               <ReactPlayer
                    className="rounded shadow"
                    style={{ padding: "0.2rem", marginTop: "5%", backgroundColor: "white", 
                    opacity: this.props.alreadySeen ? "0.3" : "1" }}
                    width="100%"
                    height="100%"
                    url={this.props.url}
                  />
            </Form>
        )
    }
}
//"videos\DESFAM_F_Sequences\DESFAM_F_H90_LUNDI\DESFAM_F_H90_LUNDI_A-converted.mp4
export default VideoScreen;