import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "axios";
import "./styles.css";
import AddCustomer from './components/administration/customers/AddCustomer';
import AddInventory from './components/administration/inventory/AddInventory';
import WarehouseContainer from './components/warehouse/WarehouseContainer';
import ReportsContainer from './components/reports/ReportsContainer'

ReactDOM.render(

    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={WarehouseContainer}/>
          <Route exact path="/customers" component={AddCustomer}/>
          <Route exact path="/inventory" component={AddInventory}/>
          <Route exact path="/reports" component={ReportsContainer}/>
        </Switch>
      </App>
    </BrowserRouter>,
    
    document.getElementById("root")
  );
