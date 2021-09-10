import React from 'react'
import { Link } from 'react-router-dom';
import Book from './Book';
import { getAll} from '../BooksAPI';
class Search extends React.Component {
  async componentDidMount(){
    try{
      const books=await getAll();
      this.props.showBook(books);
    }catch(err){
     console.log(err);
    }
  }
    render() { 
        return (     
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to={"/"}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" 
                name="query" onChange={e=>this.props.handleSearch(e)} value={this.props.query}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"> 
              {this.props.searchBooks&&this.props.searchBooks.map(book => {
                const bookShelf=this.props.allBooks.find(b=>
                  b.id===book.id
                  
                  );
                if(bookShelf){book.shelf=bookShelf.shelf;}
                else {book.shelf='none';}
                return (<Book key={book.id} {...book} handleShelf={this.props.handleShelf} showBook={this.props.showBook}/>);
                })}
              </ol>
            </div>
          </div>
        );
    }
}
 
export default Search;