
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Addbook({ show,  handleclose, handleadd }) {
  const [newdetail, setnewdetail] = useState({
    book_id: '',
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    genre: '',
    language: '',
    copies_total: '',
    copies_available: '',
    shelf_location: '',
    added_date: '',
  });

  
  const handleonchange =(e) =>
  {
    setnewdetail({...newdetail,[e.target.name]:e.target.value})
  }
  const handleSubmit = () => {
    handleadd(newdetail);
    setnewdetail({ book_id: '',
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    genre: '',
    language: '',
    copies_total: '',
    copies_available: '',
    shelf_location: '',
    added_date: '',}); // Reset form after add
  };

  return (
    <Modal show={show} onHide={handleclose}>
      <Modal.Header closeButton>
        <Modal.Title>ADD BOOK DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[
  ,
  { label: 'Title', name: 'title' },
  { label: 'Author', name: 'author' },
  { label: 'Publisher', name: 'publisher' },
  { label: 'ISBN', name: 'isbn' },
  { label: 'Genre', name: 'genre' },
  { label: 'Language', name: 'language' },
  { label: 'Total Copies', name: 'copies_total' },
  { label: 'Available Copies', name: 'copies_available' },
  { label: 'Location', name: 'shelf_location' },
  { label: 'Added Date', name: 'added_date' },
].map(({ label, name }) => {
  let inputType = 'text';
  if (name === 'added_date') inputType = 'date';
  else if (name === 'copies_total' || name === 'copies_available' ) inputType = 'number';
   

  return (
    <FloatingLabel key={name} controlId={`floating-${name}`} label={label} className="mb-3">
      <Form.Control
        type={inputType}
        name={name}
        value={newdetail[name]}
        onChange={handleonchange}
        placeholder={label}
      />
    </FloatingLabel>
  );
})
}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleclose}>
          CLOSE
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          UPDATE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Addbook;
