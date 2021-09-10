import React from 'react'
import Book from "./Book";
import { getAll} from '../BooksAPI';
class Row extends React.Component {
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
        <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
           {this.props.books&& this.props.books.map(book=><Book key={book.id} {...book} handleShelf={this.props.handleShelf} showBook={this.props.showBook}/>)}
          </ol>
        </div>
      </div>
      );
    }
}
 
export default Row;