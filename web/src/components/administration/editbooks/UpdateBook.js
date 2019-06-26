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
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Select from '@material-ui/core/Select';
import RecoverIcon from '@material-ui/icons/History';
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

export class UpdateBook extends Component {

  state = {
    allBooks: [],
    rowsPerPage: 10,
    page: 0,
    open: false,
    locations: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8080/books")
    .then(res => { 
      console.log(res);
      this.setState({allBooks: res.data})
      
      axios.get("http://localhost:8080/locations")
      .then(res => { 
          console.log(res);
          this.setState({locations: res.data})
      });

    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleEditBook = (event, id) => {
    event.preventDefault();
  
    axios.put(`http://localhost:8080/books/${id}`, {
      name: this.state.name, 
      author: this.state.author, 
      locationId: this.state.locationId, 
      publicationDate: this.state.publicationDate 
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      
      })
      window.location.reload()
  }

  recoverBook(id) {
    axios.put(`http://localhost:8080/books/${id}/recover`)
    window.location.reload()
  }

  deleteBook = (id) => {
    axios.delete(`http://localhost:8080/books/${id}`)
    .then(res => {
      console.log(res);
    })
    window.location.reload()
  }



  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open
  })
  }
  
  render() {
    const { allBooks, rowsPerPage, page, open } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allBooks.length - page * rowsPerPage);

    return (
      <Container>
        <Paper className="tm20">
        <Grid item xs={12} >
        <div className="hs"> All existing books </div> 
        </Grid>

            <Table className="bm80">
              <TableHead className="ts">
                <TableRow>
                  <TableCell> <p className="ts">Book name </p></TableCell>
                  <TableCell > <p className="ts">Author </p></TableCell>
                  <TableCell > <p className="ts">Publication date </p></TableCell>
                  <TableCell > <p className="ts">Base location </p></TableCell>
                  <TableCell > <p className="ts">Edit Book </p></TableCell>
                  <TableCell > <p className="ts">Delete Book </p></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.allBooks
                .sort(function (a, b) {
                    if(a.deletedStatus === b.deletedStatus)
                    {
                        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
                    }
                    else
                    {
                        return (a.deletedStatus < b.deletedStatus) ? -1 : 1;
                    }
                })

                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(book => (
                  <TableRow key={book.id}>
                     <TableCell >
                    {!book.deletedStatus ?  <div > 
                    {book.name} </div>  : 
                       

                    <div className="bcgr fi"> 
                    {book.name} </div>   }</TableCell>
                    <TableCell >
                    {!book.deletedStatus ?  <div > 
                    {book.author} </div>  : 
                       

                    <div className="bcgr fi"> 
                    {book.author} </div>   }</TableCell>
                    <TableCell >
                    {!book.deletedStatus ?  <div > 
                    {book.publicationDate} </div>  : 
                       

                    <div className="bcgr fi"> 
                    {book.publicationDate} </div>   }</TableCell>
                    <TableCell >
                    {!book.deletedStatus ?  <div > 
                    {book.locName} </div>  : 
                       

                    <div className="bcgr fi"> 
                    {book.locName} </div>   }</TableCell>

                    <TableCell className="p0i">
                    {!book.deletedStatus ?  <Fab color="primary" aria-label="Add" size="small" onClick={this.handleToggle} >
                    <EditIcon/>

                    </Fab>  : 
                    <div className="bcgr fi">Book is Deleted </div>}

                    </TableCell>

                      <TableCell className="p0i" >

                     {!book.deletedStatus ?  <Fab color="secondary" aria-label="Add" size="small" onClick={() => this.deleteBook(book.id)}>
                        <DeleteIcon />
                       </Fab>  : 
                       <Fab  aria-label="Add" size="small" onClick={() => this.recoverBook(book.id)}>
                       <RecoverIcon />
                         </Fab>}
       
                     </TableCell>

                  </TableRow>
                ))}
                 {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              </TableBody>
              
                <TableFooter>
                  <TableRow>
                    <TablePagination
                       rowsPerPageOptions={[10, 20, 50]}
                       colSpan={6}
                       count={this.state.allBooks.length}
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

          
            <Dialog
              open={open}
              onClose={this.handleToggle}

              >
       <DialogTitle id="form-dialog-title">Edit Book</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Please fill or change the fields below to update this book
          </DialogContentText >
          
          <div className= "tm0" > 
              <FormControl className= "w100p">
                <InputLabel >
                  Book Name
                </InputLabel >
                  <Input
                    name='name'
                    onChange={this.handleChange}
                />
              </FormControl>
            </div>
            
            <div className= "tm40"> 
              <FormControl className= "w100p" >
                <InputLabel>
                  Author
                </InputLabel>
                  <Input
                    name='author'
                    onChange={this.handleChange}
                  />
              </FormControl>
            </div>

            <div className= "tm40"> 
              <FormControl className= "w100p">
                <InputLabel >
                  Publication Date
                </InputLabel>
                  <Input 
                    type="date" 
                    name='publicationDate'
                    onChange={this.handleChange}
                    startAdornment={
                      <InputAdornment position="start" > 
                        <CalendarToday />
                      </InputAdornment>
                    }
                  />
              </FormControl>
            </div>

            <div className= "tm40"> 
              <FormControl className= "w100p">
                <InputLabel >Base Location</InputLabel>
                  <Select
                    native

                    onChange={this.handleChange}
                    inputProps={{
                    name: 'locationId'
                    }}    
                  >
                    <option value={""}></option>
                    {this.state.locations.map(reservedBook => (
                    <option key = {reservedBook.id} value={reservedBook.id}> {reservedBook.locName} </option>
                    ))}

                  </Select>
              </FormControl>
            </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            Cancel
          </Button>

           <Button color="primary" onClick={this.handleEditBook}>   
             Update
           </Button>

         </DialogActions>

    </Dialog>

        </Paper>

       
      </Container>
     
    )
  }
}

export default UpdateBook