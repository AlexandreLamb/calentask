import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import styles from "./ReactTagsIndicateur.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { commonIndicator } from "./formItems";
import api from "../axiosConfig";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class TagGestionIndic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputIndicator: "",
      indicators: [],
      backColor: [
        "white",
        "rgba(49,70,107,1)",
        "rgba(106,129,158,1)",
        "rgba(238,235,224,1)",
        "rgba(162, 72, 80, 1)",
        "white",
        "rgba(49,70,107,1)",
        "rgba(106,129,158,1)",
        "rgba(238,235,224,1)",
        "rgba(162, 72, 80, 1)",
        "white",
        "rgba(49,70,107,1)",
        "rgba(106,129,158,1)",
        "rgba(238,235,224,1)",
        "rgba(162, 72, 80, 1)",
        "white",
        "rgba(49,70,107,1)",
        "rgba(106,129,158,1)",
        "rgba(238,235,224,1)",
        "rgba(162, 72, 80, 1)",
        "white",
        "rgba(49,70,107,1)",
        "rgba(106,129,158,1)",
        "rgba(238,235,224,1)",
        "rgba(162, 72, 80, 1)",
        "white",
        "rgba(49,70,107,1)",
        "rgba(106,129,158,1)",
        "rgba(238,235,224,1)",
        "rgba(162, 72, 80, 1)",
      ],
      count: 1,
    };
    this.ref1 = React.createRef();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.addIncator = this.addIncator.bind(this);
    this.deleteIncator = this.deleteIncator.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }

  componentDidMount = () => {
    const this_contexte = this;
    api
      .get("/configuration/get/indicators")
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("error");
        } else if (parseInt(status_code) === 200) {
          this_contexte.setState({ indicators: response.data });
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleColor = (letter) => {
    console.log(letter);

    return this.state.backColor[letter];
  };

  handleDelete(i) {
    const { tags } = this.state;
    this.setState(
      {
        tags: tags.filter((tag, index) => index !== i),
      },
      function () {
        this.props.handleIndic(this.state.tags);
      }
    );
  }

  handleAddition(tag) {
    this.setState(
      (state) => ({ tags: [...state.tags, tag] }),
      function () {
        this.props.handleIndic(this.state.tags);
      }
    );
  }
  addIncator = () => {
    let length_indicators = this.state.indicators.length;
    if (length_indicators == 0) {
      length_indicators = 1;
    }
    if (this.state.inputIndicator !== "") {
      document.getElementById("error").style.display = "none";
      this.ref1.current.scrollIntoView();
      const newIndicators = {
        id: length_indicators + 1,
        value: this.state.inputIndicator,
      };
      const this_contexte = this;
      api
        .post("/configuration/add/indicators", {
          newIndicators,
        })
        .then(function (response) {
          const status_code = response.status;
          if (parseInt(status_code) === 204) {
            console.log("form empty");
          } else if (parseInt(status_code) === 200) {
            console.log(response);
            this_contexte.setState({ indicators: response.data });
            this_contexte.setState({ inputIndicator: "" });
          } else {
            console.log("Error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      document.getElementById("error").style.backgroundColor = "#e8a8a8";
      document.getElementById("error").style.display = "block";
    }
  };
  deleteIncator = (event) => {
    const idToDelete = event.target.value;
    const deleteIndicators = {
      id_to_delete: idToDelete,
      indicators: this.state.indicators,
    };
    const this_contexte = this;
    api
      .post("/configuration/delete/indicators", {
        deleteIndicators,
      })
      .then(function (response) {
        const status_code = response.status;
        if (parseInt(status_code) === 204) {
          console.log("form empty");
        } else if (parseInt(status_code) === 200) {
          console.log(response);
          this_contexte.setState({ indicators: response.data });
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "radio" ? target.id : target.value;
    const name = target.name;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  render() {
    const { tags, inputIndicator, indicators } = this.state;

    return (
      <div>
        <Form.Group>
          <Form.Label>
            <strong>1. Ajouter un indicateur</strong>
          </Form.Label>
          <Form.Control
            style={{
              fontSize: "1rem",
              textAlign: "initial",
              backgroundColor: "white",
              border: "2px solid",
              padding: "0.5rem",
              margin: "1.5rem",
              width: "92%",
            }}
            placeholder="Ecrire le nouveau indicateur"
            name="inputIndicator"
            type="text"
            id="inputIndicator"
            value={inputIndicator}
            onChange={this.handleChange}
          />
          <Button
            className="align-items-center"
            style={{
              fontSize: "1rem",
              textAlign: "initial",
              backgroundColor: "#556B2F",
              border: "2px black solid",
              padding: "0.5rem",
              marginLeft: "37.5%",
              marginRight: "37.5%",
              width: "25%",
              textAlign: "center",
            }}
            onClick={this.addIncator}
          >
            Ajouter
          </Button>

          <Form
            id="error"
            style={{
              display: "none",
              textAlign: "center",
              color: "#aa4646",
              fontSize: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            <strong>
              Erreur 214. Vous ne pouvez pas ajouter cet indicateur.
            </strong>
          </Form>
        </Form.Group>
        <br></br>
        <br></br>
        <Form.Label>
          <strong>2. Gestions des indicateurs</strong>
        </Form.Label>
        {indicators.map(({ id, value }) => (
          <Row>
            <Form
              className="rounded col-10"
              style={{
                fontSize: "1rem",
                textAlign: "initial",
                backgroundColor: this.handleColor(0),
                border: "2px solid",
                padding: "0.5rem",
                margin: "1rem",
              }}
            >
              <Form.Label id={id}>
                {" "}
                {id} {value}
              </Form.Label>
            </Form>
            <Form  className="col-1">
              <Button
                className="rounded"
                style={{
                  fontSize: "0.75rem",
                  textAlign: "initial",
                  backgroundColor: "rgba(162, 72, 80, 1)",
                  border: "1px solid",
                  marginLeft: "0.1rem",
                  marginTop: "1.5rem",
                  padding: "0.5rem",
                }}
                value={id}
                onClick={this.deleteIncator}
              >
                X
              </Button>
            </Form>
          </Row>
        ))}

        <Form
          ref={this.ref1}
          style={{ marginTop: this.state.indicators.length * 1 + "rem" }}
        ></Form>

        {/* <div className={styles.ReactTags}>

                <ReactTags tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    inputFieldPosition="bottom"
                />
        </div>*/}
      </div>
    );
  }
}

export default TagGestionIndic;
