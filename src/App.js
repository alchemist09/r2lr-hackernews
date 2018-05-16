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
];

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
    this.toggleProjectName = this.toggleProjectName.bind(this);
  }

  toggleProjectName() {
    let nameOfProject = this.state.projectName;
    const nameOfProjectIsUpperCase = (nameOfProject === nameOfProject.toLocaleUpperCase());
    nameOfProject = nameOfProjectIsUpperCase ? nameOfProject.toLocaleLowerCase() : nameOfProject.toLocaleUpperCase();
    this.setState({ projectName: nameOfProject });
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const {list, projectName, searchTerm } = this.state;
    return (
      <div className="App">
        <h2>
          {projectName} 
          <button type="button"
                  onClick={() => this.toggleProjectName()}>Toggle Case</button>
        </h2>

        <Search
         value={searchTerm}
         onChange={this.onSearchChange}
        />

        <Table
         list={list}
         pattern={searchTerm}
         onDismiss={this.onDismiss}
        />
        
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <form>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {
          list.filter(isSearched(pattern)).map(item => 
            <div key={item.objectID}>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                  <button onClick={() => onDismiss(item.objectID)}
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
