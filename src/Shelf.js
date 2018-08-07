import React from 'react';
import Book from './Book.js';

const Shelf = (props) => {  
  return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.booksOnShelf.map((book) => {
            return (
              <li key={book.id}><Book book={book}  refreshShelves={props.refreshShelves}/></li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
export default Shelf;
