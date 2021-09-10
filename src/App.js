import React from 'react'
import { getAll, search , update} from './BooksAPI';
import './App.css'
import Row from './components/Row'
import Search from './components/Search';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
class BooksApp extends React.Component {
  constructor(){
    super();
  this.state={
    query:'',
    books:[],
    currentlyReading:[],
    wantToRead:[],
    read:[],
    searchBooks:[],
    allBooks:[],
  showBook:books=>{
      const currentlyReading=books.filter(book=>book.shelf==='currentlyReading');
      const wantToRead=books.filter(book=>book.shelf==='wantToRead');
      const read=books.filter(book=>book.shelf==='read');
      this.setState({books,currentlyReading,wantToRead,read});
      this.setState({allBooks:[...currentlyReading,...wantToRead,...read]});
    },
  handleShelf:(book,shelf)=>{ 
   update(book,shelf)
        .then(()=>{
         const newBooks=this.state.books.map(b=>{
          if( b.id ===book.id){
            b.shelf=shelf;
          }
          return b
             });
            this.state.showBook(newBooks);
        }).catch(err=>{
          console.log(err);
        })
  },
  handleSearch:( q)=>{
    const query=q.target.value;
    this.setState({query:query});
    if(query){
    search(query)
     .then((result) => {     
      if (result && result.length) {   
        this.setState({searchBooks: result}) ;
        console.log(result);
      } else {
        this.setState({searchBooks: []});
      }
    })
    .catch(err=>{
      this.setState({searchBooks: []});
      console.log(err)
    })
  }
  },
  
};
}

async componentDidMount(){
  try{
    const books=await getAll();
    this.state.showBook(books);
    console.log(books);
  }catch(err){
   console.log(err);
  }

}
  render() {
    return (
      <Router>
      <div className="app">
        <Switch >
          <Route exact path="/search">
          <Search searchBooks={this.state.searchBooks} handleSearch={this.state.handleSearch} handleShelf={this.state.handleShelf} query={this.state.query} showBook={this.state.showBook} allBooks={this.state.books}/>
          </Route>
          <Route exact path="/">
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <Row title="Current Reading" books={this.state.currentlyReading} handleShelf={this.state.handleShelf} showBook={this.state.showBook} />
            <Row title="want To read" books={this.state.wantToRead} handleShelf={this.state.handleShelf}  showBook={this.state.showBook}/>
            <Row title="read" books={this.state.read} handleShelf={this.state.handleShelf}  showBook={this.state.showBook}/>
            </div>
            <div className="open-search">
              <Link className="search-button" to={"/search"}> Add a book</Link>    
           </div>      
           </div> 
          </Route>
         </Switch>
      </div>
      </Router>
    )
  }
}

export default BooksApp
