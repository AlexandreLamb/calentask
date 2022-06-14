import React from 'react';
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import api from "../axiosConfig"
import { itemListSequenceLevel} from "./formItems"


class VideoRate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          rateValue : "",
          timeReflexions : 0,
          interval : null
      }
    }
    componentDidMount = () => {
      const this_contexte = this
      this.setState({ interval : setInterval(this_contexte.countTime, 1000)}) 
    }
    componentWillUnmount = () =>{
      clearInterval(this.interval)
    }
    countTime = () => {
      this.setState({timeReflexions : this.state.timeReflexions + 1})
    }
    handleChange = (event) => {
        const target = event.target;
        console.log(target)
        const value = target.type === 'radio' ? target.id : target.value;
        const name = target.name;
        this.setState({[name]: value});  
    }
    handleSubmit = (event) => {
        const axios = require('axios').default
        const { rateValue, timeReflexions }  = this.state
        const this_contexte = this
        const videoName = "_"+this.props.videoName
        const sequenceLetter = "_"+this.props.videoLetter
        const numberOfView = this.props.sequence[this.props.videoLetter].numberOfViews + 1
        const data = {}
        data["_id"]= this_contexte.props.documentID
        data[videoName] = {}
        data[videoName][sequenceLetter] = {
          _rateValue: rateValue,
          _timeReflexions: timeReflexions,
          _numberOfView: numberOfView
        }
        console.log(data)
        api.post('output/subject/rate/', data)
      .then(function (response) {
        const status_code = response.status
        if (parseInt(status_code) === 204){
          // display alert
          console.log("form empty")
        }
        else if(parseInt(status_code) === 200) {
          this_contexte.props.handleSubmit(rateValue)
        }
        else {
          console.log("Error")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      event.preventDefault()
    }
   
    render() { 
        const { rateValue, timeReflexions } = this.state
        return(
           <div>
               <Card 
                    style={{
                        borderLeftStyle:"none",
                    }}
                >
            <Form>
            <Form.Label> A quel moment (minutes) correspond cette séquence vidéo (séquence {this.props.videoLetter}   ) ? </Form.Label>
               <Form.Group controlId="formBasicSequence">
                      { itemListSequenceLevel.map(({id, key, label}) => ( 
                        <Form.Check 
                          id = {id.toString()}
                          key={key}
                          inline
                          disabled={this.props.rateValueChecked.includes(label)}
                          value={rateValue}
                          onChange={this.handleChange}
                          label={label + " min"}
                          name="rateValue"
                          type="radio"
                          />
                      ))}
                  </Form.Group>
                  { rateValue ? <Button onClick={this.handleSubmit}> Valider votre choix</Button> : "" }
                  <div>
                  Sinon,
                  </div>
                  <Button onClick={this.props.handleNextVideo}>Regarder une autre séquence</Button>
               </Form>
               </Card>
               
               
           </div>
      ) 
    }
  }

export default VideoRate;