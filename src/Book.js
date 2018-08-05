import React from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 'none'}
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = (e) => {
    this.setState({value: e.target.value})
    console.log('state: ', this.state.value, 'e.target.value: ', e.target.value, 'this.props.book: ', this.props.book) // , e.target.value
    console.log('calling update with: ', this.props.book.id, e.target.value)
    BooksAPI.update({id: this.props.book.id}, e.target.value)
      .then((res) => {
        console.log('update res: ', res);
        this.props.refreshShelves();
      });

  }
  render() {

    const { book } = this.props;
     
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.value} onChange={(e) => this.handleChange(e)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option selected value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.reduce((acc, val) => {
            return `${acc} ${val}`
          }, '')}</div>
        </div>
      </div>
      
    )
  }
}
export default Book;
