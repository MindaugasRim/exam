import React, { Component } from 'react';
import { Container } from 'reactstrap';
// import AllCustomers from './AllCustomers';
import ReportsByOrders from './ReportsByOrders';
import ReportsByWeight from './ReportsByWeight';
import ReportsByInventoryWeight from './ReportsByInventoryWeight';

export class ReportsContainer extends Component {

  render() {
    return (
      <Container>
        {/* <ReservedBooks/> */}
        <ReportsByOrders/>
        <ReportsByWeight/>
        <ReportsByInventoryWeight/>
      </Container>
    )
  }
}

export default ReportsContainer