
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Addstaff({ show,  handleclose, handleadd }) {
  const [newdetail, setnewdetail] = useState({
    staff_id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    join_date: '',
    status: '',
  });

  
  const handleonchange =(e) =>
  {
    setnewdetail({...newdetail,[e.target.name]:e.target.value})
  }
  const handleSubmit = () => {
    handleadd(newdetail);
    setnewdetail({ staff_id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    join_date: '',
    status: '', }); // Reset form after add
  };

  return (
    <Modal show={show} onHide={handleclose}>
      <Modal.Header closeButton>
        <Modal.Title>ADD Staff DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[
  ,
 { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Phone number', name: 'phone' },
  { label: 'Role', name: 'role' },
 
  { label: 'Status', name: 'status' },
  { label: 'join Date', name: 'join_date' },
].map(({ label, name }) => {
   let inputType = 'text';
  if (name === 'join_date') inputType = 'date';
  else if (name === 'phone' ) inputType = 'number';
   
   

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

export default Addstaff;
