import React from 'react';
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
class VideoRate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          rateValue : "",
          timeReflexions : 0,
      }
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
        axios.post('http://fatigue:5000/output/subject/rate/', {
        _rateValue: rateValue,
        _timeReflexions: timeReflexions,
        _videoLetter: this_contexte.props.videoLetter,
        _id : this_contexte.props.documentID
      })
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
            <Form.Label>A quelle minute(s) correspond la sequence {this.props.videoLetter} ? </Form.Label>
               
               <Form.Group controlId="formBasicFatigueEva">
                      {[1, 15, 30, 45].map((type) => (  
                        <Form.Check 
                          key = {type}
                          inline
                          disabled={this.props.rateValueChecked.includes(type)}
                          value={rateValue}
                          onChange={this.handleChange}
                          label={type + " min"}
                          name="rateValue"
                          type="radio"
                          id={type} />
                      ))}
                  </Form.Group>
                  <Button onClick={this.handleSubmit} >Valider le resultas</Button>
                  <Button onClick={this.props.handleNextVideo} >Regarder la sequence suivante</Button>
               </Form>
               </Card>
               
               
           </div>
      ) 
    }
  }

export default VideoRate;