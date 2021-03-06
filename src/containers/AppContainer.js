import { connect } from 'react-redux'
import { fetchBookList, fetchOneBook, createBook, addBookToList } from '../reducers'

import App from '../components/App/App'

function mapStateToProps(state) {
  return {
    bookList: state.bookList, 
    singleBook: state.singleBook,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    addSubmit: function(event) {
      event.preventDefault();
	  let newContent = {
	      title: event.target.title.value, 
	      author: event.target.author.value, 
	      publicationDate: event.target.publicationDate.value, 
	      genre: event.target.genre.value,
        summary: event.target.summary.value
	   }
	    dispatch(createBook(newContent)).then((action) => dispatch(addBookToList(action.book)))
	    event.target.title.value = "";
	    event.target.author.value = "";
	    event.target.publicationDate.value = ""
	    event.target.genre.value = event.target.genre.value;
      event.target.summary.value= ""
    }, 
    loadBooks: function() {
      return dispatch(fetchBookList());
    }, 
    loadSingleBook: function(bookId) {
      return dispatch(fetchOneBook(bookId));
    },
    loadNewBook: function(book) {
     return dispatch(addBookToList(book))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

