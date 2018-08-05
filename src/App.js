import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book.js';
import Shelf from './Shelf.js';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [{
        title: '',
        authors: [],
        img: '',
        shelf: '',
        id: '',
        imageLinks: {thumbnail: ''}
      }],
      shelves: () => {
        return this.state.allBooks.reduce((acc, val) => {
          if (!acc.includes(val.shelf)){
            acc.push(val.shelf);
          }
          return acc;
        }, [])
      }
    };
    this.makeShelves = this.makeShelves.bind(this);
  }
  
  makeShelves() {
    let shelves = this.state.allBooks.reduce((acc, val) => {
      if (!acc.includes(val.shelf)){
        acc.push(val.shelf);
      }
      return acc;
    }, []);
    return shelves.map((shelf) => {
      // return array with shelfId and array of books for that shelf
      return  [ shelf, this.state.allBooks.filter((book) => book.shelf === shelf)]
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((res) => {
        this.setState(Object.assign({}, {allBooks: res}));
        console.log(this.makeShelves())
        console.log(this.state.shelves())
      });
  }


  render() {
    const shelves = {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read'
    }
    const allBooks = (this.state.allBooks[0]);
    console.log('allBooks: ', allBooks, allBooks.title);
    return (
      <div className="app">
        <Route path="/search" render={() => (
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
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          ) 
        }/>
        
        <Route exact path='/' render={(history) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                {this.makeShelves().map((v) => <Shelf booksOnShelf ={v[1]} shelfName={shelves[v[0]]}/>)}

                </div>
              </div>
              <Link className="open-search"
                to='/search'
                >Add a book
              </Link>
            </div>
          )
        }/>
      </div>
    )
  }
}

export default BooksApp
