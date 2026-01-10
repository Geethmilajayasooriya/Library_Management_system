
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Addlending({ show,  handleclose, handleadd }) {
  const [newdetail, setnewdetail] = useState({
    lending_id: '',
    book_id: '',
      member_id: '',
    staff_id: '',
    issue_date: '',
    due_date: '',
    
    return_date: '',
    status: '',

  });

  
  const handleonchange =(e) =>
  {
    setnewdetail({...newdetail,[e.target.name]:e.target.value})
  }
  const handleSubmit = () => {
    handleadd(newdetail);
    setnewdetail({
        lending_id: '',
    book_id: '',
      member_id: '',
    staff_id: '',
    issue_date: '',
    due_date: '',
    
    return_date: '',
    status: '',
     }); // Reset form after add
  };

  return (
    <Modal show={show} onHide={handleclose}>
      <Modal.Header closeButton>
        <Modal.Title>ADD Lending DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[
  ,
  { label: 'book_id', name: 'book_id' },
  { label: 'member_id', name: 'member_id' },
  { label: 'staff_id', name: 'staff_id' },
  { label: 'issue_date', name: 'issue_date' },
  { label: 'due_date', name: 'due_date' },
 
  { label: 'return_date', name: 'return_date' },
  { label: 'status', name: 'status' },
].map(({ label, name }) => {
  let inputType = 'text';
  if (name === 'issue_date'||name === 'due_date'||name === 'return_date') inputType = 'date';
  else if (name === 'book_id' || name === 'member_id' ||name === 'staff_id') inputType = 'number';
   

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

export default Addlending;
