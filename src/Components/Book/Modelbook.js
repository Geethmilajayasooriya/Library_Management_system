
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Modelbook({ show, selectrow, handleclose, handleupdate }) {
  const [detail, setdetail] = useState({
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

  useEffect(() => {
    if (selectrow) {
      setdetail({
        book_id: String(selectrow.book_id || ''),
        title: selectrow.title || '',
        author: selectrow.author || '',
        publisher: selectrow.publisher || '',
        isbn: selectrow.isbn || '',
        genre: selectrow.genre || '',
        language: selectrow.language || '',
        copies_total: String(selectrow.copies_total || ''),
        copies_available: String(selectrow.copies_available || ''),
        shelf_location: selectrow.shelf_location || '',
        added_date: selectrow.added_date ? selectrow.added_date.slice(0, 10) : '',
      });
    } else {
      setdetail({
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
    }
  }, [selectrow]);

  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleclose}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT BOOK DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[
  
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
  else if (name === 'copies_total' || name === 'copies_available' || name === 'book_id') inputType = 'number';
   

  return (
    <FloatingLabel key={name} controlId={`floating-${name}`} label={label} className="mb-3">
      <Form.Control
        type={inputType}
        name={name}
        value={detail[name]}
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
        <Button variant="primary" onClick={() => handleupdate(detail)}>
          UPDATE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modelbook;
