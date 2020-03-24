import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PageHeader from './pageheader.js'
import '../styles/registration.scss'
import '../styles/modals.scss'
import SignaturePad from 'react-signature-canvas'
import AbsenteeApplication from '../images/absentee-ballot.png'

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
      trimmedDataURL: null,
      absenteeBallotImg: null,
      previewPDF: false,
      emailDateSigned: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sigPad = {};
  }

  toggleShowForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }));
  }

  togglePreview = () => {
    this.setState(prevState => ({
      previewPDF: !prevState.previewPDF,
    }));
    console.log(this.state.previewPDF);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //need to do the overlaying here
  handleSubmit = (event) => {
    console.log("ok we made it to the preview");
    console.log(this.state);
    this.toggleShowForm();
    this.togglePreview();
    console.log(this.state);
    this.showPDFPreview();
  }

  clearCanvas = () => {
    this.sigPad.clear();
  }

  trimAndSaveCanvas = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
  }

  handleSubmitApp = () => {
    this.togglePreview();
  }
  //need to display the preview ehre
  showPDFPreview = () => {
    return (
      <Modal id="mod-application-previw" show={this.state.previewPDF} onHide={this.togglePreview}>
        <Modal.Header>
          <Modal.Title>Application Preview</Modal.Title>
        </Modal.Header>
        <div className="image">
          <img className="application-image" src={AbsenteeApplication} alt="application-preview" />
          <p className="image-last-name">{this.state.lastName}</p>
          <p className="image-first-name">{this.state.firstName}</p>
          <p className="image-middle-name">{this.state.middleName}</p>
          <p className="image-title">{this.state.titleName}</p>
          <p className="image-home-address">{this.state.homeAddress}</p>
          <p className="image-cityname-h">{this.state.cityNameH}</p>
          <p className="image-ziopcode-h">{this.state.zipCodeH}</p>
          <div className="image-street">
            <p className="image-street-number">{this.state.streetNum}</p>
            <p className="image-street-name">{this.state.streetName}</p>
          </div>
          <p className="image-aptNum">{this.state.aptNum}</p>
          <p className="image-cityname-m">{this.state.cityNameH}</p>
          <p className="image-statename-m">{this.state.stateNameM}</p>
          <p className="image-zipcode-m">{this.state.zipCodeM}</p>
          <p className="image-phone-number-first3">{this.state.phoneNum.substring(0,3)}</p>
          <p className="image-phone-number-middle3">{this.state.phoneNum.substring(3,6)}</p>
          <p className="image-phone-number-last4">{this.state.phoneNum.substring(6,10)}</p>
          <p className="image-email-address-beginning">{this.state.emailAddress.substring(0, this.state.emailAddress.indexOf('@'))}</p>
          <p className="image-email-address-ending">{this.state.emailAddress.substring(this.state.emailAddress.indexOf('@') + 1, this.state.emailAddress.length + 1)}</p>
          <img src={this.state.trimmedDataURL} className="image-signature" alt="signature" />
          <p className="image-date-signed">{this.state.emailDateSigned}</p>
        </div>
        <Modal.Footer className="ballot-modal-footer">
          <Button className="ballot-modal-button" onClick={() => this.togglePreview()}>Cancel</Button>
          <Button className="ballot-modal-button" type="submit" onClick={() => this.handleSubmitApp()}>Yes this looks right!</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  showFormModal = () => {
    return (
      <Modal show={this.state.showForm} onHide={this.toggleShowForm}>
        <Modal.Header>
          <Modal.Title>Absentee Ballot Application</Modal.Title>
        </Modal.Header>
        <Modal.Title id="section-modal-title">Name</Modal.Title>
        <Modal.Body className="ballot-modal-body">
          <form id="applicant-info-form" onSubmit={this.handleSubmit}>
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
          <form id="applicant-info-form" onSubmit={this.handleSubmit}>
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
        <form id="applicant-info-form" onSubmit={this.handleSubmit}>
          <p>
            Phone Number (10 digits):
            <input className="ballot-form-labels" type="text" name="phoneNum" onChange={this.handleChange}/>
          </p>
          <p>
            Email Address:
            <input className="ballot-form-labels" type="text" name="emailAddress" onChange={this.handleChange}/>
          </p>
          <p>
            Signature:
          </p>
        </form>
        <div className="sigContainer">
          <SignaturePad canvasProps={{width: 400, height: 200, className: "sigPad"}}
          ref={(ref) => { this.sigPad = ref }} />
        </div>
        <p>
          Date Signed:
          <input className="ballot-form-labels" type="text" name="emailDateSigned" onChange={this.handleChange}/>
        </p>
        <Button className="signature-clear-button" onClick={() => this.clearCanvas()}>Clear</Button>
        <Button className="signature-save-button" onClick={() => this.trimAndSaveCanvas()}>Save Signature</Button>
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
        {this.showPDFPreview()}
      </>

    );
  }
}

export default RegistrationForm
