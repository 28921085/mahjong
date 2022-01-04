import React, { Component, useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import FuncMenu from './FuncMenu';
// import './App.css';
class App extends Component{
  constructor(){
    super()
    this.a=1;
    this.state={
      disable:null
    }
  }
  doEat(){
    console.log(this.a)
    this.setState({
      
    })
    this.a++
  }
  render(){
    return <Button variant="outline-info"  disabled={this.state.disable}onClick={()=>this.doEat()}>YA</Button>
  }
}
;

export default App;