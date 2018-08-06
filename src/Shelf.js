import React from 'react';
import Book from './Book.js';

class Shelf extends React.Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.booksOnShelf.map((book) => {
              return (
                <li key={book.id}><Book book={book}  refreshShelves={this.props.refreshShelves}/></li>
              )
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
