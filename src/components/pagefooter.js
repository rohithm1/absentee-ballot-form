import React, { Component } from 'react';
import '../styles/footer.scss'

class PageFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="footer-container">
        <p>Student Assembly is proud to have co-sponsored this non-partisan, student-focused project. <br />SA was not involved in the design or execution of the website. 
          SA is not responsible for the accuracy or success of individual ballot requests. <br />This website cannot register new voters or request ballots for elections outside of Hanover. <br />
          For any questions about voting rights or procedures in NH please see <a href="https://sos.nh.gov/Elections.aspx">NH.gov</a>.</p>
        <p>Designed and Developed by Dartmouth students</p>
      </div>
    );
  }
}

export default PageFooter;
