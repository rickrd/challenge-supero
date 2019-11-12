import React, { Component } from "react";
import "./style.css";
import books from "./books.json";
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  state = {
    search: "",
    books: books,
    selected: {}
  };

  getBooksByYear = e => {
    let result;
    if (!e.target.value.length) {
      this.setState({ books: books });
    } else if (e.target.value.length < 4) return null;
    else {
      const { books } = this.state;
      e.target.name == "from"
        ? (result = books.filter(book => book.year >= e.target.value))
        : (result = books.filter(book => book.year <= e.target.value));
      this.setState({ books: result });
    }
  };

  getBooks = e => {
    e.preventDefault();
    const { search } = this.state;

    const result = search
      ? books.filter(book => {
          return (
            book.title.toLowerCase() == search.toLowerCase() ||
            book.author.toLowerCase() == search.toLowerCase() ||
            book.isbn == search
          );
        })
      : books;

    this.setState({ search: "", books: result });
  };

  render() {
    const { books, search, selected } = this.state;

    const columns = [
      {
        Header: "Livro",
        accessor: "title"
      },
      {
        Header: "Autor",
        accessor: "author"
      },
      {
        Header: "Editora",
        accessor: "editor"
      },
      {
        Header: "Ano",
        accessor: "year"
      },
      {
        Header: "Ações",
        accessor: "action",
        Cell: (
          <a
            href="#"
            onClick={e => {
              this.setState({
                selected: books.filter(
                  book =>
                    book.title ==
                    e.currentTarget.parentNode.parentNode.firstChild.innerHTML
                )
              });
            }}
          >
            Detalhes
          </a>
        )
      }
    ];

    return (
      <div className="App">
        <div className="container header">
          <div className="logo">
            <img src="logo.png" alt="logo"></img>
          </div>
          <div className="search">
            <form onSubmit={this.getBooks}>
              <input
                name="search"
                value={search}
                onChange={e => {
                  this.setState({ search: e.target.value });
                }}
                placeholder="Busque livros pelo título, autor ou ISBN"
              ></input>
              <button type="submit">BUSCAR</button>
            </form>
          </div>
        </div>
        <div className="container filter">
          <div className="filters">
            Filtrar ano de publicação:
            <form>
              <div>
                <input name="from" onInput={this.getBooksByYear}></input>
                <span className="calendar"></span>
              </div>
              ate
              <div>
                <input name="to" onInput={this.getBooksByYear}></input>
                <span className="calendar"></span>
              </div>
            </form>
          </div>
          <div className="result">{books.length} resultados encontrados</div>
        </div>
        <div className="container list">
          <ReactTable
            data={books}
            columns={columns}
            defaultPageSize="10"
          ></ReactTable>
        </div>
        {selected[0] && (
          <div className="details">
            <div>Detalhes do livro selecionado:</div>
            <div>Título: {selected[0].title}</div>
            <div>ISBN: {selected[0].isbn}</div>
            <div>Autor: {selected[0].author}</div>
            <div>Editor: {selected[0].editor}</div>
            <div>Ano: {selected[0].year}</div>
            <div>Idioma: {selected[0].language}</div>
            <div>Peso: {selected[0].weight}</div>
            <div>Largura: {selected[0].width}</div>
            <div>Altura: {selected[0].height}</div>
            <div>Comprimento: {selected[0].length}</div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
