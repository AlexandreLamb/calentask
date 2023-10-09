import React from 'react';
import VideoScreen from "./VideoScreen";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import VideoRate from "./VideoRate"
import './css/VideoForm.css'

class VideoEndSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
     var url1 = "videos\\DESFAM_F_Sequences\\"+ this.props.video + "\\" + this.props.video + '_A-converted.mp4'
     var url2 = "videos\\DESFAM_F_Sequences\\"+ this.props.video + "\\" + this.props.video + '_B-converted.mp4'
     var url3 = "videos\\DESFAM_F_Sequences\\"+ this.props.video + "\\" + this.props.video + '_C-converted.mp4'
     var url4 = "videos\\DESFAM_F_Sequences\\"+ this.props.video + "\\" + this.props.video + '_D-converted.mp4'
        
        return (
            <Row style={{
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}>
                <Form className="col-3">
                  <VideoScreen alreadySeen={this.props.seen} url={url1}/>
                </Form>
                <Form className="col-3">
                  <VideoScreen alreadySeen={this.props.seen} url={url2}/>
                </Form>
                <Form className="col-3">
                  <VideoScreen alreadySeen={this.props.seen} url={url3}/>
                </Form>
                <Form className="col-3">
                  <VideoScreen alreadySeen={this.props.seen} url={url4}/>
                </Form>
              </Row>
        )
    }
}
export default VideoEndSession;

