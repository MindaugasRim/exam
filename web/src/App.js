import React, { Component, Fragment } from 'react';
import SideBar from './components/SideBar';

class App extends Component{

  render() { 

  return (
    <Fragment>
      <SideBar/>
      {this.props.children}
    </Fragment>
  );
 }
}
export default App;
