import React, { Component } from 'react';
import '../styles/content.scss'
import Logo from '../images/logo.png'

class PageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <div className="content-container">
          <br />
          <br />
          <div className="info-box">
            <p className="box-title">Who can request an Absentee Ballot?</p>
            <p className="box-information">Any registered Hanover voter can request a Hanover Absentee Ballot.
            You must be a registered member of the party whose primary you are voting in.
            If you are not affiliated with either party, you can declare your party affiliation
            on the Absentee Ballot request form and vote in a party’s primary.
            If you are affiliated with one party, to vote in the other party’s primary
            you can switch your party in person at the Town Hall. </p>
          </div>
          <div className="following-info-box">
            <p className="box-title">Who’s on the Ballot?</p>
            <p className="box-information">State primary elections decide
            the party nominees for every state-level candidate.
            These elections decide the party nominees for every office except
            President (including nominees for Senate and Congress, as well as
              Governor, state senator, and state representative). </p>
          </div>
          <div className="following-info-box">
            <p className="box-title">Why request an Absentee Ballot?</p>
            <p className="box-information">The New Hampshire State Primary
            is on September 8th, before orientation week and before students will be
            on campus for fall term. To vote in this election, Dartmouth students
            must submit a request for an Absentee Ballot and then mail in a
            completed ballot. </p>
          </div>
          <div className="following-info-box">
            <p className="box-title">What do I do when my Ballot comes?</p>
            <p className="box-information">Go to
            <a href="https://sos.nh.gov/WorkArea/DownloadAsset.aspx?id=8589993551"> https://sos.nh.gov/WorkArea/DownloadAsset.aspx?id=8589993551</a> for instructions on how to fill out and submit your absentee ballot. </p>
          </div>
          <div className="following-info-box">
            <p className="box-title">About Riley</p>
            <p className="box-information">Riley is a Dartmouth College ‘22 running to
            represent Hanover and Lyme in the New Hampshire state house. During
            his time at Dartmouth, Riley has worked to increase student voter turnout
            on campus despite voter suppression attempts and has written bills and
            conducted research for one of our current state representatives, Garrett Muscatel ‘20.
            Hanover and Lyme have a combined population of around 12,000, which
            includes more than 4,000 Dartmouth students, and are represented in the state house by four representatives.
            <br />
            Since Garrett is leaving the state house, Riley is running to make
            sure one of those four is someone who will represent Dartmouth students
            as a young voice on issues important to students, especially important
             given the state house’s average age of 61. If elected, Riley aims to
             increase energy efficiency standards and renewable energy production,
             protect every student’s right to vote, and enact common sense gun laws.
             For more information, visit <a href="rileyfornh.com">rileyfornh.com</a> or email
             <a href="mailto:info@rileyfornh.com"> info@rileyfornh.com</a>. </p>
          </div>
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className="mobile-show">
          <p>Our mobile version is currently in progress. Please visit our website on a computer! Thank you!</p>
          <img src={Logo} alt="logo-tag" />
        </div>
      </>
    );
  }
}

export default PageContent;
