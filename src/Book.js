import React from 'react';

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = (e) => {
    this.setState({value: e.target.value})
    console.log('state: ', this.state.value, 'e.target.value: ', e.target.value) // , e.target.value
    //BooksAPI.update(TODOBOOK, e.target.value); // pass book obj

  }
  render() {
    const { book, handleChange } = this.props;
    
    

    return (
      <div>
        <div>Book Component: {book.title}</div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.value} onChange={(e) => this.handleChange(e)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">To Kill a Mockingbird</div>
          <div className="book-authors">Harper Lee</div>
        </div>
      </div>
      
    )
  }
}
export default Book;
