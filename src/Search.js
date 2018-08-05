import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Shelf from './Shelf.js';
import Book from './Book.js';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: []
    }
    this.search = this.search.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }
  
  updateSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  noResultBook = {
    title: 'No Results',
    authors: [],
    img: '',
    shelf: '',
    id: '',
    imageLinks: {thumbnail: ''}
  }

  search(e) {
    console.log(e)
    // e.preventDefault();
    BooksAPI.search(e)
      .then((res) => {
        console.log('search term: ', e, 'search res: ', res)
        if (res.length > 0) {
          this.setState({searchResults: res})
        } else {
          this.setState({searchResults: [this.noResultBook]})
        }
      })
  }

  render() {
        //  this.search('react')
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link
          to="/"
          className="close-search"
        >Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}

          {/* TODO make submit call API */}
          <form onSubmit={(e) => {
            e.preventDefault();
            this.search(this.state.searchTerm);
            }}>
          <input value={this.state.searchTerm} onChange={(e) => this.updateSearchTerm(e)} type="text" placeholder="Search by title or author"/>
          </form>

        </div>
      </div>
      <Shelf refreshShelves={this.props.refreshShelves} booksOnShelf={this.state.searchResults} shelfName="Search Results" />
    </div>
    )
  }
}

export default Search;
