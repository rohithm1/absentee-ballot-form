import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

// ...

class ReactHelmet extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Absentee Ballot Registration</title>
          <meta name="description" content="ballot-form-completion" />
          <meta name="theme-color" content="#008f68" />
        </Helmet>
        {/* ... */}
      </div>
    );
  }
}

export default ReactHelmet;
