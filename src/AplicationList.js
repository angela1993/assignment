import React, { Component } from "react";
import Aplication from "./Aplication";
import "./App.css";

class AplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications:[],
      selectedApplication: false,
      selectedApplicationIndex: -1
    };
    this.addApplication = this.addApplication.bind(this);
    this.updateApplication = this.updateApplication.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
    this.clearSelectedApplication = this.clearSelectedApplication.bind(this);
  }

  clearSelectedApplication() {
    this.setState({ selectedApplication: false });
    this.setState({ selectedApplicationIndex: -1 });
  }

  handleSelectedApplicationChange(index) {
    this.setState({ selectedApplication: this.state.applications[index] });
    this.setState({ selectedApplicationIndex: index });
  }

  addApplication(application) {
    this.setState(
      { applications: [application, ...this.state.applications] },
      () => {
        const index = 0;
        this.handleSelectedApplicationChange(index);
      }
    );
  }
  deleteApplication(index) {
    const updatedList = this.state.applications.filter((application, i) => {
      if (i != index) return application;
    });
    this.setState(
      {
        applications: updatedList
      },
      () => {
        this.clearSelectedApplication();
      }
    );
  }
  updateApplication(updatedApplication, index) {
    this.setState({
      applications: this.state.applications.map((application, i) => {
        if (index == i) return updatedApplication;
        return application;
      })
    });
  }

  render() {
    return (
      <div>
        <div className="NewApplication">
          <select
            onChange={event => {
              this.handleSelectedApplicationChange(event.target.value);
            }}
          >
            {this.state.applications.map((application, index) => (
              <option key={index} value={index}>
                {application.name}
              </option>
            ))}
          </select>
          <button onClick={() => this.clearSelectedApplication()}>
            New Application
          </button>
        </div>
        <div>
          <Aplication
            applicationIndex={this.state.selectedApplicationIndex}
            deleteApplication={this.deleteApplication}
            updateApplication={this.updateApplication}
            addApplication={this.addApplication}
            application={this.state.selectedApplication}
          />
        </div>
      </div>
    );
  }
}

export default AplicationList;
