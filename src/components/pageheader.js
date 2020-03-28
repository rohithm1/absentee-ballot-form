import React, { Component } from 'react';
import NewHampshire from '../images/new-hampshire.png'
import CheckMark from '../images/checkmark.png'
import '../styles/header.scss'

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="header-container">
        <>
          <img src={NewHampshire} alt="new-hamp-icon" className="new-hamp-icon"></img>
          <img src={CheckMark} alt="check-mark-icon" className="check-mark-icon"></img>
        </>
        <div className="header-title-container">
          <p className="title-top-content">Hanover Absentee ballot</p>
          <p className="title-bottom-content">"Live free or die" out of town</p>
        </div>
      </div>
    );
  }
}

export default PageHeader;
