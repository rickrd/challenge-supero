import React, { Component } from "react"
import "./style.css"

class App extends React.Component {
  books = [
    {
      title: "O Pequeno Principe",
      isbn: "1231231231231",
      author: "Horper Collins",
      editor: "Antoine de Saint-Exupery",
      year: "2011",
      language: "English",
      weight: "10",
      width: "100",
      height: "100",
      length: "200"
    },
    {
      title: "O Grande Principe",
      isbn: "1231231231232",
      author: "Horper Grande",
      editor: "Antoine de Grande",
      year: "2011",
      language: "English",
      weight: "10",
      width: "100",
      height: "100",
      length: "200"
    }
  ]

  state = {
    search: "",
    books: this.books
  }

  getBooks = e => {
    e.preventDefault()
    const { books } = this
    const { search } = this.state
    console.log(search)

    const result = search
      ? books.filter(book => {
          return book.title.toLowerCase() == search.toLowerCase() || book.author.toLowerCase() == search.toLowerCase() || book.isbn == search
        })
      : books

    console.log(result)
    this.setState({ search: "", books: result })
  }

  render() {
    const { books, search } = this.state

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
                  this.setState({ search: e.target.value })
                }}
                placeholder="Busque livros pelo título, autor ou ISBN"
              ></input>
              <button type="submit">BUSCAR</button>
            </form>
          </div>
        </div>
        <div className="container filter">
          <div className="filters">Filtrar ano de publicação:</div>
          <div className="result">{books.length} resultados encontrados</div>
        </div>
        <div className="container list">
          <table cellSpacing="0">
            <tr>
              <th>Livro</th>
              <th>Autor</th>
              <th>Editora</th>
              <th>Ano</th>
              <th>Ações</th>
            </tr>
            {books.map(book => (
              <tr>
                <td>
                  {book.title}
                  <br />
                  {book.isbn}
                </td>
                <td>{book.author}</td>
                <td>{book.editor}</td>
                <td>{book.year}</td>
                <td>
                  <a href="#">Detalhes</a>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }
}

export default App
