import React from 'react';
import ReactPlayer from 'react-player';
class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    this.ref5 = React.createRef();
  }

  render() {
    console.log("from player " + this.props.url)
    console.log("video " + this.props.videoLetter)
    //this.ref5.current.scrollIntoView();
    return (
      <div ref = {this.ref5}>
        <ReactPlayer

          onContextMenu={e => e.preventDefault()}
          className="rounded shadow"
          style={{padding: "2rem", marginTop:"2%", backgroundColor:"white"}}
          width={this.props.playing ? "100%" : "0"}
          height={this.props.playing ? "100%" : "0"}
          url={this.props.url}
          playing={this.props.playing}
          onPlay={this.props.handlePlay}
          onEnded={this.props.handleEnded}
        />
        </div>
    )
  }
}
export default VideoPlayer;