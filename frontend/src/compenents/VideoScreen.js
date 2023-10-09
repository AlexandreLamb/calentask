import React from 'react';
import ReactPlayer from 'react-player';
import Form from "react-bootstrap/Form"
import './css/VideoForm.css'

class VideoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
export default VideoScreen;