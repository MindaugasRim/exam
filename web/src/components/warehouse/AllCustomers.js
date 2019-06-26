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
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCity from '@material-ui/icons/LocationCity';
import { Link } from "react-router-dom";

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
    rowsPerPage: 5,
    page: 0,
    customers: [],
    open: false,
  };


  componentDidMount() {
    axios.get("http://localhost:8080/books/reservation-info")
    .then(res => { 
      console.log(res);
      this.setState({books: res.data})
    });

    axios.get("http://localhost:8080/customers/all")
    .then(res => { 
      console.log(res);
      this.setState({customers: res.data})
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

  handleToggle = () => {
    this.setState({ open: !this.state.open
  })
  }

  render() {
    const { customers, rowsPerPage, page, open } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);

    return (
      <Container>
    
        <Paper className="tm20">
        <Grid item xs={12} >
        <div className="hs"> All customers </div> 
        </Grid>
      
          <Table  className="bm80 " >
          
            <TableHead className="ts">
              <TableRow  className="ts"> 
                <TableCell> <p className="ts">Name </p></TableCell>
                <TableCell > <p className="ts">Surname </p></TableCell>
                <TableCell > <p className="ts">Client type </p> </TableCell>
                <TableCell > <p className="ts">Register Inventor (pcs.) </p> </TableCell>
                <TableCell > <p className="ts">View customer </p> </TableCell>
              </TableRow>
              
            </TableHead>
         
            <TableBody>
            {this.state.customers

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

 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(customer => (
                <TableRow key={customer.id}>
                    <TableCell >
                    {customer.firstName}
                    </TableCell>
                    <TableCell >
                    {customer.lastName}
                    </TableCell>
                    <TableCell >
                    {!customer.clientTypeStatus ?  <div > 
                    {"Casual"} </div>  : 
                    <div className="bcgr fi"> 
                    {"Loyal"} </div>   }
                    </TableCell>
                    <TableCell >
                    {customer.quantity}
                    </TableCell>

                    <TableCell >
                    <Fab color="primary" aria-label="Add" size="small" onClick={this.handleToggle} >
                    <EditIcon/>
          

                    </Fab>
                    {/* <Link to={'/customers/'+customer.id }>   <EditIcon/> </Link> */}

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
                       rowsPerPageOptions={[5, 20, 50]}
                       colSpan={6}
                       count={this.state.customers.length}
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


          

          {this.state.customers.map(customer => (

           <Dialog
              open={open}
              onClose={this.handleToggle}

              >
       <DialogTitle id="form-dialog-title"> Client {customer.firstName} {customer.lastName}</DialogTitle>
        <DialogContent >
      
          
          <div className= "tm0" > 
          <TableRow  className="ts"> 
                <TableCell> <p className="ts">Name </p></TableCell>
                <TableCell > <p className="ts">Surname </p></TableCell>
                <TableCell > <p className="ts">Birth date </p> </TableCell>
                <TableCell > <p className="ts">Phone number </p> </TableCell>
                <TableCell > <p className="ts">Client type </p> </TableCell>
     
              </TableRow>
              <TableRow key={customer.id}>
                    <TableCell >
                    {customer.firstName}
                    </TableCell>
                    <TableCell >
                    {customer.lastName}
                    </TableCell>
                    <TableCell >
                    {customer.birthDate}
                    </TableCell>
                    <TableCell >
                    {customer.phoneNumber}
                    </TableCell>
                    <TableCell >
                    {!customer.clientTypeStatus ?  <div > 
                    {"Casual"} </div >  : 
                    <div className="bcgr fi"> 
                    {"Loyal"} </div>   }
                    </TableCell>
                  

                </TableRow>
               
                <div className="bm80 tm40 ">
        <ListItem button component={Link} to="/inventory">
              <ListItemIcon>{ <LocationCity/>}</ListItemIcon>
              <ListItemText>{ "Press to register new Inventory "}</ListItemText>
            </ListItem>
            </div>
            </div>
            
           

            


        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            Cancel
          </Button>

         

         </DialogActions>

    </Dialog> 

    ))}
        </Paper>
        <Grid item xs={12} >
        <div className="hs"> New Customer registration </div> 
        </Grid>
        <div className="bm80 ">
        <ListItem button component={Link} to="/customers">
              <ListItemIcon>{ <LocationCity/>}</ListItemIcon>
              <ListItemText>{ "Press to create new customer"}</ListItemText>
            </ListItem>
            </div>
      </Container>
   
    )
  }
}

export default BookList