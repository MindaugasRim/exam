import React, { Component, Fragment } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Container } from 'reactstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";


export default class AddInventory extends Component {
  
  state = {
    locations: [],
    books: [],
    notDeletedlocations: [],
    customers: [],
    inventory: [],
  }

  componentDidMount() {
    axios.get("http://localhost:8080/locations")
    .then(res => { 
        console.log(res);
        this.setState({locations: res.data})
    });

    axios.get("http://localhost:8080/locations/not-deleted")
    .then(res => { 
        console.log(res);
        this.setState({notDeletedlocations: res.data})
    });

    axios.get("http://localhost:8080/customers")
    .then(res => { 
        console.log(res);
        this.setState({customers: res.data})
    });

    axios.get("http://localhost:8080/inventory")
    .then(res => { 
        console.log(res);
        this.setState({inventory: res.data})
    });

  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAddBook = event => {
    event.preventDefault();
  
    axios.post("http://localhost:8080/books", {
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

  handleAddCustomer = event => {
    event.preventDefault();
  
    axios.post("http://localhost:8080/customers", {
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      birthDate: this.state.birthDate, 
      phoneNumber: this.state.phoneNumber, 
      clientTypeStatus: this.state.clientTypeStatus
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      
      })
      window.location.reload()
  }

  handleAddInventory = event => {
    event.preventDefault();
  
    axios.post("http://localhost:8080/inventory", {
      name: this.state.name, 
      weight: this.state.weight, 
      sectorNumber: this.state.sectorNumber, 
      placeDate: this.state.placeDate, 
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push("/");
      
      })

      // window.location.reload()
  }

  render() {

    return (
      <MuiThemeProvider>
        <Fragment>
          <Container> 
          <Paper className= "tm20 bm80"> 

          <Grid item xs={12} >
           <div className="hs"> Warehouse inventory registration </div> 
          </Grid>

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w50p">
                <InputLabel >
                  Inventory name
                </InputLabel>
                  <Input
                    
                    name='name'
                    onChange={this.handleChange}
                />
              </FormControl>
            </div>

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w50p" >
                <InputLabel>
                  Inventory weight
                </InputLabel>
                  <Input
                    name='weight'
                    onChange={this.handleChange}
                  />
              </FormControl>
            </div>

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w50p" >
                <InputLabel>
                  Inventory sector number
                </InputLabel>
                  <Input
                    name='sectorNumber'
                    onChange={this.handleChange}
                  />
              </FormControl>
            </div>

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w25p ">
                <InputLabel >
                 Inventory place Date
                </InputLabel>
                  <Input 
                    type="date" 
                    name='placeDate'
                    onChange={this.handleChange}
                    startAdornment={
                      <InputAdornment position="start" > 
                        <CalendarToday />
                      </InputAdornment>
                    }
                  />
              </FormControl>
            </div>

            <div className= "tm20 pl20 pr20 pb20"> 
            <Button variant="contained" color="primary" onClick={this.handleAddInventory} >
              register
            </Button>
 
            </div>
            </Paper>
          </Container>
        </Fragment>
      </MuiThemeProvider>
 
    )
  }
}