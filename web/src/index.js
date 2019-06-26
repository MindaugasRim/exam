import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "axios";
import "./styles.css";
import BooksContainer from "./components/books/BooksContainer";
import EditBooksContainer from './components/administration//editbooks/EditBooksContainer';
import EditLocationsContainer from './components/administration/editlocations/EditLocationsContainer';
import AddCustomer from './components/administration/customers/AddCustomer';
import AddInventory from './components/administration/inventory/AddInventory';

ReactDOM.render(

    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={BooksContainer}/>
          <Route exact path="/books" component={EditBooksContainer}/>
          <Route exact path="/locations" component={EditLocationsContainer}/>
          <Route exact path="/customers" component={AddCustomer}/>
          <Route exact path="/inventory" component={AddInventory}/>
        </Switch>
      </App>
    </BrowserRouter>,
    
    document.getElementById("root")
  );
