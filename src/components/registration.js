import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PageHeader from './pageheader.js'
import '../styles/registration.scss'

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  toggleShowForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }));
    console.log(this.state.showForm);
  }

  showFormModal = () => {
    return (
      <Modal show={this.state.showForm} onHide={this.toggleShowForm}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
    )
  }


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
