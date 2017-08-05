import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {debounce} from 'throttle-debounce';
 
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

    constructor() {
    super();
    this.state = {
        query: '',
        books: []
    }
    this.getResult = debounce(1000, this.getResult);
  }
    
    
    updatequery = (event) => {
            event.persist();

            
            
            var query = event.target.value;
            this.setState({
                query: query.trim()
            })

            this.getResult(this.state.query)
            
    }


    clearQuery = () => {
        this.setState({
            query: ''
        })
    }

    getResult = (query) => {
        if(!query) return;
        BooksAPI.search(query, 10).then((books) => {
            if(books && books.length){
                this.setState({books})
            } else {
                this.setState({books: []})
            }
            
        })
    }

    setBookState = (event) => {

    }
    
    render() {
        
        const { books, query } = this.state;

        let booksList = null;

        if(books.length > 0){
            booksList = books.map((book) => {
                return <Book book={book} key={book.id} setBookState={this.setBookState}/>
            })
        } else {
            booksList = '';
        } 

        

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search">Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
        )
    }
}

export default SearchBooks