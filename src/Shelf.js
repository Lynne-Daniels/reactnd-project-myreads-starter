import React from 'react';
import Book from './Book.js';

class Shelf extends React.Component {

  render() {
    return (
      <div>Shelf Component{this.props.shelfName}
        {this.props.booksOnShelf.map((book) => {
          return (
            <li><Book book={book}  handleChange={this.handleChange}/></li>
          )
        })}
      </div>
    );
  }
}

export default Shelf;
