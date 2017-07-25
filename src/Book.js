import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {


    
    // getISBNIdentifier = (industryIdentifiers) => {
    //     var ISBNObj = industryIdentifiers.filter(function( obj ) {
    //     return obj.type == 'ISBN_13';
    //     });
        
    //     return ISBNObj[0].identifier;
    // }

    render() {
        const book = this.props.book;
        // const identifier = {...book.industryIdentifiers}; console.log(identifier);

        return (
            // <li key={this.getISBNIdentifier(book.industryIdentifiers)}>
            <li>    
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{[...book.authors].join(', ')}</div>
                </div>

            </li>

        )
    }
}

export default Book