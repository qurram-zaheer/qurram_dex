import React from 'react';
import { withRouter } from 'react-router-dom';

const GoBack = ({ history }) => <button className = 'btn btn-outline-danger' onClick={() => history.goBack()} alt="Go back" >Back</button>;

export default withRouter(GoBack);