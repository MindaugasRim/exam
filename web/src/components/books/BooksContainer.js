import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AllBooks from './AllBooks';
import ReservedBooks from './ReservedBooks';

export class BooksContainer extends Component {

  render() {
    return (
      <Container>
        <ReservedBooks/>
        <AllBooks/>
      </Container>
    )
  }
}

export default BooksContainer