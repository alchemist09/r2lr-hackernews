import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const welcome = "Welcome to the Road to learn React";
    const person = {
      firstname: "Robin",
      lastname: "Weiruch"
    }
    return (
      <div className="App">
        <h2>{welcome}</h2>
        <h3>Instructor</h3>
        <p>Firstname: {person.firstname}</p>
        <p>Lastname: {person.lastname}</p>
      </div>
    );
  }
}

export default App;
