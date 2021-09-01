import React from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  async componentDidMount() {
     let bookUrl = `http://localhost:3001/books?email=littlejohn@aol.com`;
    console.log('test');
    try {
      const response = await axios.get(bookUrl);
      this.setState({ books: response.data });
      console.log(response.data);
      console.log('test');
    } catch (err) {
      console.log(err + 'Error Message Here');
    }
  }



  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
