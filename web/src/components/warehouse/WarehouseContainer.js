import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AllCustomers from './AllCustomers';
import ReservedBooks from './ReservedBooks';

export class WarehouseContainer extends Component {

  render() {
    return (
      <Container>
        {/* <ReservedBooks/> */}
        <AllCustomers/>
      </Container>
    )
  }
}

export default WarehouseContainer