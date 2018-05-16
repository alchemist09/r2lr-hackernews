import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3, 
    points: 4,
    objectID: 0
  }, 
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clarke',
    num_comments: 2,
    points: 6,
    objectID: 1
  },
  {
    title: 'Angular',
    url: 'https://angular.io',
    author: 'Misko Hevery',
    num_comments: 3,
    points: 4, 
    objectID: 2
  }
]

const isSearched = searchTerm => item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list,
      projectName: "Hacker News",
      searchTerm: ''
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  toggleProjectName() {
    let nameOfProject = this.state.projectName;
    const nameOfProjectIsUpperCase = (nameOfProject === nameOfProject.toLocaleUpperCase());
    nameOfProject = nameOfProjectIsUpperCase ? nameOfProject.toLocaleLowerCase() : nameOfProject.toLocaleUpperCase();
    this.setState({ projectName: nameOfProject });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { list, projectName, searchTerm } = this.state;
    return (
      <div className="App">
        <h2>
          {projectName} 
          <button type="button"
                  onClick={() => this.toggleProjectName()}>Toggle Case</button>
        </h2>

        <form>
          <input type="text"
                 onChange={ this.onSearchChange } 
          />
        </form>
        {
          list.filter(isSearched(searchTerm)).map(item => 
            <div key={item.objectID}>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                  <button onClick={() => this.onDismiss(item.objectID)}
                          type="button"> 
                    Dismiss
                  </button>
                </span>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
