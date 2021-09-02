import React from "react";
import { Carousel, Button } from "react-bootstrap";
import axios from "axios";
import BookFormModal from "./BookFormModal";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isEmpty: false,
      showModal: false,
    };
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  async componentDidMount() {
    let bookUrl = `http://localhost:3001/books?email=littlejohn@aol.com`;
    console.log("test");
    try {
      const response = await axios.get(bookUrl);
      this.setState({ books: response.data });
      this.isEmpty();
      console.log(response.data);
      console.log("test");
      console.log(this.state.isEmpty);
    } catch (err) {
      console.log(err + "Error Message Here");
    }
  }

  isEmpty() {
    if (this.state.books.length === 0) {
      this.setState({
        isEmpty: true,
      });
    }
  }
    //alternates the state of the Modal between true and false
    //! in this context means "the oposite of"
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
    console.log(this.state.showModal);
  }

  async handleSubmit(e) {
    e.preventDefault();
    let bookData= {
      title: e.target.formTitle.value,
      description: e.target.formDescription.value,
      email: e.target.formEmail.value,
    }
    let bookUrl = `http://localhost:3001/books?email=littlejohn@aol.com`;
    console.log("test");
    try {
      const response = await axios.post(bookUrl, bookData);
      this.setState({ books: response.data });
     
    } catch (err) {
      console.log(err + "Error Message Here");
    }
  }

  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>Your Personal Book Collection</h2>
        {this.state.isEmpty ? <alert>No books for you!</alert> : ""}
        <Carousel>
          {this.state.books.length &&
            this.state.books.map((book) => {
              return (
                <Carousel.Item key={book._id}>
                  <img
                    className="d-block w-100"
                    src={`https://via.placeholder.com/800x400/000000/FFFFFF/?text=${book.title}`}
                    alt={book.status}
                  />
                  <Carousel.Caption>
                    <h3>{book.email}</h3>
                    <p>{book.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
        <BookFormModal showModal= {this.state.showModal} toggleModal={this.toggleModal} handleSubmit={this.handleSubmit}/>
        <Button onClick={this.toggleModal}>Add Book</Button>
      </>
    );
  }
}

export default BestBooks;
