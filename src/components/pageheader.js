import React, { Component } from 'react';
import Combined from '../images/combined.png'
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
          <img src={Combined} alt="new-hamp-icon" className="new-hamp-icon"></img>
        </>
        <div className="header-title-container">
          <p className="title-top-content">Hanover Absentee Ballot</p>
          <p className="title-bottom-content">"Live free or die" out of town</p>
        </div>
      </div>
    );
  }
}

export default PageHeader;
