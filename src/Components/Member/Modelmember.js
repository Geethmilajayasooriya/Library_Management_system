import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Modelmember({show, selectrow, handleclose, handleupdate })

{
    const [memdetail,setmemdetail] = useState({
         member_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    join_date: '',
    status: '',
    });

    useEffect(() => {
    if (selectrow) {
      setmemdetail({
        member_id: String(selectrow.member_id || ''),
        name: selectrow.name || '',
        email: selectrow.email|| '',
        phone: selectrow.phone || '',
        address: selectrow.address || '',
       
        status: selectrow.status || '',
       
        join_date: selectrow.join_date ? selectrow.join_date.slice(0, 10) : '',
      });
    } else {
      setmemdetail({
            member_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    join_date: '',
    status: '',
      
      });
    }
  }, [selectrow]);

  const handleonchange = (e) => {   //update your React component state whenever the user types or changes an input field.
    const { name, value } = e.target;
    setmemdetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleclose}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT MEMBER DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[
  
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Phone number', name: 'phone' },
  { label: 'Address', name: 'address' },
 
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
        value={memdetail[name]}
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
        <Button variant="primary" onClick={() => handleupdate(memdetail)}>
          UPDATE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default  Modelmember;