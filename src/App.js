import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainContent from './components/mainContent/MainContent';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <MainContent />
        <Footer />
        
      </React.Fragment>
    );
  }
}

export default App;
