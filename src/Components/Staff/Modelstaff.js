import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Modelstaff({show, selectrow, handleclose, handleupdate })

{
    const [staffdetail,setstaffdetail] = useState({
         staff_id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    join_date: '',
    status: '',
    });

    useEffect(() => {
    if (selectrow) {
      setstaffdetail({
        staff_id: String(selectrow.staff_id || ''),
        name: selectrow.name || '',
        email: selectrow.email|| '',
        phone: selectrow.phone || '',
        role: selectrow.role || '',
       
        status: selectrow.status || '',
       
        join_date: selectrow.join_date ? selectrow.join_date.slice(0, 10) : '',
      });
    } else {
      setstaffdetail({
   
         staff_id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    join_date: '',
    status: '',
      
      });
    }
  }, [selectrow]);

  const handleonchange = (e) => {   
    const { name, value } = e.target;
    setstaffdetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleclose}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT Staff DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[
  
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
        value={staffdetail[name]}
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
        <Button variant="primary" onClick={() => handleupdate(staffdetail)}>
          UPDATE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default  Modelstaff;