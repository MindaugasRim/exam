import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AllCustomers from './AllCustomers';

export class WarehouseContainer extends Component {

  render() {
    return (
      <Container>
        <AllCustomers/>
      </Container>
    )
  }
}

export default WarehouseContainer