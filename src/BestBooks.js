import React from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isEmpty: false,
    };
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  async componentDidMount() {
     let bookUrl = `http://localhost:3001/books?email=littlejohn@aol.com`;
    console.log('test');
    try {
      const response = await axios.get(bookUrl);
      this.setState({ books: response.data });
      this.isEmpty();
      console.log(response.data);
      console.log('test');
      console.log(this.state.isEmpty);
    } catch (err) {
      console.log(err + 'Error Message Here');
    }
  }

    isEmpty() {
      if (this.state.books.length === 0) {
        this.setState({
          isEmpty: true
        })
      }
    }

  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>Your Personal Book Collection</h2>
        {this.state.isEmpty  ? 
        <alert>
          No books for you!
        </alert>
        : ''}
        <Carousel>
          {this.state.books.length &&
            this.state.books.map((book) => {
              return <Carousel.Item key={book._id}>
                 <img
                className="d-block w-100"
                src={`https://via.placeholder.com/800x400/000000/FFFFFF/?text=${book.title}`}
                alt={book.status}
              />
                <Carousel.Caption>
                  <h3>{book.email}</h3>
                  <p>{book.description}</p>
                </Carousel.Caption>
              </Carousel.Item>;
            })}
        </Carousel>
      </>
    );
  }
}

export default BestBooks;
