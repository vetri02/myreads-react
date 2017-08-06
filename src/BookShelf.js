import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";

class BookShelf extends Component {
  static propTypes = {
    userBooks: PropTypes.array.isRequired,
    setBookState: PropTypes.func.isRequired
  };

  /**
    * @description separate books as per shelf
    * @param {array} userBooks - user book list from api
    * @param {string} shelf - which shelf
    */
  getShelfbooks = (userBooks, shelf) => {
    if (!userBooks.length) {
      userBooks = [];
    }
    return userBooks.filter(book => book.shelf === shelf);
  };

  render() {
    let userBooks = this.props.userBooks;

    let currentBooks = this.getShelfbooks(userBooks, "currentlyReading");
    let wantToReadBooks = this.getShelfbooks(userBooks, "wantToRead");
    let readBooks = this.getShelfbooks(userBooks, "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentBooks.map(book =>
                    <Book
                      book={book}
                      key={book.id}
                      setBookState={this.props.setBookState}
                    />
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map(book =>
                    <Book
                      book={book}
                      key={book.id}
                      setBookState={this.props.setBookState}
                    />
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map(book =>
                    <Book
                      book={book}
                      key={book.id}
                      setBookState={this.props.setBookState}
                    />
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;
