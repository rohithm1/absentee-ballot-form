import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import PageHeader from './pageheader.js'
import SignaturePad from 'react-signature-canvas'
import AbsenteeApplication from '../images/absentee-ballot.png'
import CheckBoxes from '../images/checkboxes.png'
import BallotCheck from '../images/ballot-check.png'
import PageContent from './pagecontent.js'
import PageFooter from './pagefooter.js'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
      trimmedDataURL: null,
      trimmedDataURL2: null,
      absenteeBallotImg: null,
      previewPDF: false,
      emailDateSigned: "",
      qualifiedVoter: 0,
      disabledHelp: false,
      partyAff: false,
      partyAffiliation: "Democrat",
      applicationPDF1: null,
      applicationPDF2: null,
      disabledHelpName: "",
      formCompleted: false,
      ballotEntitled: 0,
      errorMod: false,
    };
    this.sigPad = {};
    this.sigPad2 = {};
  }

  toggleShowForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
      partyAff: false,
    }));
  }

  togglePreview = () => {
    this.setState(prevState => ({
      previewPDF: !prevState.previewPDF,
    }));
  }

  toggleErrorMod = () => {
    this.setState(prevState => ({
      errorMod: !prevState.errorMod,
    }));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChangeRadio = num => (event) => {
    console.log(num)
    this.setState({
      [event.target.name]: num
    });
  }

  handleChangeSelected = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    });
  }

  //need to do the overlaying here
  handleSubmit = (event) => {
    console.log(this.state);
    this.trimAndSaveCanvas()
    this.trimAndSaveCanvas2()
    event.preventDefault();
    this.toggleShowForm();
    this.togglePreview();
    this.showPDFPreview();
  }

  clearCanvas = () => {
    this.sigPad.clear();
  }

  trimAndSaveCanvas = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
  }

  clearCanvas2 = () => {
    this.sigPad2.clear();
  }

  trimAndSaveCanvas2 = () => {
    this.setState({
      trimmedDataURL2: this.sigPad2.getTrimmedCanvas()
      .toDataURL('image/png'),
      disabled: true

    })
  }

  handleSubmitApp = () => {
    this.togglePreview();
  }

  //need to display the preview ehre
  showErrorMod = () => {
    return (
      <Modal id="mod-application-preview" show={this.state.errorMod} onHide={this.toggleErrorMod}>
        <Modal.Header>
          <Modal.Title className="error-title-container">Oops! The form was not submitted correctly.</Modal.Title>
        </Modal.Header>
        <p className="show-form-description">Unfortunately, the requirements for the form were not completed. Make sure
          you correctly checked the radio buttons, signed the form, and filled out the information appropriately where indicated.</p>

        <Modal.Footer className="ballot-modal-footer">
          <Button className="ballot-modal-button" onClick={() => this.toggleErrorMod()}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }


  //need to display the preview ehre
  showPDFPreview = () => {
    return (
      <Modal id="mod-application-preview" show={this.state.previewPDF} onHide={this.togglePreview}>
        <Modal.Header>
          <Modal.Title>Application Preview</Modal.Title>
        </Modal.Header>
            <div className="application-container" id="divToPrint" ref={this.myref} >
              <div className="image" id="divToPrint1">
                <img className="application-image" src={CheckBoxes} alt="application-preview-firstpage" />
                <img className={'qualifiedvoter-check-' + this.state.qualifiedVoter}  src={BallotCheck} alt="application-preview-qualifiedvoter" />
                <img className={'ballotentitled-check-' + this.state.ballotEntitled}  src={BallotCheck} alt="application-preview-ballotentitled" />
                <img className={'partyaffiliation-check-' + this.state.partyAffiliation}  src={BallotCheck} alt="application-preview-partyaffiliation" />
                <img className='state-election-check' src={BallotCheck} alt="application-preview-stateelection" />

              </div>
              <div className="image" id="divToPrint2">
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
                {this.signature1Null()}
                {this.signature2Null()}
                <p className="image-date-signed">{this.state.emailDateSigned}</p>
                <p className="image-disabled-name">{this.state.disabledHelpName}</p>
              </div>
            </div>
        <Modal.Footer className="ballot-modal-footer">
          <Button className="ballot-modal-button" onClick={() => this.togglePreview()}>Cancel</Button>
          <Button className="ballot-modal-button" type="submit" onClick={() => this.printDocument()}>Yes, this looks right!</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  signature2Null = () => {
    if (this.state.trimmedDataURL2 !== null) {
      return (
        <img src={this.state.trimmedDataURL2} className="image-signature2" alt="signature2" />
      )
    }
  }

  signature1Null = () => {
    if (this.state.trimmedDataURL !== null) {
      return (
        <img src={this.state.trimmedDataURL} className="image-signature" alt="signature" />
      )
    }
  }


  printDocument = () => {
    if (this.state.ballotEntitled === 0 || this.state.qualifiedVoter === 0) {
      this.togglePreview();
      this.toggleErrorMod();
    }

    else {
      this.setState(prevState => ({
        formCompleted: !prevState.formCompleted,
      }));
      const input = document.getElementById('divToPrint');
      console.log(input)

      var HTML_Width = input.clientHeight;
      var HTML_Height = input.clientWidth;
      var top_left_margin = 0;
      var PDF_Width = HTML_Width+(top_left_margin*2);
      var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;
      
      html2canvas(input,{allowTaint:true})
        .then((canvas) => {
			
			    console.log(canvas.height+"  "+canvas.width);
          const imgData = canvas.toDataURL('image/jpeg');          
          var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPEG', top_left_margin, top_left_margin,canvas_image_width*2,canvas_image_height);
          pdf.addPage()
          pdf.addImage(imgData, 'JPEG', -550, top_left_margin,canvas_image_width*2,canvas_image_height);



          const blobPDF = new Blob([ pdf.output('blob') ], { type: 'application/pdf' });
  
          // const URL = 'https://absentee-ballot-backend.herokuapp.com';
          const URL = 'http://localhost:8080';
  
          const formData = new FormData();
          formData.append('file', blobPDF, `${this.state.firstName}_${this.state.lastName}.pdf`);
          formData.append('firstName', this.state.firstName);
          formData.append('lastName', this.state.lastName);
          formData.append('phoneNum', this.state.phoneNum);
          formData.append('emailAdd', this.state.emailAddress);
          formData.append('partyAff', this.state.partyAffiliation);
          formData.append('dateSigned', this.state.emailDateSigned);
  
          const request = new XMLHttpRequest();
  
          request.onload = () => {
            if (request.response !== undefined) {
              console.log(request);
            }
          };
  
          request.open('POST', `${URL}/send-form`, true);
          request.responseType = 'json';
          request.send(formData);
  
          axios.post(`${URL}/received-data`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNum: this.state.phoneNum,
            emailAdd: this.state.emailAddress,
            partyAff: this.state.partyAffiliation,
            dateSigned: this.state.emailDateSigned,
          })
          .then((response) => console.log("success"))
          .catch((error) => console.log(error));
        })
      ;
    }
   
    this.togglePreview();
  }

  showFormModal = () => {
    return (
      <Modal id="show-form-modal" show={this.state.showForm} onHide={this.toggleShowForm}>
        <Modal.Header id="modal-form-header">
          <Modal.Title id="show-form-title">Request an Absentee Ballot</Modal.Title>
          <p className="show-form-description">This form is a one-step process to electronically submit an absentee
          ballot request form for the state primary election in New Hampshire.</p>
      </Modal.Header>
        <Modal.Body className="ballot-modal-body">
          <form id="applicant-info-form" onSubmit={this.handleSubmit}>
            <div className="form-data-container">
              <p className="form-title-container">Name</p>
              <div className="formvalues-name-container">
                <input className="ballot-form-labels" type="text" name="firstName" onChange={this.handleChange} placeholder="First (e.g. John)" required/>
                <input className="ballot-form-labels" type="text" name="middleName" onChange={this.handleChange} placeholder="Middle (e.g. Jacob)"/>
                <input className="ballot-form-labels" type="text" name="lastName" onChange={this.handleChange} placeholder="Last (e.g. Smith)" required/>
                <input className="ballot-form-labels" type="text" name="titleName" onChange={this.handleChange} placeholder="Title (e.g. Jr., Sr., I, III)"/>
              </div>
            </div>
            <div className="form-data-container">
              <div className="formvalues-nhaddress-container">
                <p className="form-title-container">Registered Address</p>
                <p className="form-description-container">For students: Please enter your dorm address  from when you last cast a vote.</p>
                <input className="ballot-form-labels-address" type="text" name="homeAddress" onChange={this.handleChange} placeholder="(ex: '307 Richardson Hall' or '3 Ivy Lane')" required/>
              </div>
            </div>
            <div className="form-data-container">
              <p className="form-title-container">Out-of-State Address</p>
              <p className="form-description-container">This is where your ballot will be mailed. Please enter where you will be at the end of August.</p>
              <div className="formvalues-regular-container">
                <input className="ballot-form-labels" type="text" name="streetNum" onChange={this.handleChange} placeholder="Street No. (e.g. 1)" required/>
                <input className="ballot-form-labels-streetname" type="text" name="streetName" onChange={this.handleChange} placeholder="Street Name (e.g. Carpenter, Ivy Lane)" required/>
                <input className="ballot-form-labels-aptnm" type="text" name="aptNum" placeholder="Apt No. (e.g. 1)" onChange={this.handleChange}/>
              </div>
              <div className="formvalues-regular-container">
                <input className="ballot-form-labels-citym" type="text" name="cityNameM" onChange={this.handleChange} placeholder="City (e.g. Hanover)" required/>
                <input className="ballot-form-labels-statem" type="text" name="stateNameM" placeholder="State (e.g. NH)" onChange={this.handleChange} required/>
                <input className="ballot-form-labels-zipcode" type="text" name="zipCodeM" placeholder="Zip Code (e.g. 03755)" onChange={this.handleChange} required/>
              </div>
            </div>
            <div className="form-data-container">
              <p className="form-title-container">Contact Information</p>
              <div className="formvalues-regular-container">
                <input className="ballot-form-labels-phonenum" type="text" name="phoneNum" onChange={this.handleChange} placeholder="Phone Number (e.g. 9999999999)" required/>
                <input className="ballot-form-labels-email" type="text" name="emailAddress" onChange={this.handleChange} placeholder="Email (e.g. _________@_______)" required/>
              </div>
            </div>
            <div className="form-data-container">
              <p className="form-title-container">Agreement</p>
              <p className="form-description-container">Please check the following boxes.</p>
              <div className="formvalues-agreement-container">
                <p className="form-radio-title-container">Please Select 1: I hereby declare that</p>
                <p className="select-container"><input name="qualifiedVoter" type="radio" onChange={this.handleChangeRadio(1)} required/>  I am a duly qualified voter who is currently registered to vote in this town/ward.</p>
                <p className="select-container"><input name="qualifiedVoter" type="radio" onChange={this.handleChangeRadio(2)} required/>  I am absent from the town/city where I am domiciled and will be until after the next election, 
                or I am unable to register in person due to a disability, and request that the forms 
                necessary for absentee voter registration be sent to me with the absentee ballot</p>
                <p className="form-radio-title-container">Please Select 1: I will be entitled to vote by absentee ballot because </p>
                <p className="select-container"><input name="ballotEntitled" type="radio" onChange={this.handleChangeRadio(1)} required/>  I plan to be absent on the day of the election from the city, town, or unincorporated place where I am domiciled.</p>
                <p className="select-container"><input name="ballotEntitled" type="radio" onChange={this.handleChangeRadio(2)} required/>  I am requesting a ballot for the presidential primary election and I may be absent on the day of election from the city, 
                town, or unincorporated place where I am domiciled, but the date of the election has not been announced. I understand that I may only make such a request 14 days after the filing period for 
                candidates has closed, and that if I will not be absent on the date of the election I am not eligible to vote by absentee ballot.</p>
                <p className="select-container"><input name="ballotEntitled" type="radio" onChange={this.handleChangeRadio(3)} required/>  I cannot appear in public on election day because of observance of a religious commitment.</p>
                <p className="select-container"><input name="ballotEntitled" type="radio" onChange={this.handleChangeRadio(4)} required/>  I am unable to vote in person due to a disability.</p>
                <p className="select-container"><input name="ballotEntitled" type="radio" onChange={this.handleChangeRadio(5)} required/>  I cannot appear at any time during polling hours at my polling place because of an employment obligation. For the 
                purposes of this application, the term “employment” shall include the care of children and infirm adults, with or without compensation.</p>
                <p className="form-radio-title-container">Please complete the following information:</p>
                <p className="select-container"><input
                name="partyAff"
                type="checkbox"
                checked={this.state.partyAff}
                onChange={this.handleChangeSelected} required/>  I am a member of, or I am now declaring my
                affiliation with a party and I am requesting a ballot for
                that party’s primary.</p> <select className="ballot-form-labels-affiliation" onChange={this.handleChange} name="partyAffiliation" required>
                                            <optgroup><option name="partyAffiliation">Democrat</option>
                                            <option name="partyAffiliation">Republican</option></optgroup>
                                            </select>
              </div>
            </div>
            <div className="form-data-container">
              <p className="form-title-container">Signature</p>
              <p className="form-description-container">Click on the box to sign using your trackpad.</p>
              <div className="formvalues-signature-container">
                <div className="sigContainer">
                  <SignaturePad canvasProps={{width: 600, height: 130, className: "sigPad"}}
                  ref={(ref) => { this.sigPad = ref }} />
                </div>
                <div className="date-and-signature-buttons">
                  <input className="ballot-form-labels-datesigned" type="text" name="emailDateSigned" onChange={this.handleChange} placeholder="Date (e.g. MM/DD/YYYY)" required/>
                  <Button className="signature-button" onClick={() => this.clearCanvas()}>Clear Signature</Button>
                </div>
              </div>
              <p className="form-description-container">Any person who witnesses
              and assists a voter with a disability in executing this form shall sign their name, print their name, and certify
              their representation through checking the box in the spaces provided below.</p>
              <p className="attest-statement">I attest that I assisted the applicant in executing this form because he/she has a disability:</p>
              <div className="disabled-help-container">
                <div className="disabled-name-container">
                  <p className="disabled-name-title" >Print Name</p>
                  <div className="disabled-buttons-container">
                    <input className="ballot-form-labels-disabled-name" type="text" name="disabledHelpName" onChange={this.handleChange} placeholder="First and Last Name"/>
                    <Button className="signature-button" onClick={() => this.clearCanvas2()}>Clear Signature</Button>
                  </div>
                </div>
                <div className="disabled-signature-container">
                  <p className="disabled-name-signature">Signature</p>
                  <div className="sigContainer2">
                    <SignaturePad canvasProps={{width: 600, height: 130, className: "sigPad2"}}
                    ref={(ref) => { this.sigPad2 = ref }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-data-container">
              <p className="form-description-container">Upon submission, your form will be submitted to the Hanover Town Clerk. </p>
              <div className="formvalues-completion-container">
                <Button className="ballot-modal-button" onClick={() => this.toggleShowForm()}>Cancel</Button>
                <Button className="ballot-modal-button-submit" type="submit">Submit Application</Button>
              </div>
            </div>
          </form>

        </Modal.Body>
      </Modal>
    )
  }
  //want to add an "are you sure you want to submit"
  showButton = () => {
    if (this.state.formCompleted === false) {
      return (
        <Button className="show-form-button" onClick={() => this.toggleShowForm()}>Request Now</Button>
      )
    }
    else {
      return (
        <div className="thank-you-note">
          <p className="thank-you-title">Thank you!</p>
          <p className="thank-you-description">Thank you for applying for an absentee ballot. It will be delivered late August. Happy election season!</p>
        </div>
      )
    }
  }

  render() {
    return (
      <>
        <div className="registration-form-page">
            <PageHeader></PageHeader>
            {this.showButton()}
            <PageContent></PageContent>
            <PageFooter></PageFooter>
        </div>
        {this.showFormModal()}
        {this.showPDFPreview()}
        {this.showErrorMod()}
      </>

    );
  }
}

export default RegistrationForm
