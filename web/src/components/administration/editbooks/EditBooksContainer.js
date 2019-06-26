import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';

export class EditBooksContainer extends Component {

    render() {
      return (
        <Container>
          <AddBook/>
          <UpdateBook/>
        </Container>
      )
    }
  }
  
  export default EditBooksContainer