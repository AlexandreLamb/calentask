import React from 'react';
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import api from "../axiosConfig"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'
import { itemListSequenceLevel } from "./formItems"


class VideoRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rateValue: "",
      timeReflexions: 0,
      interval: null
    }
  }
  componentDidMount = () => {
    const this_contexte = this
    this.setState({ interval: setInterval(this_contexte.countTime, 1000) })
  }
  componentWillUnmount = () => {
    clearInterval(this.interval)
  }
  countTime = () => {
    this.setState({ timeReflexions: this.state.timeReflexions + 1 })
  }
  handleChange = (event) => {
    const target = event.target;
    console.log(target)
    const value = target.type === 'radio' ? target.id : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  handleSubmit = (event) => {
    const axios = require('axios').default
    const { rateValue, timeReflexions } = this.state
    const this_contexte = this
    const videoName = "_" + this.props.videoName
    const sequenceLetter = "_" + this.props.videoLetter
    const numberOfView = this.props.sequence[this.props.videoLetter].numberOfViews + 1
    const data = {}
    data["_id"] = this_contexte.props.documentID
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
        if (parseInt(status_code) === 204) {
          // display alert
          console.log("form empty")
        }
        else if (parseInt(status_code) === 200) {
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
    return (
      <div>
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
        <Card className='rounded shadow'
          style={{
            borderStyle: "none",
            backgroundColor: "rgba(41, 128, 185, 0.1)",
            padding: "1em",
            marginTop:"2%"
          }}
        >
          <Form style={{

          }}>
            <Form.Label style ={{ 
               marginTop: "2%",
               marginBottom: "2%",
               fontSize: "1.5rem"
            }}>
              <strong>ACTION</strong>
            </Form.Label>
            <Form.Label> 
              Vous avez visionné l'intégralité des 4 sequences proposées. Vous entrer dans la phase 2 du visonnage.
              Nous vous proposons de déterminer à quelle séquence du test la vidéo que vous venez de voir correspond-t-elle. 
              <br></br>Attention. Le choix est définitif. Vous ne pourrez pas revenir dessus.
              <br></br><br></br>
              <strong>A quel moment (minutes) correspond cette séquence vidéo (séquence {this.props.videoLetter}   ) ?</strong></Form.Label>
            
            <Form.Group controlId="formBasicSequence"
            className='shadow rounded'
             style={{textAlign: "center",marginLeft:"20%", marginTop:"2%", marginBotton:"2%", padding:"1rem", backgroundColor:"white", width:"60%"}}>
               <Row style={{marginLeft:"0%", marginRight:"0%"}}>
                  <Form className="col-2"></Form>
                  {itemListSequenceLevel.map(({ id, key, label }) => (
                    <Form.Check className="col-2">
                      <Form.Check.Label
                      style={{
                        color: this.props.rateValueChecked.includes(label) ? "grey" : "black"
                      }}>{label + "min"}</Form.Check.Label>
                      <br></br>
                      <Form.Check.Input
                      id={id.toString()}
                      key={key}
                      disabled={this.props.rateValueChecked.includes(label)}
                      value={rateValue}
                      onChange={this.handleChange}
                      label={label + " min"}
                      name="rateValue"
                      type="radio">
                      </Form.Check.Input>
                    </Form.Check>
                  ))}
                  <Form className="col-2"></Form>
                  </Row>
            </Form.Group>
            <Form.Group style={{textAlign: "center", marginTop:"3%"}}>
            <Button style={{textAlign: "center",backgroundColor:"#102775",borderStyle: "none",}} onClick={this.props.handleNextVideo}>Regarder une autre séquence</Button>
            {rateValue ? <Button style={{textAlign: "center", backgroundColor:"#0C680B", marginLeft:"3%",borderStyle: "none",}} onClick={this.handleSubmit}> Valider votre choix</Button> : ""}
           </Form.Group>
          </Form>
        </Card>
      </div>
    )
  }
}

export default VideoRate;