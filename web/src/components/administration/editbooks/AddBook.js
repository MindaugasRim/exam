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

export default class AddBook extends Component {
  
  state = {
    locations: [],
    books: [],
    notDeletedlocations: [],
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

  render() {

    return (
      <MuiThemeProvider>
        <Fragment>
          <Container> 
          <Paper className= "tm20 bm80"> 

          <Grid item xs={12} >
           <div className="hs"> Create new book </div> 
          </Grid>

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w50p">
                <InputLabel >
                  Book Name
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
                  Author
                </InputLabel>
                  <Input
                    name='author'
                    onChange={this.handleChange}
                  />
              </FormControl>
            </div>

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w25p ">
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

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w25p">
                <InputLabel >Base Location</InputLabel>
                  <Select
                    native
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'locationId'
                    }}    
                  >
                    <option value={""}></option>
                    {this.state.notDeletedlocations
                    
                    .map(location => (
                    <option key = {location.id} value={location.id}> {location.locName} </option>
                    ))
                    
                    
                    }

                  </Select>
              </FormControl>
            </div>

            <div className= "tm20 pl20 pr20 pb20"> 
            <Button variant="contained" color="primary"  onClick={this.handleAddBook}>
              Create
            </Button>
 
            </div>
            </Paper>
          </Container>
        </Fragment>
      </MuiThemeProvider>
 
    )
  }
}