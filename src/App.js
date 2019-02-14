import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainContent from './components/mainContent/MainContent';
import Header from './components/header/Header';



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <MainContent />
        
      </React.Fragment>
    );
  }
}

export default App;
