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



export class BookList extends Component {

  state = {

    customers: [],
  
    customersByOrder: [],
    customersByWeight: [],
    inventoryByWeight: [],
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

    axios.get("http://localhost:8080/inventory/weight")
    .then(res => { 
      console.log(res);
      this.setState({inventoryByWeight: res.data})
    });

    
    
  }

  handleReserveBook = (id) => {
    axios.post(`http://localhost:8080/books/${id}/reserve`,  {customerId: 1 })
    .then(res => { 
      console.log(res);
      window.location.reload()
    });
  };


  

  

  render() {
    // const { customersByOrder } = this.state;


    return (
      <Container>
    
        <Paper className="tm20">
        <Grid item xs={12} >
        <div className="hs"> Report by order quantity </div> 
        </Grid>
      
          <Table  className="bm80 " >
          
            <TableHead className="ts">
              <TableRow  className="ts"> 
                <TableCell> <p className="ts">Name </p></TableCell>
                <TableCell > <p className="ts">weight </p></TableCell>
         
                <TableCell > <p className="ts">Sector number </p> </TableCell>
             
                <TableCell > <p className="ts">Place Date </p> </TableCell>
              </TableRow>
              
            </TableHead>
         
            <TableBody>
            {this.state.inventoryByWeight
 .map(customer => (
                <TableRow key={customer.id}>
                    <TableCell >
                    {customer.name}
                    </TableCell>
                    <TableCell >
                    {customer.weight}
                    </TableCell>
                   
                    <TableCell >
                    {customer.sectorNumber}
                    </TableCell>
                    <TableCell >
                    {customer.placeDate}
                    </TableCell>
                  


                   
                </TableRow>
              ))}
                
            </TableBody>
            
           
             
          </Table>


          

         
        </Paper>
        
      </Container>
   
    )
  }
}

export default BookList