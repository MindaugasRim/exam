import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AddLocation from './AddLocation';
import UpdateLocation from './UpdateLocation';

export class EditLocationsContainer extends Component {

  render() {
    return (
      <Container>
        <AddLocation/>
        <UpdateLocation/>
      </Container>
    )
  }
}

export default EditLocationsContainer