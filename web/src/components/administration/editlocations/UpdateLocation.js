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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
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
    locations: [],
    rowsPerPage: 10,
    page: 0,
    open: false,
  };

  componentDidMount() {
    axios.get("http://localhost:8080/locations")
    .then(res => { 
      console.log(res);
      this.setState({locations: res.data})
    });

  }

  deleteLocation(id) {
    axios.delete(`http://localhost:8080/locations/${id}`)
    window.location.reload()
  }

  recoverLocation(id) {
    axios.put(`http://localhost:8080/locations/${id}/recover`)
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

    const { locations, rowsPerPage, page, open } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, locations.length - page * rowsPerPage);

   

    return (
      <Container>
        <Paper className="tm20">
 
          
        <Grid item xs={12} >
        <div className="hs">All locations </div> 
                </Grid>


            <Table className="bm80">
              <TableHead className="ts">
                <TableRow>
                  <TableCell > <p className="ts">Base location </p></TableCell>
                  <TableCell > <p className="ts">Edit location </p> </TableCell>
                  <TableCell > <p className="ts">Delete / Recover location </p> </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.locations
                
               

              .sort(function (a, b) {

                if(a.locDeletedStatus === b.locDeletedStatus)
                {
                    return (a.locName < b.locName) ? -1 : (a.locName > b.locName) ? 1 : 0;
                }
                else
                {
                    return (a.locDeletedStatus < b.locDeletedStatus) ? -1 : 1;
                }


            })
          
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                
                
                .map(location => (
               
                 

                  <TableRow key={location.id}>
                    <TableCell >
                    {!location.locDeletedStatus ?  <div > 
                    {location.locName} </div>  : 
                       

                    <div className="bcgr fi"> 
                    {location.locName} </div>   }
                    </TableCell>
                    <TableCell className="p0i">
                    {!location.locDeletedStatus ?  <Fab color="primary" aria-label="Add" size="small" onClick={this.handleToggle} >
                    <EditIcon/>

                    </Fab>  : 
                    <div className="bcgr fi">Location is Deleted </div>}

                   
                    </TableCell>
                   
                  <TableCell className="p0i" >

                     {!location.locDeletedStatus ?  <Fab color="secondary" aria-label="Add" size="small" onClick={() => this.deleteLocation(location.id)}>
                        <DeleteIcon />
                       </Fab>  : 
                       <Fab  aria-label="Add" size="small" onClick={() => this.recoverLocation(location.id)}>
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
                       colSpan={3}
                       count={this.state.locations.length}
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
            Please change the field below to update this Location
          </DialogContentText >
          
          <div className= "tm0" > 
              <FormControl className= "w100p">
                <InputLabel >
                  Location Name
                </InputLabel >
                  <Input
                    name='name'
                    onChange={this.handleChange}
                />
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