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
      <div className="page">
        <h2>
          {projectName} 
          <button type="button"
                  onClick={() => this.toggleProjectName()}>Toggle Case</button>
        </h2>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>

        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({value, onChange, children}) => 
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }

const Table = ({list, pattern, onDismiss}) =>
  <div className="table">
    {
      list.filter(isSearched(pattern)).map(item => 
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>{
            item.author}
          </span>
          <span style={smallColumn}>
            {item.num_comments}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span>
            <Button onClick={() => onDismiss(item.objectID)}
                    className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      )
    }
  </div>

const Button = ({onClick, className = '', children}) =>
  <button
   onClick={onClick}
   className={className}
   type="button"
  >
    {children}
  </button>

export default App;
