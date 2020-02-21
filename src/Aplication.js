import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Aplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: {
        name: "",
        email: "",
        age: "",
        phoneNumber: "",
        selectedOption: "option1",
        englishLevel: "a2",
        startDate: "",
        skils: "",
        personalPresentation: "",
        homeStudy: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateData = this.validateData.bind(this);
    this.addNewApplication = this.addNewApplication.bind(this);
  }

  addNewApplication() {
    if (!this.validateData()) return;
    this.props.addApplication(this.state.application);
  }

  validateData() {
    if (!this.state.application.name) {
      alert("Please enter name");
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.application.email)) {
      alert("You have entered an invalid email address!");
      return false;
    }

    if (!this.state.application.age) {
      alert("Please enter age");
      return false;
    }

    if (!this.state.application.phoneNumber) {
      alert("Please enter phone number");
      return false;
    }

    if (!this.state.application.startDate) {
      alert("Please enter date");
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.application !== prevProps.application) {
      this.setState({ application: this.props.application });
    }
  }

  handleChange(ev) {
    this.setState({
      application: {
        ...this.state.application,
        [ev.target.className]: ev.target.value[ev.target.type === "checkbox"]
          ? ev.target.checked
          : ev.target.value
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Application</h1>
          <br></br>

          <div className="forma">
            <label>Name:</label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.application.name || ""}
              className="name"
            />

            <label>Email: </label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.application.email || ""}
              className="email"
            />

            <label>Age: </label>
            <input
              type="number"
              onChange={this.handleChange}
              value={this.state.application.age || ""}
              className="age"
            />

            <label>Phone number: </label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.application.phoneNumber || ""}
              className="phoneNumber"
            />

            <label>Preferred Way of Communication: </label>
            <input
              type="radio"
              className="selectedOption"
              value="option2"
              checked={this.state.application.selectedOption === "option2"}
              onChange={this.handleChange}
            />
            <p>Phone</p>
            <input
              type="radio"
              className="selectedOption"
              value="option1"
              checked={this.state.application.selectedOption === "option1"}
              onChange={this.handleChange}
            />
            <p>Email</p>

            <label>English Level:</label>
            <select
              className="englishLevel"
              value={this.state.englishLevel}
              onChange={this.handleChange}
            >
              <option value="a1">A1</option>
              <option value="a2">A2</option>
              <option value="b1">B1</option>
              <option value="b2">B2</option>
              <option value="c1">C1</option>
              <option value="c2">C2</option>
            </select>

            <label>Available to Start: </label>
            <input
              type="date"
              onChange={this.handleChange}
              value={this.state.application.startDate || ""}
              className="startDate"
            />

            <label>Technical Skills and Courses: </label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.application.skils || ""}
              className="skils"
            />

            <label>
              Short Personal Presentation (e.g. reason for joining the program):
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.application.personalPresentation || ""}
              className="personalPresentation"
            />

            <label>"Study from home"</label>
            <input
              type="checkbox"
              className="homeStudy"
              checked={this.state.application.homeStudy}
              onChange={this.handleChange}
            />

            {!this.props.application ? (
              <div>
                <br></br>
                <button
                  type="submit"
                  className="submit"
                  onClick={() => this.addNewApplication()}
                >
                  Add
                </button>
                <br></br>
              </div>
            ) : (
              <div className="UpdateAndDelete">
                <button
                  onClick={() =>
                    this.props.deleteApplication(this.props.applicationIndex)
                  }
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    this.props.updateApplication(
                      this.state.application,
                      this.props.applicationIndex
                    )
                  }
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}
