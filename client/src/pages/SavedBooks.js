import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
// add these new items
import {useMutation, useQuery} from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});

  const { loading, error, data} = useQuery(GET_ME);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  console.log("LOADING :: ", loading)
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  console.log("DATA :: ", data)
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  console.log("DATA :: ", error)
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || [];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    {/* removed the fluid attribute from the below div because it was a pain in the ass */}
      <div  className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book, i) => {
            return (
              <Col key={i} md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
