import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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


  render() {
    return (
      <>
        <div className="registration-form-page">
            <PageHeader></PageHeader>
            <p>Click the following button to fill out an absentee ballot! Note that once the form is complete, the application will automatically
            be submitted, and you will receive a ballot at your given address</p>
            <Button className="show-form-button" onClick={() => this.toggleShowForm()}>Complete Form</Button>
        </div>
      </>

    );
  }
}

export default RegistrationForm
