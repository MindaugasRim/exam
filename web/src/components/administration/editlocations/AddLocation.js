import React, { Component, Fragment } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Container } from 'reactstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export default class AddBook extends Component {
  
  state = {
    locations: [],
    errorText: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAddLocation = event => {
    event.preventDefault();
  
    axios.post("http://localhost:8080/locations", {
      locName: this.state.locName, 
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
          <Paper className= " tm20 bm80"> 

        <Grid item xs={12} >
        <div className="hs"> Create new location </div> 
        </Grid>

            <div className= "tm20 pl20 pr20 pb20"> 
              <FormControl className= "w50p">
                <InputLabel >
                  Location Name
                </InputLabel>
                  <Input
                     
                    name='locName'
                    onChange={this.handleChange}
                />
              </FormControl>
            </div>

            <div className= "tm40 pl20 pr20 pb20"> 

            <Button variant="contained" color="primary" onClick={this.handleAddLocation}>
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