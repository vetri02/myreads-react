import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import SearchBooks from "./SearchBooks";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      userBooks: [],
      showSearchPage: true,
      bookIdandState: {}
    };
  }

  /**
    * @description set the book state like which shelf changes
    * @param {object} param - data of which book the event took place
    * @param {event} event - select event 
    */

  setBookState = param => event => {
    const self = this;

    let bookIdAvailable = self.state.userBooks.filter((book, i) => {
      return book.id === param.id;
    });

    if (bookIdAvailable.length) {
      let changedUserBooks = self.state.userBooks.map((book, i) => {
        if (param.id === book.id) {
          book.shelf = event.target.value;
          return book;
        } else {
          return book;
        }
      });

      this.setState({
        userBooks: changedUserBooks
      });
    } else {
      let addedUserBooks = self.state.userBooks;

      param.shelf = event.target.value;

      addedUserBooks.push(param);

      return this.setState({
        userBooks: addedUserBooks
      });
    }

    this.setbookIdandState();
  }

  /**
    * @description extract bookId and shelf state into an object
    * @param {object} books - books in the master view
    */

  setbookIdandState = books => {
    books = books || this.state.userBooks;
    let bookIdandState = {};
    books.forEach(book => {
      bookIdandState[book.id] = book.shelf;
    });

    this.setState({
      bookIdandState
    });
  };

  /**
    * @description fetch initial user data
    */

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ userBooks: books });
      this.setbookIdandState(books);
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) =>
            <SearchBooks
              userBooks={this.state.userBooks}
              bookIdandState={this.state.bookIdandState}
              setBookState={this.setBookState}
            />}
        />

        <Route
          exact
          path="/"
          render={() =>
            <BookShelf
              userBooks={this.state.userBooks}
              setBookState={this.setBookState}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
