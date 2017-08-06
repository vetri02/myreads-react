import React, { Component } from "react";
import { throttle } from "throttle-debounce";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      books: []
    };
    this.getResult = throttle(300, this.getResult);
  }

  static propTypes = {
    userBooks: PropTypes.array.isRequired,
    setBookState: PropTypes.func.isRequired,
    bookIdandState: PropTypes.object.isRequired
  };

  /**
    * @description Update Query State
    * @param {event} event - event from the query change
    */

  updatequery = event => {
    event.persist();
    var query = event.target.value;
    this.setState({
      query: query
    });

    if (query) {
      this.getResult(query.trim());
    } else {
      this.setState({ books: [] });
    }
  };

  /**
    * @description get result through api fetch
    * @param {string} query - search query
    */

  getResult = query => {
    BooksAPI.search(query, 10).then(books => {
      if (books && books.length) {
        this.setState({ books });
      } else {
        this.setState({ books: [] });
      }
    });
  };

  render() {
    const { books, query } = this.state;
    const { setBookState, bookIdandState } = this.props;

    let booksList = null;

    if (books.length > 0) {
      booksList = books.map((book, i) => {
        if (bookIdandState[book.id]) {
          book.shelf = bookIdandState[book.id];
        }

        return <Book book={book} key={book.id + i} setBookState={setBookState} />;
      });
    } else {
      booksList = "";
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.updatequery.bind(this)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksList}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
