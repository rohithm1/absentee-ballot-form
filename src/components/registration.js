import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';



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
  }


  render() {
    if (this.state.showForm) {
      return (
        <div id="registration-form-page">
            <p>this is information the user will need to know</p>
            <p>this is where the modal would be</p>
            <Button className="show-form-button" onClick={() => this.toggleShowForm()}>Complete Form</Button>
        </div>
      );
    }
    else {
      return (
        <div id="registration-form-page">
            <p>this is information the user will need to know</p>
            <Button className="show-form-button" onClick={() => this.toggleShowForm()}>Complete Form</Button>
        </div>
      );
    }
  }
}

export default RegistrationForm
