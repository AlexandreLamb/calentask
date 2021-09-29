import React from 'react';
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathToExportData : ""
        };
    }
    handleChange = (event) => {    
        const target = event.target;
        console.log(target)
        const value = target.type === 'radio' ? target.id : target.value;
        const name = target.name;
        this.setState({[name]: value});  
    }
    render() {
        const {pathToExportData} = this.state;
        
        return(
            <Card 
                style={{
                width: '75%',
                margin: 'auto',
                marginTop: "1%"
                }}
            >
            <Card.Title 
                style={{
                textAlign: 'center',
                fontSize: "2.25rem"
                }}
            >
            Interface de configuration du Questionnaire

            </Card.Title>
            <Form.Group  controlId="formBasicInitial">
                    <Form.Label> Chemin de sauvgarde du fichier de résponse </Form.Label>
                    <Form.Control name="pathToExportData"  directory="" webkitdirectory="" value={pathToExportData} onChange={this.handleChange} type="file" placeholder="Choisir un chemin vers un dossier" />
                    <Form.Text className="text-muted">
                      Les initial seront conservé de manière anonyme
                    </Form.Text>

                  </Form.Group>  

            </Card>
        )
    }
}

export default Configuration