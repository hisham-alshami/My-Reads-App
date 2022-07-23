import React from "react";
import { Route , Routes } from "react-router-dom";
import MainPage from "./componant/MainPage";
import SearchPage from "./componant/SeachPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    error: false,
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).catch((error) => {
      console.log(error);
      this.setState({ error: true });
    });

    if (shelf === "none") {
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b.id !== book.id),
      }));
    } else {
      book.shelf = shelf;
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b.id !== book.id).concat(book),
      }));
    }
  };

  render() {
    // console.log(this.state.books);
    if (this.state.error) {
      return <div>Network error. Please try again later.</div>;
    }
    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainPage books={this.state.books} moveShelf={this.moveShelf} />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage books={this.state.books} moveShelf={this.moveShelf} />
            }
          />
        </Routes>
      </div>
    );
  }
}
export default BooksApp;

