import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book.js';
import Shelf from './Shelf.js';
import Search from './Search';

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
      searchTerm: '',
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
          <Search />
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
