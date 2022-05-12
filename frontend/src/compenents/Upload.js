import React from 'react';
import api from "../axiosConfig";

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });
        console.log(event.target.files[0]);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const { selectedFile } = this.state;
        formData.append('inputFile', selectedFile);
        api.post("/configuration/post/video",
       formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }}).then(function(response) {
            const status_code = response.status;
        if (parseInt(status_code) === 204) {
          // display alert
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
            console.log(response)
       } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    render() {
        return (
            < div >
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Upload a file: <br /><br />
                        <input type="file" name="file" onChange={this.onChangeHandler} />
                    </label>
                    <br /><br />
                    <button type="submit">
                        Upload
                    </button>
                </form >
            </div >
        );
    }
}