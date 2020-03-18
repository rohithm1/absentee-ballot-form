import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PageHeader from './pageheader.js'
import '../styles/registration.scss'
import '../styles/modals.scss'

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      firstName: "",
      middleName: "",
      lastName: "",
      titleName: "",
      homeAddress: "",
      cityNameH: "Hanover",
      zipCodeH: "03755",
      streetNum: 0,
      streetName: "",
      aptNum: "",
      cityNameM: "",
      stateNameM: "",
      zipCodeM: "",
      phoneNum: "",
      emailAddress: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleShowForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    console.log("ok we made it to the submission");
    console.log(this.state)
    this.toggleShowForm();
  }

  showFormModal = () => {
    return (
      <Modal show={this.state.showForm} onHide={this.toggleShowForm}>
        <Modal.Header>
          <Modal.Title>Absentee Ballot Application</Modal.Title>
        </Modal.Header>
        <Modal.Title id="section-modal-title">Name</Modal.Title>
        <Modal.Body className="ballot-modal-body">
          <form id="applicant-name-form" onSubmit={this.handleSubmit}>
            <p>
              First Name:
              <input className="ballot-form-labels" type="text" name="firstName" onChange={this.handleChange}/>
            </p>
            <p>
              Middle Name:
              <input className="ballot-form-labels" type="text" name="middleName" onChange={this.handleChange}/>
            </p>
            <p>
              Last Name:
              <input className="ballot-form-labels" type="text" name="lastName" onChange={this.handleChange}/>
            </p>
            <p>
              Title (Jr., Sr., II, III) (N/A if nothing):
              <input className="ballot-form-labels" type="text" name="titleName" onChange={this.handleChange}/>
            </p>
          </form>
        </Modal.Body>
        <Modal.Title id="section-modal-title">Address Information</Modal.Title>
        <Modal.Body className="ballot-modal-body">
          <form id="applicant-name-form" onSubmit={this.handleSubmit}>
            <Modal.Title id="address-modal-title">This is where you last registered to vote, if you don't know,
           please put your last dorm number and name.</Modal.Title>
            <p>
              Home Address:
              <input className="ballot-form-labels" type="text" name="homeAddress" onChange={this.handleChange}/>
            </p>
            <p id="home-address-example-modal">(ex: '307 Richardson Hall' or '3 Ivy Lane')</p>
            <br />
            <Modal.Title id="address-modal-title">This is where your ballot will be mailed. Due to uncertainty regarding
            when the mail will be sent, please list where you will be at the end of August</Modal.Title>
            <p>
              Street Number/P.O. Box:
              <input className="ballot-form-labels" type="text" name="streetNum" onChange={this.handleChange}/>
            </p>
            <p>
              Street Name:
              <input className="ballot-form-labels" type="text" name="streetName" onChange={this.handleChange}/>
            </p>
            <p>
              Apt/Unit Name (N/A if nothing):
              <input className="ballot-form-labels" type="text" name="aptNum" onChange={this.handleChange}/>
            </p>
            <p>
              City/Town:
              <input className="ballot-form-labels" type="text" name="cityNameM" onChange={this.handleChange}/>
            </p>
            <p>
              State:
              <input className="ballot-form-labels" type="text" name="stateNameM" onChange={this.handleChange}/>
            </p>
            <p>
              Zip Code:
              <input className="ballot-form-labels" type="text" name="zipCodeM" onChange={this.handleChange}/>
            </p>
          </form>
        </Modal.Body>
        <Modal.Title id="section-modal-title">Contact Information</Modal.Title>
        <Modal.Body className="ballot-modal-body">
        <form id="applicant-name-form" onSubmit={this.handleSubmit}>
          <p>
            Phone Number:
            <input className="ballot-form-labels" type="text" name="phoneNum" onChange={this.handleChange}/>
          </p>
          <p>
            Email Address:
            <input className="ballot-form-labels" type="text" name="emailAddress" onChange={this.handleChange}/>
          </p>
          <p>
            Signature:
            <input className="ballot-form-labels" type="text" name="lastName" onChange={this.handleChange}/>
          </p>
        </form>
        </Modal.Body>
        <Modal.Footer className="ballot-modal-footer">
          <Button className="ballot-modal-button" onClick={() => this.toggleShowForm()}>Cancel</Button>
          <Button className="ballot-modal-button" type="submit" onClick={() => this.handleSubmit()}>Submit Application</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  //want to add an "are you sure you want to submit"


  render() {
    return (
      <>
        <div className="registration-form-page">
            <PageHeader></PageHeader>
            <p>Click the following button to fill out an absentee ballot! Note that once the form is complete, the application will automatically
            be submitted, and you will receive a ballot at your given address</p>
            <Button className="show-form-button" onClick={() => this.toggleShowForm()}>Complete Form</Button>
        </div>
        {this.showFormModal()}
      </>

    );
  }
}

export default RegistrationForm
