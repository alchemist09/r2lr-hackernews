import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;

const PATH_BASE     = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query=';
const PARAM_PAGE    = 'page=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}${DEFAULT_PAGE}`;
console.log(url);

// const isSearched = searchTerm => item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: "Hacker News",
      result: null,
      searchTerm: DEFAULT_QUERY
    };    

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.toggleProjectName = this.toggleProjectName.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  toggleProjectName() {
    let nameOfProject = this.state.projectName;
    const nameOfProjectIsUpperCase = (nameOfProject === nameOfProject.toLocaleUpperCase());
    nameOfProject = nameOfProjectIsUpperCase ? nameOfProject.toLocaleLowerCase() : nameOfProject.toLocaleUpperCase();
    this.setState({ projectName: nameOfProject });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ 
      result: { hits: updatedHits, page }
    });
  }

  fetchSearchTopstories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }

  render() {
    const { projectName, searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    console.log(this.state);

    return (
      <div className="page">
        <h2>
          {projectName} 
          <Button 
            onClick={() => this.toggleProjectName()}>Toggle Case</Button>
        </h2>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          <Button 
            onClick={() => this.fetchSearchTopstories(searchTerm, page + 1)}>
              More
          </Button>
        </div>
        { result &&
        <Table
          list={result.hits}
          onDismiss={this.onDismiss}
        /> 
        }
      </div>
    );
  }
}

const Search = ({value, onChange, onSubmit, children}) => 
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
    />
    <Button type="submit">{children}</Button>
  </form>

const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }

const Table = ({list, onDismiss}) =>
  <div className="table">
    {
      list.map(item => 
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

const Button = ({onClick, className = '', type='button', children}) =>
  <button
   onClick={onClick}
   className={className}
  >
    {children}
  </button>

export default App;
