import React, { Component } from 'react';
import './App.css';
import XlsReader from "./XlsReader/XlsReader";
import { ExcelRenderer } from 'react-excel-renderer';
import TradeList from './TradeList/TradeList';
import Heading from './Heading/Heading';
import TaxesCalculator from "./TaxesCalculator/TaxesCalculator";
import { v4 as uuidv4 } from 'uuid';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tradeArr: []
    }
  }

render() {
  return (
    <div className="App">
      <Heading />
      <XlsReader change={this.changeHandler} />
      <TaxesCalculator tradeList={this.state.tradeArr} />
      <TradeList tradeList={this.state.tradeArr} />
    </div>
  );
}


changeHandler = (file) => {
  ExcelRenderer(file, (err, resp) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(resp.rows, uuidv4());
      resp.rows.map(el => el.id = uuidv4());
      this.setState({tradeArr: resp.rows.slice(1)});
    }
  });
}

removeEmptyCells(arr) {
  return arr.filter(el => el != null);
}
}

export default App;
