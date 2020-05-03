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
        <p>Sponsored by Dartmouth Democrats</p>
        <p>Offical Form found at <a href="https://sos.nh.gov/ElecForms2.aspx">NH.gov</a></p>
        <p>Designed and Developed by Dartmouth students</p>

      </div>
    );
  }
}

export default PageFooter;
