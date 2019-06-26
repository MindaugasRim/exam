import React, { Component } from 'react';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
});

class TablePaginationActions extends Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;
     return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

export class BookList extends Component {

  state = {
    books: [],
    rowsPerPage: 10,
    page: 0,
  };


  componentDidMount() {
    axios.get("http://localhost:8080/books/reservation-info")
    .then(res => { 
      console.log(res);
      this.setState({books: res.data})
    });
    
  }

  handleReserveBook = (id) => {
    axios.post(`http://localhost:8080/books/${id}/reserve`,  {customerId: 1 })
    .then(res => { 
      console.log(res);
      window.location.reload()
    });
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { books, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);

    return (
      <Container>
    
        <Paper className="tm20">
        <Grid item xs={12} >
        <div className="hs"> All books </div> 
        </Grid>
      
          <Table  className="bm80 " >
          
            <TableHead className="ts">
              <TableRow  className="ts"> 
                <TableCell> <p className="ts">Book name </p></TableCell>
                <TableCell > <p className="ts">Author </p></TableCell>
                <TableCell > <p className="ts">Publication date </p> </TableCell>
                <TableCell > <p className="ts">Base location </p> </TableCell>
                <TableCell > <p className="ts">Taken By </p> </TableCell>
                <TableCell > <p className="ts">Reservate </p></TableCell>
              </TableRow>
              
            </TableHead>
         
            <TableBody>
              {this.state.books

             .sort(function (a, b) {         
              if(a.takenDate === b.takenDate)
              {
                  return (a.name - b.name) ? -1 : (a.name - b.name) ? 1 : 0;
              }
              else
              {
                  return (a.takenDate - b.takenDate) ? -1 : 1;
              }
          })
       
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(book => (
                <TableRow key={book.id}>
                    <TableCell >
                    {!book.takenDate ?  <div > 
                    {book.name} </div>  : 
                    <div className="bcgr fi"> 
                    {book.name} </div>   }
                    </TableCell>

                    <TableCell >
                    {!book.takenDate ?  <div > 
                    {book.author} </div>  : 
                    <div className="bcgr fi"> 
                    {book.author} </div>   }
                    </TableCell>

                    <TableCell >
                    {!book.takenDate ?  <div > 
                    {book.publicationDate} </div>  : 
                    <div className="bcgr fi"> 
                    {book.publicationDate} </div>   }
                    </TableCell>

                    <TableCell >
                    {!book.takenDate ?  <div > 
                    {book.locName} </div>  : 
                    <div className="bcgr fi"> 
                    {book.locName} </div>   }
                    </TableCell>

                    <TableCell > <div className="bcgr fi logo-info"> 
                    {book.firstName} {book.lastName} 
                    
                    
                    <span className="tooltiptext">
                    <div className="bcgr fi ">
                     Taken date is:  &nbsp;

                    {book.takenDate} </div>
                </span>
                    </div>


                    </TableCell>

                  <TableCell className="p0i">
                    {!book.takenDate ? <Fab color="primary" aria-label="Add" size="small" onClick={() => this.handleReserveBook(book.id)}>
                      <AddIcon > </AddIcon>
                        </Fab> : <div className="bcgr fi">Reservated </div>}
                    
                  </TableCell>
                </TableRow>
              ))}
                {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            
            <TableFooter >
                  <TableRow>
                    <TablePagination
                       rowsPerPageOptions={[10, 20, 50]}
                       colSpan={6}
                       count={this.state.books.length}
                       rowsPerPage={rowsPerPage}
                       page={page}
                       SelectProps={{
                       native: true,
                       }}
                       onChangePage={this.handleChangePage}
                       onChangeRowsPerPage={this.handleChangeRowsPerPage}
                       ActionsComponent={TablePaginationActionsWrapped}
                     />
                  </TableRow>
                </TableFooter>
             
          </Table>
        
        </Paper>

      </Container>
   
    )
  }
}

export default BookList