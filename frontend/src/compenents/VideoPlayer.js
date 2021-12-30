import React from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time : 0
    };
    }
    componentDidMount = () => {
      console.log(this.props.playing) 
      if(this.props.playing){
        setInterval(this.countTime, 1000) 
      }
      
    }
    countTime = () => {
      this.setState({time : this.state.time + 1})
    }
      
    render() {
        console.log("from player "+this.props.url)
        return(
            <ReactPlayer
            width={this.props.playing ? "100%" : "0"}
            height={this.props.playing ? "100%" : "0"}
            url={this.props.url} 
            playing={this.props.playing}
            onPlay={this.props.handlePlay}
            onEnded={this.props.handleEnded}
            />
        ) 
    }
  }

export default VideoPlayer;